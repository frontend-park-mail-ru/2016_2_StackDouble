(function(){

  class TestInfo{
    constructor(){
      this.data ={};
      this.data['game_start']={action: 'game_start', data: {
        rivals: [
          {
            login: 'Stalin',
            avatar: "./assets/avatar.svg",
            has_star: true,
            his_turn: true,
            score: 500,
            total_cards: 7,
          },
          {
            login: 'Beria',
            avatar: "./assets/avatar.svg",
            has_star: false,
            his_turn: false,
            total_cards: 3,
          },
          {
            login: 'Hitler',
            avatar: "./assets/avatar.svg",
            has_star: true,
            his_turn: false,
            total_cards: 0,
          },
          {
            login: 'Goebbels',
            avatar: "./assets/avatar.svg",
            has_star: false,
            his_turn: false,
            total_cards: 0,
          },
        ],
        desk:{
          deck: 112,
          timer: "80",
        },
        player:{
          his_turn: false,
          hand: [
            {type:"ace", total_cards: 1},{type:"king", total_cards: 0},{type:"queen", total_cards: 2},{type:"jack", total_cards: 0},{type:"joker", total_cards: 1},
            {type:"ten", total_cards: 0},{type:"nine", total_cards: 1},{type:"eight", total_cards: 0},{type:"seven", total_cards: 1},{type:"six", total_cards: 2},
            {type:"five", total_cards: 0},{type:"four", total_cards: 0},{type:"three", total_cards: 0},{type:"two", total_cards: 3},
          ]}
        }};

      this.data['deck'] = [
          {type:"ace", total_cards: 4},{type:"king", total_cards: 4},{type:"queen", total_cards: 4},{type:"jack", total_cards: 4},{type:"joker", total_cards: 4},
          {type:"ten", total_cards: 4},{type:"nine", total_cards: 4},{type:"eight", total_cards: 4},{type:"seven", total_cards: 4},{type:"six", total_cards: 4},
          {type:"five", total_cards: 4},{type:"four", total_cards: 4},{type:"three", total_cards: 4},{type:"two", total_cards: 4}
        ];

      this.data['change_player'] = { action: 'change_player', data:{
          player:{
            his_turn: false,
            hand: [
              {type:"jack", total_cards: 0},{type:"joker", total_cards: 1},
              {type:"ten", total_cards: 0},{type:"nine", total_cards: 1},{type:"eight", total_cards: 0},{type:"seven", total_cards: 1},{type:"six", total_cards: 2},
              {type:"five", total_cards: 0},{type:"two", total_cards: 3},
            ]}}};

      this.data['change_rivals'] = {action: 'change_rivals', data:{rivals: [
              {
                login: 'Stalin',
                his_turn: false,
                score: 500,
                total_cards: 12,
                action: 'combo',
                combo_type: 'street'

              },
              {
                login: 'Goebbels',
                his_turn: true,
                total_cards: 5,
              }
            ],  }};

      this.data['next_round'] = {action: 'next_round', data:{
              player:{
                his_turn: false,
                hand: [
                  {type:"jack", total_cards: 0},{type:"joker", total_cards: 1},
                  {type:"ten", total_cards: 0},{type:"nine", total_cards: 1},{type:"eight", total_cards: 0},{type:"seven", total_cards: 1},{type:"six", total_cards: 2},
                  {type:"five", total_cards: 0},{type:"two", total_cards: 0}]},
                  rivals: [
                    {
                      login: 'Stalin',
                      his_turn: true,
                      score: 500,
                      total_cards: 17,
                    },
                    {
                      login: 'Beria',
                      his_turn: false,
                      total_cards: 5,
                    },
                    {
                      login: 'Hitler',
                      his_turn: false,
                      total_cards: 22,
                    },
                    {
                      login: 'Goebbels',
                      his_turn: false,
                      total_cards: 4,
                    },
                  ],
                  desk:{
                    deck: 20,
                    timer: "20",
                  }
                }};


      }
    }

  //window.TestInfo = new TestInfo();
})();
