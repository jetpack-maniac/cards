// Blackjack Class

function Blackjack(players, decks){
  this.players = players
  this.dealer = new Player('Dealer')
  players.push(this.dealer)
  this.deck = new Deck(decks)
  this.deck.shuffle()
  this.name = 'Blackjack'
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
  var _this = this
  _.forEach(players, function(player){
  // for(i in players){
    // var player = players[i]
    player.hand = player.hand.concat(_this.deck.deal(2))
    var score = _this.score(player.hand)
    if(score > highest.score && score <= 21){
      highest.player = player
      highest.score = score
    }
    _this.split(player)
  })
  // Dealer AI begins
  var dealer = this.dealer
  score = this.score(dealer.hand)
  while(highest.player != dealer && score < highest.score){
    if(score >= 17) break;
    this.hit(dealer)
    score = this.score(dealer.hand)
    if(score > highest.score){
      highest.player = dealer
      highest.score = score
    }
  }
}

Blackjack.prototype.hit = function(player, split){
  if(this.score(player.hand) >= 21) return
  if(split == true) player.splitHand = player.splitHand.concat(this.deck.deal(1))
  else player.hand = player.hand.concat(this.deck.deal(1))
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
    aceCount = aceCount - 1
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
  _.forEach(hand, function(card){
     console.log('%c ' + card.unicode(1), 'color:' + card.color() + '; font-size:20px;')
  })
  console.log('Score: ' + this.score(hand))
  if(splitHand.length > 0){
    _.forEach(splitHand, function(card){
      console.log('%c ' + card.unicode(1), 'color:' + card.color() + '; font-size:20px;')
    })
    console.log('Score: ' + this.score(splitHand))
  }
}
