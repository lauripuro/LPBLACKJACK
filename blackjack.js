
let coverSheet = document.getElementById("cover-sheet")


let display = document.getElementById("display")
let displaySum = document.getElementById("sum")
let displayDealerScore = document.getElementById("dealer-score")
let displayMessage = document.getElementById("message")
let displayBalance = document.getElementById("balance")
let signInDiv = document.getElementById("sign-in-div")
let registerDiv = document.getElementById("register-div")
let returnButton = document.getElementById("return-button")
let text = document.getElementById("sign-register-text")
let leaderboard = document.getElementById("leaderboard-box")
let lbSheet = document.getElementById("leaderboard-sheet")
let profileSheet = document.getElementById("profile-sheet")
let displayHighScore = document.getElementById("high-score")
let displayGamesPlayed = document.getElementById("games-played")
let displayCardIcon = document.getElementById("card-icon-box")
let playButton = document.getElementById("play-button")
let drawCardButton = document.getElementById("card-button")
let stopDrawingButton = document.getElementById("dealer-play-button")
let allTimeLBButton = document.getElementById("all-time-lb-button")
let currentLBButton = document.getElementById("current-lb-button")



lbSheet.style.visibility = "hidden";
profileSheet.style.visibility = "hidden";
returnButton.style.visibility = "hidden";
signInDiv.style.visibility = "hidden"; 
registerDiv.style.visibility = "hidden"; 

//Takes userData from local storage if or uses hardcoded data if there is none
let userData;
const savedUserData = JSON.parse(localStorage.getItem("userData"));



if (Array.isArray(savedUserData)) {
  userData = savedUserData
} else {
  userData = [
    {käyttäjätunnus:"LP21", saldo:2100, salasana:21, ennätys:2100, pelit:0, voitot:0, tasapelit:0, häviöt:0, päivä:"2.9.2023"}
  ]
}



let cards = []
let cardValues = []
let playersInOrder = []
let cardsLeft = []



let playingCards = [
  {card:"A", value:1, suit:"S", icon: "🂡"}, 
  {card:"2", value:2, suit:"S", icon: "🂢"},
  {card:"3", value:3, suit:"S", icon:"🂣"}, 
  {card:"4", value:4, suit:"S", icon:"🂤"}, 
  {card:"5", value:5, suit:"S", icon:"🂥"}, 
  {card:"6", value:6, suit:"S", icon:"🂦"}, 
  {card:"7", value:7, suit:"S", icon:"🂧"}, 
  {card:"8", value:8, suit:"S", icon:"🂨"}, 
  {card:"9", value:9, suit:"S", icon:"🂩"}, 
  {card:"10", value:10, suit:"S", icon:"🂪"}, 
  {card:"J", value:10, suit:"S", icon:"🂫"}, 
  {card:"Q", value:10, suit:"S", icon:"🂭"}, 
  {card:"K", value:10, suit:"S", icon:"🂮"},

  {card:"A", value:1, suit:"D", icon: "🃁"}, 
  {card:"2", value:2, suit:"D", icon: "🃂"},
  {card:"3", value:3, suit:"D", icon: "🃃"}, 
  {card:"4", value:4, suit:"D", icon: "🃄"}, 
  {card:"5", value:5, suit:"D", icon: "🃅"}, 
  {card:"6", value:6, suit:"D", icon: "🃆"}, 
  {card:"7", value:7, suit:"D", icon: "🃇"}, 
  {card:"8", value:8, suit:"D", icon: "🃈"}, 
  {card:"9", value:9, suit:"D", icon: "🃉"}, 
  {card:"10", value:10, suit:"D", icon: "🃊"}, 
  {card:"J", value:10, suit:"D", icon: "🃋"}, 
  {card:"Q", value:10, suit:"D", icon: "🃍"}, 
  {card:"K", value:10, suit:"D", icon: "🃎"},

  {card:"A", value:1, suit:"C", icon: "🃑"}, 
  {card:"2", value:2, suit:"C", icon: "🃒"},
  {card:"3", value:3, suit:"C", icon: "🃓"}, 
  {card:"4", value:4, suit:"C", icon: "🃔"}, 
  {card:"5", value:5, suit:"C", icon: "🃕"}, 
  {card:"6", value:6, suit:"C", icon: "🃖"}, 
  {card:"7", value:7, suit:"C", icon: "🃗"}, 
  {card:"8", value:8, suit:"C", icon: "🃘"}, 
  {card:"9", value:9, suit:"C", icon: "🃙"}, 
  {card:"10", value:10, suit:"C", icon: "🃚"}, 
  {card:"J", value:10, suit:"C", icon: "🃛"}, 
  {card:"Q", value:10, suit:"C", icon: "🃝"}, 
  {card:"K", value:10, suit:"C", icon: "🃞"},

  {card:"A", value:1, suit:"H", icon: "🂱"}, 
  {card:"2", value:2, suit:"H", icon: "🂲"},
  {card:"3", value:3, suit:"H", icon: "🂳"}, 
  {card:"4", value:4, suit:"H", icon: "🂴"}, 
  {card:"5", value:5, suit:"H", icon: "🂵"}, 
  {card:"6", value:6, suit:"H", icon: "🂶"}, 
  {card:"7", value:7, suit:"H", icon: "🂷"}, 
  {card:"8", value:8, suit:"H", icon: "🂸"}, 
  {card:"9", value:9, suit:"H", icon: "🂹"}, 
  {card:"10", value:10, suit:"H", icon: "🂺"}, 
  {card:"J", value:10, suit:"H", icon: "🂻"}, 
  {card:"Q", value:10, suit:"H", icon: "🂽"}, 
  {card:"K", value:10, suit:"H", icon: "🂾"}
];


