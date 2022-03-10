<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cpath">${pageContext.request.contextPath }</c:set>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link type="text/css" rel="stylesheet" href="${cpath }/resources/css/style.css">
</head>
<body>
<script src="${cpath }/resources/js/xml2json.js"></script>
<script src="${cpath }/resources/js/function.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<h1>코로나 백신 예방 접종 통계 </h1>
<div class="test">응시자 : 홍서현</div>

<hr>

<div id="root"></div>
<div id="root2"></div>

<script>
	const cpath = '${cpath}'
	const result = document.getElementById('result')
	const covidInfDiv = document.querySelector('.covidInf')
	const vaccineDiv = document.querySelector('.vaccine')

	window.addEventListener('load',getVaccine)
	window.addEventListener('load', getCovidInf)
	google.charts.load('current', {packages: ['corechart']})
	google.charts.setOnLoadCallback(getVaccine)

        
</script>

</body>
</html>