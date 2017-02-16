var suits = ['Diamonds','Clubs','Hearts','Spades']
var values = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace']
var deck = []

function Card(value, suit){
  this.value = value
  this.suit = suit
}

Card.prototype.toString = function(){
  return this.value + " of " + this.suit
}

for(var suit = 0; suit < suits.length; suit++){
  for(var value = 0; value < values.length; value++){
    var card = new Card(values[value], suits[suit])
    deck.push(card)
    console.log(card.toString())
  }
}
