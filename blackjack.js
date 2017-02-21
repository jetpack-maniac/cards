// Blackjack Class

function Blackjack(players, decks){
  this.players = players
  this.dealer = new Player('Dealer')
  players.push(this.dealer)
  this.deck = new Deck(decks)
  this.deck.shuffle()
}

Blackjack.prototype.gameloop = function(){
  this.round()
}

Blackjack.prototype.round = function(players){
  if(!players) players = this.players
  var highest = {
    player:-1,
    score:0
  }
  for(i in players){
    var player = players[i]
    var dealer = this.dealer
    player.hand = player.hand.concat(this.deck.deal(2))
    console.log(player.name)
    var score = this.score(player.hand)
    if(score > highest.score && score <= 21){
      highest.player = player
      highest.score = score
    }
    this.split(player)
    this.printHand(player)
  }
  // Dealer AI begins
  score = this.score(dealer.hand)
  while(highest.player != dealer && score < highest.score){
    if(score >= 17) break;
    dealer.hand = dealer.hand.concat(this.deck.deal(1))
    console.log('%c ' + _.last(dealer.hand).unicode(), 'color:' + _.last(dealer.hand).color() + '; font-size:20px;')
    score = this.score(dealer.hand)
    if(score > highest.score){
      highest.player = dealer
      highest.score = score
    }
  }
  console.log('Dealer: ' + score)
}

Blackjack.prototype.score = function(hand){
  var score = 0
  var aceCount = 0
  // for(i = 0; i < hand.length; i++){
  for(i in hand){
    if(hand[i].rank < 11){
      score = score + hand[i].rank
    }
    else if(hand[i].rank == 14){
      score = score + 11
      aceCount = aceCount + 1
    }
    else if(hand[i].rank >= 11){
      score = score + 10
    }
  }
  while(aceCount > 0 && score > 21){
    score = score - 10
    aceCount = aceCount -1
  }
  return score
}

Blackjack.prototype.split = function(player){
  if(!player) return
  if(player.name == 'Dealer') return
  if(player.hand[0].rank != player.hand[1].rank) return
  player.splitHand.push(player.hand.shift())
}

Blackjack.prototype.printHand = function(player){
  if(!player) return
  var hand = player.hand
  var splitHand = player.splitHand
  for(i in hand){
     console.log('%c ' + hand[i].unicode(), 'color:' + hand[i].color() + '; font-size:20px;')
  }
  console.log('Score: ' + this.score(hand))
  if(splitHand.length > 0){
    for(i in splitHand){
      console.log('%c ' + splitHand[i].unicode(), 'color:' + splitHand[i].color() + '; font-size:20px;')
    }
    console.log('Score: ' + this.score(splitHand))
  }
}
