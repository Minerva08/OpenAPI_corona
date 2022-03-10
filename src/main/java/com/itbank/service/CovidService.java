package com.itbank.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

import org.springframework.stereotype.Service;

@Service
public class CovidService {
	
	private final String url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
	private final String serviceKey = "K7G5hCA%2FRqnmALDK%2F7POZXDGSgTgQFRIcOqpF8HUf9rqLn17QSaJ4Q0Ox732h%2BF%2FgxuyB3bXrdEWApNVwrOtWA%3D%3D";

	public String getData() throws IOException {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd hh");
		Date date = new Date();
		Date before = new Date(date.getTime() - 1000 * 60 * 60 * 24);
		
		String today = sdf.format(date); 
		String yesterday = sdf.format(before);
		
		int hour = Integer.parseInt(today.split(" ")[1]);
		today = today.split(" ")[0];
		yesterday = yesterday.split(" ")[0];
		
		String queryString = "?";
		queryString += "serviceKey=" 	+ serviceKey 	+ "&";
		queryString += "pageNo=" 		+ 1 			+ "&";
		queryString += "numOfRows=" 	+ 10 			+ "&";
		queryString += "startCreateDt=20220101&";
		queryString += "endCreateDt=" 	+ today 		+ "&";
		
		URL requestURL = new URL(url + queryString);
		HttpURLConnection conn = (HttpURLConnection) requestURL.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");
		
		Scanner sc = null;
		String xmlData = "";
		
		if(conn.getResponseCode() == 200) {
			sc = new Scanner(conn.getInputStream());
			while(sc.hasNextLine()) {
				xmlData += sc.nextLine();
			}
			System.out.println(xmlData);
			sc.close();
			conn.disconnect();
			return xmlData;
		}
		return null;
	}
}