let sum = 0
let altSum = 0
let hasAce = false

let playerName = ""
let balance = 0
let bet = 0

let hasWon = false
let isAlive = true
let hasEnded = true

let messageTop = ""
let messageBottom = ""

let index;

let timeout;


function showSignIn() {
  signInDiv.style.visibility = "visible"; 
  document.getElementById("s-r-div").style.visibility = "hidden";
  returnButton.style.visibility = "visible"
  text.innerText = ""
}
function showRegister() {
  registerDiv.style.visibility = "visible"; 
  document.getElementById("s-r-div").style.visibility = "hidden";
  returnButton.style.visibility = "visible"
  text.innerText = ""
}
function srReturn() {
  registerDiv.style.visibility = "hidden"; 
  signInDiv.style.visibility = "hidden";
  document.getElementById("s-r-div").style.visibility = "visible";
  returnButton.style.visibility = "hidden"
  text.innerText = ""
}

// Checks if the password is correct and signs the user in
function passwordCheck() {
  let password = document.getElementById("password-box").value;
  let username = document.getElementById("username-box").value;

  for (i in userData) {
    if (username == userData[i].käyttäjätunnus && password == userData[i].salasana) {
      coverSheet.style.visibility = "hidden";
      signInDiv.style.visibility = "hidden";
      registerDiv.style.visibility = "hidden";
      returnButton.style.visibility = "hidden";
      balance = userData[i].saldo
      playerName = userData[i].käyttäjätunnus
      highScore = userData[i].ennätys
      gamesPlayed = userData[i].pelit
      wins = userData[i].voitot
      losses = userData[i].häviöt
      ties = userData[i].tasapelit
      regDate = userData[i].päivä
      userIndex = i
    } else {
      text.innerText = "INCORRECT USERNAME OR PASSWORD"
    }
  }
  document.getElementById("balance").innerHTML = "BALANCE: " + balance + " €"
  document.getElementById("username").innerHTML = playerName.toUpperCase()
  document.getElementById("high-score").innerHTML = "HIGHSCORE: " + highScore + " €"
  document.getElementById("games-played").innerHTML = "GAMES PLAYED: " + gamesPlayed
  document.getElementById("wins").innerHTML = "WINS: " + wins
  document.getElementById("losses").innerHTML = "LOSSES: " + losses
  document.getElementById("ties").innerHTML = "TIES: " + ties
  document.getElementById("register-date").innerHTML = "REGISTERED: " + regDate
  document.getElementById("bet-selector").value = 10
  clearTable()
  gameOff()


}

// Adds a new account to userData array
function register() {
  let password = document.getElementById("password-register").value;
  let password2 = document.getElementById("password-register-2").value;
  let username = document.getElementById("username-register").value;

  if (username == "" || password == "" || password2 == "") {
    text.innerText = "MISSING USERNAME OR PASSWORD"
    return
  }

  let x = 0
  for (i in userData) {
    if (username == userData[i].käyttäjätunnus) {
      x += 1
    }
  }  
  if (password === password2) {
    if (x === 0 && username.length < 11) {
      let registerDate = dateMaker()
      userData.push({käyttäjätunnus:username, saldo:100, salasana:password, ennätys:100, pelit:0, voitot:0, tasapelit:0, häviöt:0, päivä:registerDate})
      text.innerText = username + " REGISTERED SUCCESFULLY"
    } else if (x === 0 && username.length > 10) {
      text.innerText = "USERNAME HAS TO BE LESS THAN 10 CHARACTERS"
      return
    } else {
      text.innerText = "USERNAME ALREADY IN USE"
      return
    }
  } else {
    text.innerText = "PASSWORDS MUST MATCH"
    return
  }
  saveData()
}

