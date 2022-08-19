let word, inPlaceLetters = [], incorrectPlacs = [], correctLetters = [], correctPlacs = [], botCorrectLetters = [], botCorrectPlacs = [];
var randItem, botItem = "";
var botFirstInput = true;
const results = document.querySelector(".inputs"),
inp = document.querySelector("#user-input"),
warnMessage = document.querySelector("#robo span"),
submitBtn = document.getElementById("#submit");

const radioButtons = document.querySelectorAll('input[name="level"]');

// resetBtn = document.querySelector("#reset-btn"),
var cn = 0;
var isFinish = false;
function WordProcess(){
	//console.log("inp.length:" + inp.value.length);
	let selectedLevel;
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			selectedLevel = radioButton.value;
			break;
		}
	}
	if(selectedLevel){
	
		if(inp.value.length != 5){
			warnMessage.innerText = "Word should have 5 letters!";
			warnMessage.style.color = "red";
		}
		else{
			if(!isFinish){
				warnMessage.innerText = "";
				warnMessage.style.color = "black";
				
				checkLetters(inp.value);
				printResult(true);
				if(selectedLevel == "Easy"){
					botInput();
				}
				if(selectedLevel == "Normal"){
					botInputNormal();
				}
				if(selectedLevel == "Hard"){
					botInputHard();
				}
				checkLetters(botItem);
				printResult(false);
				inp.value = "";
				inp.focus();
			}
			if(randItem === inp.value){
				warnMessage.innerText = "You Win!";
				warnMessage.style.color = "green";
				isFinish = true;
			}
			if(randItem === botItem){
				warnMessage.innerText = "You Lose!";
				warnMessage.style.color = "red";
				isFinish = true;
			}
		}
	}
	else{
		warnMessage.innerText = "Choose Level First!";
		warnMessage.style.color = "indianred";
	}
}

function botInput(){
	botItem = wordList[Math.floor(Math.random() * wordList.length)];
	botItem = botItem.toLowerCase();
	// console.log(botItem);
}
var itemMatchCounter = 0;
// String.prototype.replaceAt = function(index, replacement) {
//     return this.substring(0, index) + replacement + this.substring(index + replacement.length);
// }
function botInputNormal(){
	if(botFirstInput){
		botItem = wordList[Math.floor(Math.random() * wordList.length)];
		botFirstInput = false;
	}
	else{
		let bestMatchWords = [];
		botItem = botItem.split('');
		for(let h = 0; h < botCorrectPlacs.length; h++){
			botItem[botCorrectPlacs[h]] = botCorrectLetters[h];
			// botItem.replaceAt(correctPlacs[h], correctLetters[h]);
			// botItem = "windo"
			console.log(botItem);
			// console.log(correctLetters[h]);
		}
		for(w of wordList){
			w = w.toLowerCase();
			let matchLetterCount = 0;
			for(let h = 0; h < botCorrectPlacs.length; h++){
				console.log("1 --> " + matchLetterCount);
				console.log("w --> " + w);
				if(botItem[botCorrectPlacs[h]] === w[botCorrectPlacs[h]] ){
					matchLetterCount++;
					console.log("2 --> " + matchLetterCount);
				}
				if(matchLetterCount == botCorrectPlacs.length){
					console.log("c pl --> " + botCorrectPlacs.length);
					bestMatchWords.push(w);
				}
			}
		}
		
		botItem = botItem.join('');

		console.log(bestMatchWords);
		botItem = bestMatchWords[itemMatchCounter % bestMatchWords.length];
		itemMatchCounter++;
		
		// for(let w of wordList){
		// 	console.log("cor places:  " + correctPlacs.length);
		// 	for(var y = 0; y < correctPlacs.length; y++){
		// 		if(w[correctPlacs[y]].toLowerCase() == correctLetters[y]){
		// 			console.log(w[correctPlacs[y]] + " **** " + correctLetters[y]);
		// 			botItem = w;
		// 		}
		// 		if(w[correctPlacs[correctPlacs.length-1]].toLowerCase() == correctLetters[correctPlacs.length-1]){
		// 			cr += 1;
		// 		}
		// 	}
		// 	if(w[correctPlacs[correctPlacs.length-1]].toLowerCase() == correctLetters[correctPlacs.length-1] ){
		// 		console.log("break");
		// 		break;
		// 	}
			
		// }
	}
	if(botItem){
		botItem = botItem.toLowerCase();
	}

	console.log(botItem);
}

