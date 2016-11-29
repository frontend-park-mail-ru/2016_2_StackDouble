(function(){

  const shuffle_times =[700, 1400];
  const Player = window.GamePlayer;
  const Card = window.GameCard;
 const value_deal_cards = 6;
  class SinglePlayer{
    /**
    * Создаёт сингл игру
    * @param {GameWorker} gamesession - объукт клиента
    * @param {array} deck - колода
    * @param {Player[]} players - игроки
    * @param {number} his_turn - чей ход. меняется циклично
    */
    constructor(data = {}){
      this.gamesession = window.gamesession || data;
      this.deck =[];
      this.players = [];
      this.his_turn = 0;

      this.fill_deck();
      this.fill_players();
      this.start();
    }

    start(){
      this.deal_cards();
      let event = new CustomEvent("onmessage");
      let data = {action: 'game_start', data:{
        rivals: this.players.slice(1, this.players.length),
        desk:{
          deck: this.deck.length,
          time: 80},
          player: this.players[0]
        }
      };
      data.deck;
      event.data = JSON.stringify(data);
      this.gamesession.receiver(event);
    }

    deal_cards(){
      this.players.forEach(function(item){
        let hand=[];
        for(let i=0; i<value_deal_cards; i++){
          hand.push(this.deck.pop());
        }
        item.update({hand:hand});
      }.bind(this));

    }

    fill_players(){
      let data = [{
        login: 'Stalin',
        avatar: "./assets/avatar.svg",
        has_star: true,
        his_turn: false,
        total_cards:0,
        score: 500,
      },
      {
        login: 'Beria',
        avatar: "./assets/avatar.svg",
        has_star: false,
        his_turn: false,
        total_cards:0,
        score: 500,
      },
      {
        login: 'Hitler',
        avatar: "./assets/avatar.svg",
        has_star: true,
        his_turn: false,
        total_cards:0,
        score: 500,
      },
      {
        login: 'Goebbels',
        avatar: "./assets/avatar.svg",
        his_turn: false,
        has_star: false,
        total_cards:0,
        score: 500,
      },];

      this.players.push(new Player(JSON.parse(localStorage.getItem('UserProfile'))));
      data.forEach(function(item){
        this.players.push(new Player(item));
      }.bind(this));

    }

    fill_deck(){
      let deck1 = [{type:"ace", total_cards: 4},{type:"king", total_cards: 4},{type:"queen", total_cards: 4},{type:"jack", total_cards: 4},{type:"joker", total_cards: 4},
      {type:"ten", total_cards: 4},{type:"nine", total_cards: 4},{type:"eight", total_cards: 4},{type:"seven", total_cards: 4},{type:"six", total_cards: 4},
      {type:"five", total_cards: 4},{type:"four", total_cards: 4},{type:"three", total_cards: 4},{type:"two", total_cards: 4}];
      g_deck.forEach(function(item){
        for(let card, i=item.total_cards || 4; i>0; i--){
          this.deck.push(new Card({type:item.type, total_cards: 1}));
        }
      }.bind(this));
      let max = this.deck.length;
      for(let pos1, pos2, tmp, i=getRandomInt(shuffle_times[0], shuffle_times[1]); i>0; i--){
        pos1 = getRandomInt(0, max);
        pos2 = getRandomInt(0, max);
        tmp = this.deck[pos1];
        this.deck[pos1] = this.deck[pos2];
        this.deck[pos2] = tmp;
      }
    }



  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  window.SinglePlayer = SinglePlayer;
})();
