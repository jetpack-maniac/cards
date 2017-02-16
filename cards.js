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

Deck.prototype.cut = function(){
  var packet = this.cards.slice(0,26)
  var packet2 = this.cards.slice(26)
  this.cards = packet2.concat(packet)
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
deck.cut()
deck.print()
