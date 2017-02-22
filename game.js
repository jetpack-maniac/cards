var p1 = new Player('Tom')
var p2 = new Player('Dick')
var p3 = new Player('Harry')
var people = [p1,p2,p3]

var game = new Blackjack(people)

$(function(){
  var gamename = $('h1.gamename').text(game.name)
  var players = $('.players')
  for(i in game.players){
    var player = $('<div>').text(game.players[i].name)
    var hand = $('<div>')
    for(j in game.players[i].hand){
      var suit = _.lowerCase(suits[game.players[i].hand[j].suit])
      var card = $('<span>').addClass(suit).html(game.players[i].hand[j].unicode())
      hand.append(card)
    }
    player.append(hand)
    players.append(player)
  }
})

game.gameloop()
