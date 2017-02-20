var suits = ['Diamonds','Clubs','Hearts','Spades']
var values = {2:'Two', 3:'Three', 4:'Four', 5:'Five', 6:'Six', 7:'Seven', 8:'Eight', 9:'Nine', 10:'Ten', 11:'Jack', 12:'Queen', 13:'King', 14:'Ace'}

////////////////////////////////////////////////////////////////////////////////
// Classes

// Deck Class


function Deck(){
  this.cards = []
  this.dealt = []

  for(var suit = 0; suit < suits.length; suit++){
    // for(var value = 0; value < values.length; value++){
    for(var value in values){
      var card = new Card(value, suit)
      this.cards.push(card)
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
  this.value = parseInt(value)
  this.suit = suit
}

Card.prototype.toString = function(){
  return values[this.value] + " of " + suits[this.suit]
}

Card.prototype.unicode = function(){
  var unisuit
  var univalue

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

  switch(this.value){
    case 14: // Ace
      univalue = 1
      break;
    case 10: // Ten
      univalue = 'a'
      break;
    case 11: // Jack
      univalue = 'b'
      break;
    case 12: // Queen
      univalue ='d'
      break;
    case 13: // King
      univalue = 'e'
      break;
    default: // All other cards Two through Nine
      univalue = this.value
      break;
  }

  unicode = eval("'\\u{1f0" + unisuit + univalue +"}'")
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
}

///// Game classes

// War Class

function War(players){
  this.players = players
  this.defeated = []
  this.rounds = 0
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

War.prototype.gameloop = function(){
  this.round()
  for(i in this.players){
    if(this.players[i].hand.length == 0){
      this.defeated.push(this.players[i])
      console.log(this.players[i].name + ' was defeated after ' + this.rounds + ' rounds.')
      this.players.splice(i, 1)
    }
  }
}

War.prototype.round = function(players, table){
  if(!table) table = []
  if(!players) players = this.players
  var highest = {
    player:-1,
    value:0
  }
  var ties = []
  for(var i = 0; i < players.length; i++){
    var card = this.players[i].hand.shift()
    if(card.value > highest.value){
      highest.value = card.value
      highest.player = i
      ties = []
    }
    if(card.value == highest){
      ties.push(i)
      ties.push(highest.player)
    }
    table.push(card)
  }
  if(ties.length > 0){
    var handSize = 4
    for(i = 0; i < ties.length; i++){
      if(this.players[i].hand.length < handSize){
        handSize = this.players[i].hand.length
      }
    }
    for(i = 0; i < ties.length; i++){
      table = table.concat(this.players[i].hand.splice(0,handSize-1))
      this.players[i].hand = this.players[i].hand.splice(handSize-1)
    }
    this.round(ties, table)
  }
  this.players[highest.player].hand = this.players[highest.player].hand.concat(table)
  this.rounds = this.rounds + 1
}

// Blackjack Class

function Blackjack(players){
  this.players = players
  this.deck = new Deck()
  this.deck.shuffle()
}

Blackjack.prototype.round = function(players){
  if(!players) players = this.players
  for(i in players){
    var player = players[i]
    player.hand = player.hand.concat(this.deck.deal(2))
    console.log(player.name, player.hand)
    this.score(player.hand)
  }
}

Blackjack.prototype.score = function(hand){
  var score = 0
  // for(i = 0; i < hand.length; i++){
  for(i in hand){
    console.log(hand[i].unicode())
    if(hand[i].value < 11){
      score = score + hand[i].value
    }
    else if(hand[i].value == 14){
      score = score + 11
    }
    else if(hand[i].value >= 11){
      score = score + 10
    }
  }
  console.log(score)
}

// Poker Class

function Poker(players){
  this.players = players
  this.deck = new Deck()
  this.deck.shuffle()
}

Poker.prototype.round = function(players){
  if(!players) players = this.players
  for(i in players){
    var player = players[i]
    player.hand = player.hand.concat(this.deck.deal(5))
    console.log(player.name)
    for(i in player.hand){
       console.log('%c ' + player.hand[i].unicode(), 'color:' + player.hand[i].color() + ';')
    }
  }
}

// End of Classes
////////////////////////////////////////////////////////////////////////////////

var p1 = new Player('Tom')
var p2 = new Player('Dick')
var p3 = new Player('Harry')
var people = [p1,p2,p3]

var game = new Poker(people)

game.round()

// while(game.players.length > 1){
//   game.gameloop()
// }
//
// console.log(game.players[0].name + ' won.')
