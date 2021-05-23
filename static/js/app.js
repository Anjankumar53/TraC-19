const country_name_element = document.querySelector('.country .name')
const total_cases_element = document.querySelector('.total-cases .value')
const new_cases_element = document.querySelector('.total-cases .new-value')
const recovered_element = document.querySelector('.recovered .value')
const new_recovered_element = document.querySelector('.recovered .new-value')
const deaths_element = document.querySelector('.deaths .value')
const new_deaths_element = document.querySelector('.deaths .new-value')

const ctx = document.getElementById('axes_line_chart').getContext('2d')
const ctx2 = document.getElementById('axes_line_chart_deaths').getContext('2d')

let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	deaths = [],
	formatedDates = []

let country_code = geoplugin_countryCode()
let user_country
country_list.forEach(country => {
	if (country.code == country_code) {
		user_country = country.name
	}
})

/* ---------------------------------------------- */
/*                     FETCH API                  */
/* ---------------------------------------------- */
function fetchData(country) {
	user_country = country
	country_name_element.innerHTML = 'Loading...'
	;(cases_list = []),
		(recovered_list = []),
		(deaths_list = []),
		(dates = []),
		(formatedDates = [])

	var requestOptions = {
		method: 'GET',
		redirect: 'follow',
	}

	const api_fetch = async country => {
		await fetch(
			'https://api.covid19api.com/total/country/' + country + '/status/confirmed',
			requestOptions
		)
			.then(res => {
				return res.json()
			})
			.then(data => {
				data.forEach(entry => {
					dates.push(entry.Date)
					cases_list.push(entry.Cases)
				})
			})

		await fetch(
			'https://api.covid19api.com/total/country/' + country + '/status/recovered',
			requestOptions
		)
			.then(res => {
				return res.json()
			})
			.then(data => {
				data.forEach(entry => {
					recovered_list.push(entry.Cases)
				})
			})

		await fetch(
			'https://api.covid19api.com/total/country/' + country + '/status/deaths',
			requestOptions
		)
			.then(res => {
				return res.json()
			})
			.then(data => {
				data.forEach(entry => {
					deaths_list.push(entry.Cases)
				})
			})

		updateUI()
	}

	api_fetch(country)
}

fetchData(user_country)

// UPDATE UI FUNCTION
function updateUI() {
	updateStats()
	axesLinearChart()
	axesLinearChartDeath()
}

function updateStats() {
	const total_cases = cases_list[cases_list.length - 1]
	const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2]

	const total_recovered = recovered_list[recovered_list.length - 1]
	const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2]

	const total_deaths = deaths_list[deaths_list.length - 1]
	const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2]

	country_name_element.innerHTML = user_country
	total_cases_element.innerHTML = total_cases
	new_cases_element.innerHTML = `+${new_confirmed_cases}`
	recovered_element.innerHTML = total_recovered
	new_recovered_element.innerHTML = `+${new_recovered_cases}`
	deaths_element.innerHTML = total_deaths
	new_deaths_element.innerHTML = `+${new_deaths_cases}`

	// format dates
	dates.forEach(date => {
		formatedDates.push(formatDate(date))
	})
}

// UPDATE CHART
var yellowA = '#fae313'
var greenA = '#2aff2a'
var redA = '#da2d2d'
let my_chart
let my_chart2
function axesLinearChart() {
	if (my_chart) {
		my_chart.destroy()
	}

	my_chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [
				{
					label: 'Cases',
					data: cases_list,
					fill: false,
					borderColor: yellowA,
					backgroundColor: yellowA,
					borderWidth: 1,
				},
				{
					label: 'Recovered',
					data: recovered_list,
					fill: false,
					borderColor: greenA,
					backgroundColor: greenA,
					borderWidth: 1,
				},
			],
			labels: formatedDates,
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
		},
	})
}
function axesLinearChartDeath() {
	if (my_chart2) {
		my_chart2.destroy()
	}

	my_chart2 = new Chart(ctx2, {
		type: 'line',
		data: {
			datasets: [
				{
					label: 'Deaths',
					data: deaths_list,
					fill: false,
					borderColor: redA,
					backgroundColor: redA,
					borderWidth: 1,
				},
			],
			labels: formatedDates,
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
		},
	})
}
// FORMAT DATES
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateString) {
	let date = new Date(dateString)

	return `${date.getDate()} ${monthsNames[date.getMonth() - 1]}`
}
//
//
//