function botInputHard(){
	if(botFirstInput){
		botItem = wordList[Math.floor(Math.random() * wordList.length)];
		botFirstInput = false;
	}
	else{
		let bestMatchWords = [];
		let HardBestMatchWords = [];
		botItem = botItem.split('');
		for(let h = 0; h < botCorrectPlacs.length; h++){
			botItem[botCorrectPlacs[h]] = botCorrectLetters[h];
			// botItem.replaceAt(correctPlacs[h], correctLetters[h]);
			// botItem = "windo"
			console.log(botItem);
			// console.log(correctLetters[h]);
		}
		for(w of wordList){
			w = w.toLowerCase();
			let matchLetterCount = 0;
			for(let h = 0; h < botCorrectPlacs.length; h++){
				console.log("1 --> " + matchLetterCount);
				console.log("w --> " + w);
				if(botItem[botCorrectPlacs[h]] === w[botCorrectPlacs[h]] ){
					matchLetterCount++;
					console.log("2 --> " + matchLetterCount);
				}
				if(matchLetterCount == botCorrectPlacs.length){
					console.log("c pl --> " + botCorrectPlacs.length);
					bestMatchWords.push(w);
				}
			}
		}
		for(mw of bestMatchWords){
			mw = mw.split('');
			var flag = false;
			for(let p = 0; p < mw.length; p++){
				for(let q = 0; q < inPlaceLetters.length; q++){
					if(mw[p] === inPlaceLetters[q]){
						HardBestMatchWords.push(mw.join(''));
						flag = true;
					}

				}
				if(flag)
					break;
			}
			
		}
		
		botItem = botItem.join('');
		
		console.log(HardBestMatchWords);
		botItem = flag ? HardBestMatchWords[itemMatchCounter % HardBestMatchWords.length] : bestMatchWords[itemMatchCounter % bestMatchWords.length];
		itemMatchCounter++;
		
		// for(let w of wordList){
		// 	console.log("cor places:  " + correctPlacs.length);
		// 	for(var y = 0; y < correctPlacs.length; y++){
		// 		if(w[correctPlacs[y]].toLowerCase() == correctLetters[y]){
		// 			console.log(w[correctPlacs[y]] + " **** " + correctLetters[y]);
		// 			botItem = w;
		// 		}
		// 		if(w[correctPlacs[correctPlacs.length-1]].toLowerCase() == correctLetters[correctPlacs.length-1]){
		// 			cr += 1;
		// 		}
		// 	}
		// 	if(w[correctPlacs[correctPlacs.length-1]].toLowerCase() == correctLetters[correctPlacs.length-1] ){
		// 		console.log("break");
		// 		break;
		// 	}
			
		// }
	}
	if(botItem){
		botItem = botItem.toLowerCase();
	}

	console.log(botItem);
}

function chosenWord(){
	randItem = wordList[Math.floor(Math.random() * wordList.length)];
	// randItem = "spell";

	randItem = randItem.toLowerCase();
	console.log(randItem);
}
function checkLetters(item){
	correctPlacs = [];
	correctLetters =[];
	for(let i = 0; i < 5; i++){
		// console.log("rand: " + randItem[i] + "inp: " + inp.value[i]);
		if(randItem[i] == item[i]){
			correctPlacs.push(i);
			correctLetters.push(item[i]);
		}
	}
	incorrectPlacs = [];
	for(let i = 0; i < 5; i++){
		for(let j = 0; j < 5; j++){
			if(item[i] == randItem[j] && i != j){
				incorrectPlacs.push(i);
				inPlaceLetters.push(item[i]);
			}
		}
	}
	console.log("inPlaceLetters : ");
	console.log(inPlaceLetters);
	// let flag = true;
	// for( let v = 0; v < botCorrectPlacs.length; v++){
	// 	for(let u = 0; u < correctPlacs.length; u++){
	// 		if(botCorrectPlacs[v] !== correctPlacs[u]){
	// 			for(let t = 0; t < botCorrectPlacs.length; t++){
	// 				if(botCorrectPlacs[t] !== correctPlacs[u]){
	// 					botCorrectPlacs.push(correctPlacs[u]);
	// 					botCorrectLetters.push(correctLetters[u]);
	// 					flag = false;
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	for(p of correctPlacs){
		botCorrectPlacs.push(p);
	}
	for(l of correctLetters){
		botCorrectLetters.push(l);
	}
	// if(flag){
	// }
	
}

function printResult(isUser){
	let html = "";
	let color = ["black","black","black","black","black"];
	
    for (let i = 0; i < 5; i++) {
		var letter = isUser ? inp.value[i] : botItem[i];
		// console.log("Phrase: " + correctLetters.length);
		for (let h = 0; h < incorrectPlacs.length; h++){
			if(i == incorrectPlacs[h]){
				color[i] = "yellow";
			}
		}
		for(let f = 0; f < correctLetters.length; f++){
			if(letter == correctLetters[f] && i == correctPlacs[f]){
				color[i] = "green";
			}
		}
        
        
    }
	for (let i = 0; i < 5; i++) {
		let val = isUser ? inp.value[i] : botItem[i];
		let borderColor = isUser ? "" : "border:2px solid blue;";
		html += '<input type="text" style="' + borderColor + 'color:' + color[i] + ';" value="'+ val +'" disabled>';
	}
	let label = isUser ? "<span>You: </span>" : "<span>Robot: </span>";
	results.innerHTML += '<br>' + label + html;
	
	
}

document.addEventListener("DOMContentLoaded", function(){
    chosenWord();
	//printResult();
});
if(submitBtn){
	submitBtn.addEventListener("click", WordProcess);
}