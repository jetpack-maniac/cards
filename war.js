// War Class

function War(players){
  this.players = players
  this.defeated = []
  this.rounds = 0
  this.deck = new Deck()
  this.deck.shuffle()
  this.name = 'War'
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
    rank:0
  }
  var ties = []
  for(var i = 0; i < players.length; i++){
    var card = this.players[i].hand.shift()
    if(card.rank > highest.rank){
      highest.rank = card.rank
      highest.player = i
      ties = []
    }
    if(card.rank == highest){
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
