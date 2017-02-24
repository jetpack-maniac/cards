// var p1 = new Player('Tom')
// var p2 = new Player('Dick')
// var p3 = new Player('Harry')
// var people = [p1,p2,p3]
var player = new Player('Player')
var players = [player]
var standing = 0

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

function formatCard(card){
  var suit = _.lowerCase(suits[card.suit])
  return $('<span>').addClass(suit).html(card.unicode())
}

function drawPlayers(player){
  var playerDiv = $('<div class="player">').text(player.name)
  var handDiv = $('<div class="hand">')
  var scoreDiv = $('<div class="score">')
  var _player = player
  _.forEach(player.hand, function(card){
    if(_player.name == 'Dealer' && card == _player.hand[0] && standing < (game.players.length-1)) handDiv.append($('<span>').html('&#x1f0a0'))
    else handDiv.append(formatCard(card))
  })
  if(player.splitHand.length > 0){
    var splitScoreDiv = $('<div class="splitScore">')
    var splitHandDiv = $('<div class="splitHand">')
    _.forEach(player.splitHand, function(card){
      splitHandDiv.append(formatCard(card))
    })
    splitScoreDiv.append('Score: ' + game.score(player.splitHand))
    splitHandDiv.append(splitScore)
    playerDiv.append(splitHand)
  }
  // if(player.name == 'Dealer' && standing < (game.players.length-1)) scoreDiv.append('Score: ' + game.score(player.hand[1]))
  if(player.name != 'Dealer') scoreDiv.append('Score: ' + game.score(player.hand))
  else if(player.name == 'Dealer' && standing >= (game.players.length-1)) scoreDiv.append('Score: ' + game.score(player.hand))
  handDiv.append(scoreDiv)
  playerDiv.append(handDiv)
  if(player != _.last(game.players)) playerDiv.append('<hr>')
  return playerDiv
}

function drawGame(){
  $('div.players').text('')
  clearButtons()
  var gamename = $('h1.gamename').text(game.name)
  var playersDiv = $('.players')

  // Player Interfaces
  $(function(){
    var newRound = $('<button>').text('New Round').on('click', function(){
      standing = 0
      game.gameloop()
      drawGame()
    })
    var hit = $('<button>').text('Hit').on('click', function(){
      game.hit(game.players[0])
      drawGame()
    })
    var stand = $('<button>').text('Stand').on('click', function(){
      standing = standing + 1
      if(standing == (game.players.length-1)){
        game.dealerTurn()
      }
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
