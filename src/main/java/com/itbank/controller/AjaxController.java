package com.itbank.controller;

import java.io.IOException;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itbank.service.CovidService;
import com.itbank.service.VaccineService;

@RestController
public class AjaxController {
	
	@Autowired private VaccineService vs;
	@Autowired private CovidService cs;

	@GetMapping(value="/vaccine", produces="application/json; charset=utf-8")
	public String vaccine() throws IOException {
		return vs.getVaccine();
	}
	@GetMapping(value="/covid", produces="application/json; charset=utf-8")
	public String covid() throws IOException {
		
		String xml = cs.getData();
		if(xml != null) {
			System.out.println(xml);
			String json = XML.toJSONObject(xml).toString();
			return json;
		}
		return "{\"message\" : \"no data\"}";
	}
}
