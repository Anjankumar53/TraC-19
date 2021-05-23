const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())
app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'static/index.html'))
})

app.get('/resources', (req, res) => {
	console.log('resources rendered')
	res.sendFile(path.join(__dirname, 'static/resources.html'))
})

app.get('/vaccine', (req, res) => {
	res.sendFile(path.join(__dirname, 'static/vaccine.html'))
})

app.listen(3000, () => {
	console.log('server running on port 3000')
})
