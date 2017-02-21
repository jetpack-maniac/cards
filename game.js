var p1 = new Player('Tom')
var p2 = new Player('Dick')
var p3 = new Player('Harry')
var people = [p1,p2,p3]

var game = new Blackjack(people)

game.round()

// while(game.players.length > 1){
//   game.gameloop()
// }
//
// console.log(game.players[0].name + ' won.')
