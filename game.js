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

function drawPlayers(players){
  for(var i in game.players){
    var player = $('<div class="player">').text(game.players[i].name)
    var hand = $('<div class="hand">')
    var score = $('<div class="score">')
    for(j in game.players[i].hand){
      var suit = _.lowerCase(suits[game.players[i].hand[j].suit])
      var card = $('<span>').addClass(suit).html(game.players[i].hand[j].unicode())
      hand.append(card)
    }
    if(game.players[i].splitHand.length > 0){
      var splitScore = $('<div class="splitScore">')
      var splitHand = $('<div class="splitHand">')
      for(j in game.players[i].splitHand){
        var suit = _.lowerCase(suits[game.players[i].splitHand[j].suit])
        var card = $('<span>').addClass(suit).html(game.players[i].splitHand[j].unicode())
        splitHand.append(card)
      }
      splitScore.append('Score: ' + game.score(game.players[i].splitHand))
      splitHand.append(splitScore)
      player.append(splitHand)
    }
    score.append('Score: ' + game.score(game.players[i].hand))
    hand.append(score)
    player.append(hand)
    players.append(player)
    if(game.players[i] != _.last(game.players)) players.append('<hr>')
  }
}

function drawGame(){
  $('div.players').text('')
  clearButtons()
  $(function(){
    var newRound = $('<button>').text('New Round').on('click', function(){
      $('div.players').text('')
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
    var gamename = $('h1.gamename').text(game.name)
    var players = $('.players')
    drawPlayers(players)
  })
}
