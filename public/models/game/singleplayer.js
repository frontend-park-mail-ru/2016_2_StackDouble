(function(){

  const shuffle_times =[700, 1400];
  const Player = window.GamePlayer;
  const Card = window.GameCard;
  const value_deal_cards = 36;
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
      this.gamesession.send = this.onsend.bind(this);
      this.previous_thrown_cards = 2;

      this.fill_deck();
      this.fill_players();
      this.start();
    }

    /**
    * колбек на send GameWorker
    * @callback
    * @param {Card[]} hand - колода игрока
    */
    onsend(msg){
      switch(msg.action) {
        case "combo":
        let combo = this.players[0].check_combo(msg.cards);
        if (combo!==0) {
          this.players[0].do_action("combo", msg.cards);
          this.players[0].score+= g_combinations[combo].score;
          let event = new CustomEvent("onmessage");
          let data = {action: 'change_player', data:{
            player:{
              his_turn: false,
              score: this.players[0].score
            }}};
            this.previous_thrown_cards = 2;
            event.data = JSON.stringify(data);
            this.gamesession.receiver(event);
          }
          break;

          case "exchange":
          this.put_deck_cards(msg.cards);
          break;
        }
        this.make_turn();
      }

      //подать сигнал о нчале игры
      start(){
        this.deal_cards();
        this.players.forEach((item)=>{
          item.new_cards=2;
        });
        let event = new CustomEvent("onmessage");
        let data = {action: 'game_start', data:{
          rivals: this.prepared_rivals(),
          desk:{
            deck: this.deck.length,
            time: 80},
            player: this.players[0]
          }
        };
        event.data = JSON.stringify(data);
        this.gamesession.receiver(event);
      }

      //соперники делают ход и отправка даннах
      make_turn(){
        let rivals =this.players.slice(1, this.players.length);
        for(let i=0; i<rivals.length; i++){
          rivals[i].update({hand:this.take_deck_cards(this.previous_thrown_cards)});
          let exchange, combo = this.pick_combo(rivals[i]);
          if(combo){
            rivals[i].score += g_combinations[combo].score;
            this.previous_thrown_cards = 2;
          }else{
            exchange = this.pick_exchange(rivals[i]);
            this.put_deck_cards(exchange);
          }

          let event = new CustomEvent("onmessage");
          let data = {action: 'change_rivals', data:{
            rivals: this.prepared_rivals() }};
            event.data = JSON.stringify(data);
            this.gamesession.receiver(event);
          }

          let event = new CustomEvent("onmessage");

          let  data = {action: 'next_round', data:{
            rivals: this.prepared_rivals(),
            desk:{
              deck: this.deck.length,
              time: 80},
              player: {
                his_turn: true,
                hand: this.take_deck_cards(this.previous_thrown_cards),
              }
            }
          };
          event.data = JSON.stringify(data);
          this.gamesession.receiver(event);
        }

        /**
        * выбирает комбо
        * @return {string} name - имя комбинации
        */
        pick_combo(hand){
          let best = 0;
          let bestcomb, notype_card_name;

          for(let comb in g_combinations){
            if(g_combinations[comb].notype){
              for(let card in hand){
                if(hand[card].total_cards>g_combinations[comb].notype && g_combinations[comb].score>best){
                  if(g_combinations[comb].type){
                    for(let scard in hand){
                      if(scand in g_combinations[comb].type && hand[scard].total_cards>g_combinations[comb].type[scard] && g_combinations[comb].score>best){
                        best=g_combinations[comb].score;
                        bestcomb = comb;
                        notype_card_name = card;
                      }
                    }
                  }else{
                    best=g_combinations[comb].score;
                    bestcomb = comb;
                  }
                }
              }
            }else{
              for(let scard in hand){
                if(scand in g_combinations[comb].type && hand[scard].total_cards>g_combinations[comb].type && g_combinations[comb].score>best){
                  best=g_combinations[comb].score;
                  bestcomb = comb;
                }
              }
            }
          }

          if(bestcomb){
            hand[notype_card_name].total_cards -= g_combinations[bestcomb].notype;
            for(let card in g_combinations[bestcomb].type){
              hand[card].total_cards -= g_combinations[bestcomb].type[card];
            }
          }

          return bestcomb;
        }

        pick_exchange(player){
          //пока так
          let i =player.new_cards, j=100, cards =[];
          while(i>0){
            for(let card in player.hand){
              if((getRandomInt(1, 10)==5 && player.hand[card].total_cards>0) || j<0){
                player.hand[card].total_cards--;
                cards.push(new Card({type:player.hand[card].type, total_cards: 1}));
                i--;
              }
            }
            j--;
          }
          return cards;
        }

        //передать обрезаную версию игрока, как соперников
        prepared_rivals(beg=1, end=this.players.length){
          if(end>this.players.length){
            end-=this.players.length;
            beg+=this.players.length;
          }
          let tmp, rivals =this.players.slice(beg, end);
          tmp = JSON.stringify(rivals);
          tmp = JSON.parse(tmp);
          tmp.forEach(function(item, i){
            item.deck = null;
            item.total_cards = rivals[i].total_cards;
          }.bind(this));
          return tmp;
        }

        //раздать карты
        deal_cards(){
          this.players.forEach(function(item){
            let hand=[];
            for(let i=0; i<value_deal_cards; i++){
              hand.push(this.deck.pop());
            }
            item.update({hand:hand});
          }.bind(this));

        }

        //взять из колоды карты
        take_deck_cards(number){
          let hand = [];
          for(let i= 0; i<number; i++){
            hand.push(this.deck.pop());
          }
          return hand;
        }

        put_deck_cards(cards){
          this.deck = [].concat(this.deck, cards);
        }

        //перетасовать колоду
        shuffle_deck(min=shuffle_times[0], max=shuffle_times[1]){
          let length = this.deck.length;
          for(let pos1, pos2, tmp, i=getRandomInt(min, max); i>0; i--){
            pos1 = getRandomInt(0, length);
            pos2 = getRandomInt(0, length);
            tmp = this.deck[pos1];
            this.deck[pos1] = this.deck[pos2];
            this.deck[pos2] = tmp;
          }
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

        //создать колоду и перетасовать
        fill_deck(){
          for(let card in g_deck){
            for(let i= 24; i>0; i--){
              this.deck.push(new Card({type:card, total_cards: 1}));
            }
          }
          this.shuffle_deck();
        }



      }
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      window.SinglePlayer = SinglePlayer;
    })();
