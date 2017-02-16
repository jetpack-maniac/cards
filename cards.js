var suits = ['Diamonds','Clubs','Hearts','Spades']
var values = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace']

////////////////////////////////////////////////////////////////////////////////
// Classes

// Deck Class


function Deck(){
  this.cards = []

  for(var suit = 0; suit < suits.length; suit++){
    for(var value = 0; value < values.length; value++){
      var card = new Card(values[value], suits[suit])
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

Deck.prototype.print = function(){
    for(var i = 0; i < this.cards.length; i++){
      console.log(this.cards[i].toString())
    }
    console.log(this.cards.length + ' cards in the deck')
}

// Card Class

function Card(value, suit){
  this.value = value
  this.suit = suit
}

Card.prototype.toString = function(){
  return this.value + " of " + this.suit
}

// End of Classes
////////////////////////////////////////////////////////////////////////////////

var deck = new Deck()
deck.cut(5)
deck.print()
