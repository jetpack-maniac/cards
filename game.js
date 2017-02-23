// var p1 = new Player('Tom')
// var p2 = new Player('Dick')
// var p3 = new Player('Harry')
// var people = [p1,p2,p3]
var player = new Player('Player')
var players = [player]


var game

$(function(){
  var buttons = $('<button>').text('Blackjack').on('click', function(){
    game = new Blackjack(players)
    game.gameloop()
    drawGame()
  })
  buttons.appendTo($('div.generic'))
})

function clearButtons(){
  $('div.generic').text('')
}

function drawPlayers(player){
  var playerDiv = $('<div class="player">').text(player.name)
  var handDiv = $('<div class="hand">')
  var scoreDiv = $('<div class="score">')
  for(j in player.hand){
    var suit = _.lowerCase(suits[player.hand[j].suit])
    var card = $('<span>').addClass(suit).html(player.hand[j].unicode())
    handDiv.append(card)
  }
  if(player.splitHand.length > 0){
    var splitScoreDiv = $('<div class="splitScore">')
    var splitHandDiv = $('<div class="splitHand">')
    for(j in player.splitHand){
      var suit = _.lowerCase(suits[player.splitHand[j].suit])
      var card = $('<span>').addClass(suit).html(player.splitHand[j].unicode())
      splitHandDiv.append(card)
    }
    splitScoreDiv.append('Score: ' + game.score(player.splitHand))
    splitHandDiv.append(splitScore)
    playerDiv.append(splitHand)
  }
  scoreDiv.append('Score: ' + game.score(player.hand))
  handDiv.append(scoreDiv)
  playerDiv.append(handDiv)
  // playersDiv.append(playerDiv)
  if(player != _.last(game.players)) playerDiv.append('<hr>')
  return playerDiv
}

function drawDealer(player){

}

function drawGame(){
  $('div.players').text('')
  clearButtons()
  var gamename = $('h1.gamename').text(game.name)
  var playersDiv = $('.players')
  $(function(){
    var newRound = $('<button>').text('New Round').on('click', function(){
      // $('div.players').text('')
      game.gameloop()
      drawGame()
    })
    var hit = $('<button>').text('Hit').on('click', function(){
      game.hit(game.players[0])
      drawGame()
    })
    var stand = $('<button>').text('Stand').on('click', function(){
      game.dealerTurn()
      drawGame()
    })
    newRound.appendTo($('div.generic'))
    hit.appendTo($('div.generic'))
    stand.appendTo($('div.generic'))
    _.forEach(game.players, function(player){
      playersDiv.append(drawPlayers(player))
    })
  })
}