function dateMaker() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}.${month}.${year}`;
  return currentDate
}

let wide = false
function toggleSidebar() {
  if (wide == false) {
    sidebar = document.getElementById("sidebar")
    sidebar.style.width = "320px";
    wide = true
  } else if (wide == true) {
    sidebar = document.getElementById("sidebar")
    sidebar.style.width = "100px";
    wide = false
  }
  
}


// Sign out
function signOut() {
  if (hasEnded == false) {
    balanceUpdate(-bet)
  }
  coverSheet.style.visibility = "visible";
  lbSheet.style.visibility = "hidden";
  profileSheet.style.visibility = "hidden";
  srReturn()
  saveData()
  text.innerText = ""

  //localStorage.removeItem("userData")
}


// Shows the leaderboard
function showLeaderboard() {
  profileSheet.style.visibility = "hidden"
  currentLBButton.className = "leaderboard-button-active"
  allTimeLBButton.className = "leaderboard-button"
  if (lbSheet.style.visibility == "visible") {
    lbSheet.style.visibility = "hidden"
    leaderboard.innerText = ""
    return
  } else {
    leaderboard.innerText = ""
    lbSheet.style.visibility = "visible";
  }

  for (i in userData) {
    playersInOrder.push(userData[i])
  }
  playersInOrder.sort((a,b) => {
    return b.saldo - a.saldo;
  })

  let times = 0
  if (playersInOrder.length < 20) {
    times = playersInOrder.length
  } else {
    times = 20
  }

  let position = 1
  let x = 0
  while (x < times) {
    const list = document.createElement("p")
    const text = document.createTextNode(position +". "+" "+ playersInOrder[x].käyttäjätunnus +": "+" "+ playersInOrder[x].saldo + " €")


    if (position == 1) {
      list.style.color = "gold"
      list.style.fontWeight = "700"
    } else if (position == 2) {
      list.style.color = "silver"
      list.style.fontWeight = "700"
    } else if (position == 3) {
      list.style.color = "rgb(151, 134, 19)"
      list.style.fontWeight = "700"
    }
  
    if (playersInOrder[x].käyttäjätunnus == playerName && position > 3) {
      list.style.color = "#128538"
      list.style.fontWeight = "700"
    }


    list.appendChild(text)
    leaderboard.appendChild(list)
    position += 1 
    x += 1  
  }
  playersInOrder = []
}

// Shows the Current leaderboard
function showCurrentLeaderboard() {
  currentLBButton.className = "leaderboard-button-active"
  allTimeLBButton.className = "leaderboard-button"
  leaderboard.innerText = ""

  for (i in userData) {
    playersInOrder.push(userData[i])
  }
  playersInOrder.sort((a,b) => {
    return b.saldo - a.saldo;
  })

  let times = 0
  if (playersInOrder.length < 20) {
    times = playersInOrder.length
  } else {
    times = 20
  }

  let position = 1
  let x = 0
  while (x < times) {
    const list = document.createElement("p")
    const text = document.createTextNode(position +". "+" "+ playersInOrder[x].käyttäjätunnus +": "+" "+ playersInOrder[x].saldo + " €")
    
    if (position == 1) {
      list.style.color = "gold"
      list.style.fontWeight = "700"
    } else if (position == 2) {
      list.style.color = "silver"
      list.style.fontWeight = "700"
    } else if (position == 3) {
      list.style.color = "rgb(151, 134, 19)"
      list.style.fontWeight = "700"
    }
  
    if (playersInOrder[x].käyttäjätunnus == playerName && position > 3) {
      list.style.color = "#128538"
      list.style.fontWeight = "700"
    }

    list.appendChild(text)
    leaderboard.appendChild(list)
    position += 1 
    x += 1
  }
  playersInOrder = []
}

// Shows the All Time leaderboard
function showAllTimeLeaderboard() {
  allTimeLBButton.className = "leaderboard-button-active"
  currentLBButton.className = "leaderboard-button"

  leaderboard.innerText = ""

  for (i in userData) {
    playersInOrder.push(userData[i])
  }
  playersInOrder.sort((a,b) => {
    return b.ennätys - a.ennätys;
  })

  let times = 0
  if (playersInOrder.length < 20) {
    times = playersInOrder.length
  } else {
    times = 20
  }

  let position = 1
  let x = 0
  while (x < times) {
    const list = document.createElement("p")
    const text = document.createTextNode(position +". "+" "+ playersInOrder[x].käyttäjätunnus +": "+" "+ playersInOrder[x].ennätys + " €")
    
    if (position == 1) {
      list.style.color = "gold"
      list.style.fontWeight = "700"
    } else if (position == 2) {
      list.style.color = "silver"
      list.style.fontWeight = "700"
    } else if (position == 3) {
      list.style.color = "rgb(151, 134, 19)"
      list.style.fontWeight = "700"
    }
  
    if (playersInOrder[x].käyttäjätunnus == playerName && position > 3) {
      list.style.color = "#128538"
      list.style.fontWeight = "700"
    }

    list.appendChild(text)
    leaderboard.appendChild(list)
    position += 1 
    x += 1
  }
  playersInOrder = []
}



// Shows the profile
function showProfile() {
  lbSheet.style.visibility = "hidden"
  if (profileSheet.style.visibility == "visible") {
    profileSheet.style.visibility = "hidden"
    leaderboard.innerText = ""
    return
  } else {
    leaderboard.innerText = ""
    profileSheet.style.visibility = "visible";
    document.getElementById("wins").innerHTML = "WINS: " + wins
    document.getElementById("losses").innerHTML = "LOSSES: " + losses
    document.getElementById("ties").innerHTML = "TIES: " + ties
  }

}




// Clears the table
function clearTable() {
  displaySum.innerText = ""
  displayDealerScore.innerText = ""
  display.innerText = ""
  displayCardIcon.innerHTML = ""
  displaySum.innerHTML = "PRESS PLAY TO START THE GAME"
  displayMessage.innerText = ""
  isAlive = false
}

// Shows the waiting time for balance to restart
function waitingTable() {
  var timeLeft = 29;
  var timerId = setInterval(countdown, 1000);

  displaySum.innerText = "RELOADING BALANCE...";
  displayCardIcon.innerHTML = "YOU RUN OUT OF MONEY";
  displayDealerScore.innerHTML = timeLeft + 1 + ' SECONDS LEFT';
  display.innerHTML = ""
  displayMessage.innerText = ""

  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      clearTable()
    } else {
      displaySum.innerHTML = "RELOADING BALANCE...";
      displayDealerScore.innerHTML = timeLeft + ' SECONDS LEFT';
      timeLeft--;
    }
  }

  isAlive = false
}


// Saves the data
function saveData() {
  //lbUpdate()
  localStorage.setItem("userData", JSON.stringify(userData));
}

function lbUpdate() {
  userData.sort((a,b) => {
    return b.saldo - a.saldo;
  })
}







function gameOn() {
  playButton.style.visibility = "hidden"
  drawCardButton.style.visibility = "visible"
  stopDrawingButton.style.visibility = "visible"
  hasEnded = false
}

function gameOff() {
  playButton.style.visibility = "visible"
  drawCardButton.style.visibility = "hidden"
  stopDrawingButton.style.visibility = "hidden"
  hasEnded = true
}






// "Play" button
function startGame() {

  lbSheet.style.visibility = "hidden"
  if (hasEnded === false) {
    return
  }

  if (balance < 10) {
    hasEnded = false
    timeout = setTimeout(balanceReset, 30000);
    waitingTable()
    return
  }

  bet = Number(document.getElementById("bet-selector").value)

  if (balance < bet) {
    display.innerText = "YOUR BET IS TOO BIG"
    gameOff()
    return
  } else {
    gameOn()
  }


  
  

  cards = []
  cardValues = []
  gamesPlayed += 1
  userData[userIndex].pelit = gamesPlayed
  displayGamesPlayed.innerHTML = "GAMES PLAYED: " + gamesPlayed


  cardsLeft = []
  for (i in playingCards) {
    cardsLeft.push(playingCards[i])
  }

  displayDealerScore.innerText = ""
  for (let i = 0; i < 2; i++) {
    newCard()
  }
  renderGame()
}


// "Draw card" button
function drawCard() {
  if (isAlive === true && hasWon === false) {
    newCard()
    renderGame()
  }
  
}

// This pics a random card out of remaining cards and saves the data to "cards" and "cardValues" arrays
function newCard() {
    let randomNumber = (Math.floor(Math.random() * cardsLeft.length))
    let playingCard = cardsLeft[randomNumber].card
    let cardValue = cardsLeft[randomNumber].value
    let cardSuit = cardsLeft[randomNumber].suit
    let cardIcon = cardsLeft[randomNumber].icon
    cardValues.push(cardValue)
    cards.push({num: playingCard, suit: cardSuit, icn: cardIcon})
    cardsLeft.splice(randomNumber, 1)
}

//Checks if the player has an Ace
function checkAces() {
  let aces = 0
  for (i in cards) {
    if (cards[i].num === "A") {
      aces += 1
    } 
  }
  if (aces > 0) {
    hasAce = true
  } else {
    hasAce = false
  }
  aces = 0
}


//Checks if the dealer has better cards than you
function dealerPlay() {
  if (hasEnded === true) {
    return
  }

  let dealerScore = 0
  while (dealerScore < 17) {
    let randomNumber = (Math.floor(Math.random() * 52))
    let cardValue = playingCards[randomNumber].value

    dealerScore += cardValue

  }
  let x = ""
  if (sum > 21) {
    return
  } else {
    if (dealerScore < 22 && dealerScore > sum) {
      x = "YOU LOST"
      isAlive = false
      balanceUpdate(-bet)
    } else if (dealerScore === sum) {
      x = "IT IS A TIE"
      balanceUpdate(0)
      isAlive = false
    } else {
      x = "YOU WON"
      hasWon = true
      balanceUpdate(bet)
    }
    displayDealerScore.innerText = "DEALER HAS " + dealerScore + " ----- " + x
    displayMessage.innerText = ""
    display.innerText = ""
    gameOff()

  }
  
}



// Updates the balance
function balanceUpdate(bet) {
  if (bet < 0) {
    userData[userIndex].häviöt += 1
    losses += 1
  } else if (bet > 0) {
    userData[userIndex].voitot += 1
    wins += 1
  } else {
    userData[userIndex].tasapelit += 1
    ties += 1
  }
  balance += bet
  displayBalance.innerText = "BALANCE: " + balance + " €"
  userData[userIndex].saldo = balance

  if (userData[userIndex].ennätys < balance) {
    userData[userIndex].ennätys = balance
    displayHighScore.innerText = "HIGHSCORE: " + balance + " €"
  }

  saveData()
}

// Updates the balance
function balanceReset() {
  balance += 100
  displayBalance.innerText = "BALANCE: " + balance + " €"
  userData[userIndex].saldo = balance
  hasEnded = true
  saveData()
}





function renderGame() {
  checkAces()
  sum = 0
  
  for (i in cardValues) {
    sum += cardValues[i]

  } 

  let x = 0
  displayCardIcon.innerHTML = ""
  for (i in cards) {
    const list = document.createElement("div")
    if (cards[x].suit == "S" || cards[x].suit == "C") {
      list.className = "black-cards"
    } else {
      list.className = "red-cards"
    }
    
    const text = document.createTextNode(cards[x].icn)
    list.appendChild(text)
    displayCardIcon.appendChild(list)
    x += 1  
  }
  
  



  if (hasAce === true && sum + 10 < 22) {
    altSum = sum + 10
  } else {
    altSum = 0
  }

  if (altSum > 0 && altSum < 21) {
    displaySum.innerText = "SUM: " +  altSum + " or ("+sum+") "
  } else if (altSum === 21) {
    displaySum.innerText = "SUM: " +  altSum
  } else {
    displaySum.innerText = "SUM: " +  sum
  }
  
  if (altSum < 22 && altSum > sum) {
    sum = altSum
  } else {
    sum = sum
  }

  if (sum < 21) {
    messageTop = ""
    messageBottom = ""
    isAlive = true
    hasWon = false
    hasEnded = false
  }
  
  else if (sum === 21) {
    messageTop = ""
    displaySum.innerText = "BLACKJACK!"
    messageBottom = ""
    dealerPlay()
    cards = []
    cardValues = []
    hasWon = true
  } 
  
  else {
    messageTop = ""
    displayDealerScore.innerText = "SUM EXCEEDED 21 ----- YOU LOST"
    messageBottom = ""
    cards = []
    cardValues = []
    isAlive = false
    
    balanceUpdate(-bet)
    gameOff()
  }

  display.innerText = messageTop
  displayMessage.innerText = messageBottom

}
