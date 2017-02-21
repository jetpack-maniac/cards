var suits = ['Diamonds','Clubs','Hearts','Spades']
var ranks = {2:'Two', 3:'Three', 4:'Four', 5:'Five', 6:'Six', 7:'Seven', 8:'Eight', 9:'Nine', 10:'Ten', 11:'Jack', 12:'Queen', 13:'King', 14:'Ace'}

////////////////////////////////////////////////////////////////////////////////
// Classes

// Deck Class


function Deck(decks){
  if(!decks) decks = 1
  this.cards = []
  this.dealt = []

  for(i = 0; i < decks; i++){
    for(var suit = 0; suit < suits.length; suit++){
      for(var rank in ranks){
        var card = new Card(rank, suit)
        this.cards.push(card)
      }
    }
  }
}

Deck.prototype.cut = function(cuts){
  if(!cuts) cuts = Math.floor((Math.random() * 9) + 1)
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
  deckSize = this.cards.length
  var left = this.cards.slice(0,deckSize/2)
  var right = this.cards.slice(deckSize/2)
  this.cards = []

  for(var i = 0; i < 26; i++){
    this.cards.push(left[i])
    this.cards.push(right[i])
  }
}

Deck.prototype.shuffle = function (){
  var shuffles = Math.floor((Math.random() * 50) + 25)
  console.log(shuffles + ' shuffles')
  for(i = 0; i < shuffles; i++){
    this.cut()
    this.faro()
  }
}

Deck.prototype.deal = function(number){
  if(!number) number = 1
  if(number > this.cards.length) throw new Error('Deck ran out of cards.')
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

function Card(rank, suit){
  this.rank = parseInt(rank)
  this.suit = suit
}

Card.prototype.toString = function(){
  return ranks[this.rank] + " of " + suits[this.suit]
}

Card.prototype.unicode = function(){
  var unisuit
  var unirank

  switch(this.suit){
    case 0: // Diamonds
      unisuit = 'c'
      break;
    case 1: // Clubs
      unisuit = 'd'
      break;
    case 2: // Hearts
      unisuit = 'b'
      break;
    case 3: // Spades
      unisuit = 'a'
      break;
  }

  switch(this.rank){
    case 14: // Ace
      unirank = 1
      break;
    case 10: // Ten
      unirank = 'a'
      break;
    case 11: // Jack
      unirank = 'b'
      break;
    case 12: // Queen
      unirank ='d'
      break;
    case 13: // King
      unirank = 'e'
      break;
    default: // All other cards Two through Nine
      unirank = this.rank
      break;
  }

  unicode = eval("'\\u{1f0" + unisuit + unirank +"}'")
  return unicode
}

Card.prototype.color = function(){
  switch(this.suit){
    case 0: return 'red'
    case 1: return 'black'
    case 2: return 'red'
    case 3: return 'black'
  }
}

// Player Class

function Player(name){
  this.name = name
  this.hand = []
  this.ai = true
}

// End of Classes
////////////////////////////////////////////////////////////////////////////////
// Functions

function sort(deck){
  var deckSize = suits.length*_.keys(ranks).length
  var sorted = new Array(deckSize)
  for(i = 0; i < deckSize; i++) sorted[i] = []
  for(i in deck){
    var card = deck[i]
    var score = (((card.rank-2)*4)+card.suit)
    sorted[score].push(card)
  }
  sorted = _.flatten(sorted)
  return sorted
}

// End Functions
////////////////////////////////////////////////////////////////////////////////
