function renderVaccine(arr){
	let dom = `<table border="1" cellpadding="7" cellspacing="0">
					<tr>
						<th>날짜</th>
						<th>1차 접종</th>
						<th>2차 접종</th>
						<th>3차 접종</th>
					</tr>`
	arr.forEach(e => {
	dom +=	`<tr>`
		for(key in e) {
	dom +=		`<td>${e[key]}</td>`
		}
	dom +=	`</tr>`
	})
	dom += `</table>`
	
//	vaccineDiv.innerHTML = dom
}
	
function getVaccine(event) {
	const vacUrl = cpath + '/vaccine' 
	
	const opt = {
			method: 'GET'
		}
	
	fetch(vacUrl, opt)
	.then(resp => resp.json())
	.then(json => {
		console.log(json)
		const arr = json.data.map(v => {
			return {
				'날짜' : v.baseDate.substring(5,10),
				'1차 접종 완료' : v.totalFirstCnt,
				'2차 접종 완료' : v.totalSecondCnt,
				'3차 접종 완료' : v.totalThirdCnt,
			}
		})
		console.log(arr)
		renderVaccine(arr)
	// 1) 데이터를 배열로 준비
	const arr2 = [
	   
	]
//	arr2.push([ 
//		arr[0]['날짜'], arr[1]['1차 접종 완료'], arr[2]['2차 접종 완료'], arr[3]['3차 접종 완료']
//	])
	for(key in arr){
		arr2.push([ 
			arr[key]['날짜'], arr[key]['1차 접종 완료'], arr[key]['2차 접종 완료'], arr[key]['3차 접종 완료']
		])
	}
//	for(var i = 0; i <arr.length; i++){
//		date.addRow([new '날짜'(arr[i].)])
//	}
	console.log('arr2', arr2) 
	
	
	
	// 2) 테이블 생성
	const table = new google.visualization.DataTable()
	
	// 3) column 추가 (컬럼 이름 및 자료형)
	table.addColumn('string', '날짜')
	table.addColumn('number', '1차 접종 완료')
	table.addColumn('number', '2차 접종 완료')
	table.addColumn('number', '3차 접종 완료')
	
	// 4) row 추가 (실제 데이터)
	table.addRows(arr2)
	
	// 5) 시각화 (dom을 지정)
		const opt2 = {
		    title: '일자별 코로나 백신 접종',
		    width: 1900,
		    height: 450,
		}
	// const chart = new google.visualization.BarChart(root)
	// const chart = new google.visualization.PieChart(root)
	const chart = new google.visualization.ColumnChart(root)
	// const chart = new google.visualization.LineChart(root)
	chart.draw(table,opt2)	
		
		
	})

}

function renderCovidInf(arr){
	let dom = `<table border="1" cellpadding="7" cellspacing="0">
					<tr>
						<th>지역 발생자</th>
					</tr>`
	for(let i = 1; i < arr.length; i++){
	const localOccCnt = +arr[i]['지역 확진자']
	dom +=	`<tr>`
	dom +=		`<td style="background-color: rgba(${localOccCnt}, ${255 - localOccCnt}, 64, 0.5);">${localOccCnt}</td>`
	dom +=	`</tr>`
	}
	dom += `</table>`
	
//	covidInfDiv.innerHTML = dom
}
function getCovidInf(event) {
	const covidInfURL = cpath + '/covid'
	const opt ={method: 'GET'}
//	let last_date = new Date(year,month,0).getDate(); // 달의 마지막 일수(달은 0부터 시작하기 때문에 표시하는게 아니면 +1 해주지 않음 )
//	let first_day = new Date(year,month,1).getDay() // 달의 첫번째 요일
	
	fetch(covidInfURL, opt)
	.then(resp => resp.json())
	.then(json => {
		const arr = json.response.body.items.item.filter(v => v.gubun == '부산')
		.map(v =>{
			return {
				'날짜': v.createDt.substring(5,10),
				'지역 확진자': v.localOccCnt,
			}
		})
		renderCovidInf(arr)
		
		// 1) 데이터를 배열로 준비
		const arr3 = [
		   
		]
		arr3.push([ 
			arr[0]['날짜'], arr[1]['지역 확진자']
		])
		for(key in arr){
			arr3.push([ arr[key]['날짜'], arr[key]['지역 확진자']
			])
		}
		console.log('arr3', arr3) 
		
		arr3.sort((a,b) => {return a[0] > b[0] ? 1 : -1})
		
		// 2) 테이블 생성
		const table = new google.visualization.DataTable()
		
		// 3) column 추가 (컬럼 이름 및 자료형)
		table.addColumn('string', '날짜')
		table.addColumn('number', '지역 확진자')
		
		// 4) row 추가 (실제 데이터)
		table.addRows(arr3)
		
		// 5) 시각화 (dom을 지정)
			const opt3 = {
			    title: '일자별 코로나 확진자',
			    width: 1900,
			    height: 450,
			    fontSize: 14
			}
		// const chart = new google.visualization.BarChart(root)
		// const chart = new google.visualization.PieChart(root)
		const chart = new google.visualization.ColumnChart(root2)
		// const chart = new google.visualization.LineChart(root)
		chart.draw(table,opt3)	
			
			
		})
	
}





