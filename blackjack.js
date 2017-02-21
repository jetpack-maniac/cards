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
    console.log(player.name, player.hand)
    for(i in player.hand){
       console.log('%c ' + player.hand[i].unicode(), 'color:' + player.hand[i].color() + '; font-size:20px;')
    }
    var score = this.score(player.hand)
    if(score > highest.score && score <= 21){
      highest.player = player
      highest.score = score
    }
    console.log(score)
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
    console.log(score)
  }
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
