export let games = [
  {id: '1', title: 'Zelda, Tears of the Kingdom', platform: ['Switch']},
  {id: '2', title: 'Final Fantasy 7 Remake', platform: ['PS5', 'Xbox']},
  {id: '3', title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC']},
  {id: '4', title: 'Mario Kart', platform: ['Switch']},
  {id: '5', title: 'Pokemon Scarlet', platform: ['PS5', 'Xbox', 'PC']},
]

export let authors = [
  {id: '1', name: 'mario', verified: true},
  {id: '2', name: 'yoshi', verified: false},
  {id: '3', name: 'peach', verified: true},
]

export let reviews = [
  {rating: 9, content: 'lorem ipsum', author_id: '68a2d656a49b66e9f3bc4e03', game_id: '68a2d656a49b66e9f3bc4df6'},
  {rating: 10, content: 'lorem ipsum', author_id: '68a2d656a49b66e9f3bc4e04', game_id: '68a2d656a49b66e9f3bc4df5'},
  {rating: 7, content: 'lorem ipsum', author_id: '68a2d656a49b66e9f3bc4e05', game_id: '68a2d656a49b66e9f3bc4df7'},
  {rating: 5, content: 'lorem ipsum', author_id: '68a2d656a49b66e9f3bc4e04', game_id: '68a2d656a49b66e9f3bc4df8'},
  {rating: 8, content: 'lorem ipsum', author_id: '68a2d656a49b66e9f3bc4e04', game_id: '68a2d656a49b66e9f3bc4df9'},
  {rating: 7, content: 'lorem ipsum', author_id: '68a2d656a49b66e9f3bc4e03', game_id: '68a2d656a49b66e9f3bc4df6'},
  {rating: 10, content: 'lorem ipsum', author_id: '68a2d656a49b66e9f3bc4e05', game_id: '68a2d656a49b66e9f3bc4df5'},
]

export default { games, authors, reviews }