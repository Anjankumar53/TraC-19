;(async () => {
	const qa = await fetch('../qa.json').then(res => res.json())

	console.log({ qa })
	const questions = qa[0].questions

	let paused = false
	let totalScore = 0
	let currentQuestionIndex = -1
	let numericalinputs=[]

	// Collapsible
	var coll = document.getElementsByClassName('collapsible')

	for (let i = 0; i < coll.length; i++) {
		coll[i].addEventListener('click', function () {
			this.classList.toggle('active')

			var content = this.nextElementSibling

			if (content.style.maxHeight) {
				content.style.maxHeight = null
			} else {
				content.style.maxHeight = content.scrollHeight + 'px'
			}
		})
	}

	function getTime() {
		let today = new Date()
		hours = today.getHours()
		minutes = today.getMinutes()

		if (hours < 10) {
			hours = '0' + hours
		}

		if (minutes < 10) {
			minutes = '0' + minutes
		}

		let time = hours + ':' + minutes
		return time
	}

	// Gets the first message
	function firstBotMessage() {
		let firstMessage = "Hello there!!\nPlease answer the following questions to analyse your current medical situation"
		document.getElementById('botStarterMessage').innerHTML =
			'<p class="botText"><span>' + firstMessage + '</span></p>'

		let time = getTime()

		$('#chat-timestamp').append(time)
		document.getElementById('userInput').scrollIntoView(false)

		askNextQuestion()
	}

	firstBotMessage()

	//Gets the text from the input box
	function getResponse({ type }) {
		const userText = $('#textInput').val()
		if (!userText) {
			return
		}

		userSendText(userText)

		if (currentQuestionIndex === questions.length) {
			return
		}
		//need to process and use this userText
		// console.log({ userText })
		console.log({ currentQuestionIndex })
		const scoreList = questions[currentQuestionIndex].scores
		if (type === 'value') {
			// handle this differently
			console.log({ type })
			numericalinputs.push(userText)
			askNextQuestion()
			return
		}

		const scoreIdx = Number(userText) - 1
		if (scoreIdx >= scoreList.length) {
			// nope
			console.log({ scoreIdx })
			return
		}

		// console.log({ scoreList })
		const currentScore = Number(scoreList[scoreIdx])
		totalScore += currentScore
		askNextQuestion()
	}

	function userSendText(sampleText) {
		const userHtml = '<p class="userText"><span>' + sampleText + '</span></p>'

		$('#textInput').val('')
		$('#chatbox').append(userHtml)
		document.getElementById('chat-bar-bottom').scrollIntoView(true)
		//send message from user
	}

	function sendFromBot(text_msg){
		const chatBox = document.getElementById('chatbox')
		const dspan = document.createElement('span')
		dspan.innerHTML = text_msg

		const displayNode = document.createElement('p')
		displayNode.appendChild(dspan)
		displayNode.className = 'botText'

		chatBox.appendChild(displayNode)
		userInput.scrollIntoView(false)
	}
	function displayScore() {
		if(parseInt(numericalinputs[0])>60){
			totalScore+=10;
		}
		if(parseInt(numericalinputs[1])>98.6){
			totalScore+=15
		}
		if(parseInt(numericalinputs[2])<95){
			totalScore+=10
		}
		if(totalScore>100){
			sendFromBot("Condition:Highly risky,Advised to get a covid check-up as soon as possible")
			sendFromBot("Refresh to retake the test")
			return
		}
		else if(totalScore>70){
			sendFromBot("Condition:Moderately risky,Advised to get a covid check-up soon")
			sendFromBot("Refresh to retake the test")
			return
		}
		else if(totalScore>50){
			sendFromBot("Condition:Possible threat,Advised to contact physician")
			sendFromBot("Refresh to retake the test")
			return
		}
		else if(totalScore>30){
			sendFromBot("Condition:Less possibilty threat,Still advised to contact physician")
			sendFromBot("Refresh to retake the test")
			return
		}
		else if(totalScore>30){
			sendFromBot("Condition:Least possibilty threat,Still advised to contact physician if symptoms are observed.")
			sendFromBot("Refresh to retake the test")
			return
		}
	}

	function askNextQuestion() {
		if (currentQuestionIndex === questions.length - 1) {
			currentQuestionIndex += 1
			displayScore()
			return
		}
		currentQuestionIndex += 1

		const currentQuestion = questions[currentQuestionIndex]
		const chatBox = document.getElementById('chatbox')
		const userInput = document.getElementById('userInput')

		const qText = Object.keys(currentQuestion)[0]
		const qspan = document.createElement('span')
		qspan.innerHTML = qText

		const botQuestionNode = document.createElement('p')
		botQuestionNode.appendChild(qspan)
		botQuestionNode.className = 'botText'

		chatBox.appendChild(botQuestionNode)
		userInput.scrollIntoView(false)

		if (questions[currentQuestionIndex].skippable) {
			askNextQuestion()
		}

		let idx = 1
		let optionsInnerHTML = ''
		const ospan = document.createElement('span')
		for (let option of currentQuestion[qText]) {
			optionsInnerHTML += idx + '. ' + option + '<br />'
			idx += 1
		}

		if (!optionsInnerHTML) {
			return
		}
		ospan.innerHTML = optionsInnerHTML

		const botOptionsNode = document.createElement('p')
		botOptionsNode.appendChild(ospan)
		botOptionsNode.className = 'botText'

		chatBox.appendChild(botOptionsNode)
		userInput.scrollIntoView(false)
	}

	//enter to send message
	$('#textInput').keypress(function (e) {
		if (e.which == 13) {
			let type = 'options'
			for (let x of [2, 25, 26]) {
				if (x === currentQuestionIndex) type = 'value'
			}
			getResponse({ type })
		}
	})
})()
