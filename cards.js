var suits = ['Diamonds','Clubs','Hearts','Spades']
var values = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace']

////////////////////////////////////////////////////////////////////////////////
// Classes

// Deck Class


function Deck(){
  this.cards = []
  this.dealt = []

  for(var suit = 0; suit < suits.length; suit++){
    for(var value = 0; value < values.length; value++){
      var card = new Card(value, suit)
      this.cards.push(card)
    }
  }
}

Deck.prototype.cut = function(cuts){
  var packetSize = Math.floor(this.cards.length / cuts)
  var packets = []

  for(var i = 0; i < cuts; i++){
    packets.push(this.cards.slice(i * packetSize, i * packetSize + packetSize))
  }
  packets.push(this.cards.slice(packetSize*cuts))
  packets.reverse()

  var result = []

  for(var i = 0; i < packets.length; i++){
    result = result.concat(packets[i])
  }

  this.cards = result

}

Deck.prototype.faro = function(){
  var left = this.cards.slice(0,26)
  var right = this.cards.slice(26,52)
  this.cards = []

  for(var i = 0; i < 26; i++){
    this.cards.push(left[i])
    this.cards.push(right[i])
  }
}

Deck.prototype.shuffle = function (){
  this.cut(10)
  this.faro()
  this.cut(3)
  this.faro()
  this.cut(2)
  this.faro()
}

Deck.prototype.deal = function(number){
  if(!number) number = 1
  var cards = []
  for(var i = 0; i < number; i++){
    var card = this.cards.pop()
    this.dealt.push(card)
    cards.push(card)
  }
  return cards
}

Deck.prototype.print = function(){
    for(var i = 0; i < this.cards.length; i++){
      console.log(this.cards[i].toString())
    }
}

Deck.prototype.dealtPrint = function(){
  for(var i = 0; i < this.dealt.length; i++){
    console.log(this.dealt[i].toString())
  }
}

Deck.prototype.status = function(){
  console.log(this.cards.length + ' cards in the deck')
  console.log(this.dealt.length + ' cards have been dealt')
}

// Card Class

function Card(value, suit){
  this.value = value
  this.suit = suit
}

Card.prototype.toString = function(){
  return valves[this.value] + " of " + suits[this.suit]
}

// Player Class

function Player(name){
  this.name = name
  this.hand = []
}

// War Class

function War(players){
  this.players = players
  this.deck = new Deck()
  this.deck.shuffle()
  var handSize = Math.floor(this.deck.cards.length / players.length)
  for(var i = 0; i < players.length; i++){
    this.players[i].hand = this.players[i].hand.concat(this.deck.deal(handSize))
  }
  for(var i = 0; i < this.deck.cards.length; i++){
    this.players[i].hand = this.players[i].hand.concat(this.deck.deal(1))
  }
}

War.prototype.round = function(){

}

// End of Classes
////////////////////////////////////////////////////////////////////////////////

// var deck = new Deck()

var p1 = new Player('Nagisa')
var p2 = new Player('Saitama')
var p3 = new Player('Yui-tan')

// console.log(deck.deal().toString())

var game = new War([p1,p2,p3])
