// Poker Class

function Poker(players){
  this.players = players
  this.deck = new Deck()
  this.deck.shuffle()
  this.name = 'Poker'
}

Poker.prototype.round = function(players){
  if(!players) players = this.players
  for(i in players){
    var player = players[i]
    player.hand = player.hand.concat(this.deck.deal(5))
    player.hand = sort(player.hand)
    console.log(player.name)
    for(i in player.hand){
       console.log('%c ' + player.hand[i].unicode(), 'color:' + player.hand[i].color() + '; font-size:20px;')
    }
  }
}
