(function(){

  const Player = window.GamePlayer;
  const Card = window.GameCard;
  const shuffle_times =[700, 1400];
  const value_deal_cards = 5; //число раздаваемых в начале карт
  const speed_move = 500; //время между ходами
  class SinglePlayer{
    /**
    * Создаёт сингл игру
    * @param {GameWorker} gamesession - объект клиента
    * @param {Card[]} deck - колода
    * @param {Player[]} players - игроки
    * @param {number} his_turn - чей ход. меняется циклично
    */
    constructor(data = {}){
      console.log("SinglePlayer created");
      this.gamesession = data || window.gamesession ;
      this.deck =[];
      this.players = [];
      this.gamesession.send = this.onsend.bind(this);
      this.previous_thrown_cards = 1;
      this.queue = 0;
      this.intervalId;
      this.do_move = false;

      this.fill_deck();
      this.fill_players();
      this.start();
    }

    /**
    * колбек на send GameWorker
    * @callback
    * @param {object} msg -
    * @param {string} msg.action - дейсвие
    * @param {Cards[]} msg.cards - карты
    */
    onsend(msg){
      console.log("SinglePlayer received message");
      switch(msg.action) {
        case "combo":
        break;
        this.handle_combo_message(msg);
        case "exchange":
        this.handle_exchange_message(msg);
        break;
      }
      this.next_round();
    }

    /**
    * обработка сообщения
    */
    handle_exchange_message(msg){
      let hand={};
      msg.cards.forEach(function(item, i, cards){
        if(item.type in hand){
          this[item.type].total_cards+=1;
        }else{
          this[item.type] = {total_cards:1};
        }
      }.bind(hand));
      for (let item in hand){
        this.players[0].hand[item].total_cards -= hand[item].total_cards;
      }
      this.put_deck_cards(msg.cards);
    }

    /**
    * обработка сообщения
    */
    handle_combo_message(msg){
      let combo = this.players[0].check_combo(msg.cards);
      if (combo!==0) {
        let hand={};
        msg.cards.forEach(function(item, i, cards){
          if(item.type in hand){
            this[item.type].total_cards+=1;
          }else{
            this[item.type] = {total_cards:1};
          }
        }.bind(hand));
        for (let item in hand){
          this.players[0].hand[item].total_cards -= hand[item].total_cards;
        }

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
      }

      /**
      * подать сигнал о нчале игры
      */
      start(){
        this.deal_cards();
        this.players.forEach((item)=>{
          item.new_cards=0;
        });
        this.players[0].new_cards=this.previous_thrown_cards;
        this.players[0].his_turn = true;
        let event = new CustomEvent("onmessage");
        let data = {action: 'game_start', data:{
          rivals: this.prepared_rivals(),
          desk:{
            deck: this.deck.length,
            timer: 80},
            player: this.players[0]
          }
        };
        event.data = JSON.stringify(data);
        this.gamesession.receiver(event);
      }

      /**
      * соперники делают ход и отправка даннах
      */
      next_round(){
        //1 т.к. 0 это пользователь
        this.queue = 1;
        this.intervalId =  setInterval(this.make_move.bind(this), speed_move);
      }


      /**
      * сделать ход игроку
      */
      make_move(){
        let i = this.queue, player = this.players[i];
        if(!player.out_of_game){
          //создание видимости, что делается ход
          let cards, exchange, combo;
          if(!this.do_move){
            this.do_move =! this.do_move;
            cards = this.take_deck_cards(this.previous_thrown_cards);
            player.update({hand:cards});
            player.his_turn = true;
            this.send_change_rivals();
            player.his_turn = false;
            return;
          }
          this.do_move =! this.do_move;

          combo = this.pick_combo(player.hand);
          if(combo){
            player.score += g_combinations[combo].score;
            this.previous_thrown_cards = 1;
            exchange = this.pick_exchange(player);
            this.put_deck_cards(exchange);
            this.previous_thrown_cards = 2;
          }else{
            exchange = this.pick_exchange(player);
            this.put_deck_cards(exchange);
            this.previous_thrown_cards++;
          }
          //если карты кончились вывести из игры, следующий игрок передаст только 1 карту, так как ничего не получит
          //длина колоды, чтобы быстро не выходили из игры пока
          if(player.total_cards===0 && this.deck.length===0){
            player.out_of_game = true;
            this.previous_thrown_cards=1;
          }
        }

        this.queue++;
        if(this.queue>this.players.length-1){
          clearInterval(this.intervalId);
          let event = new CustomEvent("onmessage");
          let cards = this.take_deck_cards(this.previous_thrown_cards);
          if(cards.length===0 && this.players[0].total_cards===0){
            this.players[0].out_of_game=true;
          }
          this.players[0].update({hand:cards});
          let  data = {action: 'next_round', data:{
            rivals: this.prepared_rivals(),
            desk:{
              deck: this.deck.length,
              timer: 80},
              player: {
                his_turn: true,
                hand: cards,
              }
            }
          };
          event.data = JSON.stringify(data);
          this.gamesession.receiver(event);

          //проверяем все ли игроки вышли из игры и завершаем её
          let end = this.players.filter(function(player) {
            return !player.out_of_game;
          });
          if(end.length===0){
            let event = new CustomEvent("onmessage");
            let data = {action: 'game_end', data:{
              rivals: this.prepared_rivals(),
              player: {
                score: this.players[0].score,
                out_of_game: this.players[0].out_of_game,
              }}};
              event.data = JSON.stringify(data);
              this.gamesession.receiver(event);
            }

          }
        }

        send_change_rivals(){
          let event = new CustomEvent("onmessage");
          let data = {action: 'change_rivals', data:{
            rivals: this.prepared_rivals() }};
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
                  if(hand[card].total_cards>=g_combinations[comb].notype && g_combinations[comb].score>best){
                    if(g_combinations[comb].type){
                      for(let scard in hand){
                        if(scard in g_combinations[comb].type && hand[scard].total_cards>=g_combinations[comb].type[scard] && g_combinations[comb].score>best){
                          best=g_combinations[comb].score;
                          bestcomb = comb;
                          notype_card_name = card;
                        }
                      }
                    }else{
                      best=g_combinations[comb].score;
                      notype_card_name = card;
                      bestcomb = comb;
                    }
                  }
                }
              }else{
                for(let scard in hand){
                  if(scand in g_combinations[comb].type && hand[scard].total_cards>=g_combinations[comb].type && g_combinations[comb].score>best){
                    best=g_combinations[comb].score;
                    bestcomb = comb;
                  }
                }
              }
            }
            if(bestcomb){
              if(notype_card_name){
                hand[notype_card_name].total_cards -= g_combinations[bestcomb].notype;
              }
              for(let card in g_combinations[bestcomb].type){
                hand[card].total_cards -= g_combinations[bestcomb].type[card];
              }
            }
            return bestcomb;
          }

          /**
          * случайно выбираем карты на обмен
          */
          pick_exchange(player){
            //пока так
            let i =player.new_cards, j=10, cards =[];
            if(i>player.total_cards){i=player.total_cards;}
            while(i>0){
              for(let card in player.hand){
                if((getRandomInt(1, 5)==3 || j<0) && player.hand[card].total_cards>0){
                  player.hand[card].total_cards--;
                  cards.push(new Card({type:player.hand[card].type, total_cards: 1}));
                  i--;
                  if(i===0){
                    break;
                  }
                }
              }
              j--;
            }
            return cards;
          }

          /**
          * передать обрезаную версию игрока, как соперников
          */
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

          /**
          * раздать карты
          */
          deal_cards(){
            this.players.forEach(function(item){
              let hand=[];
              for(let i=0; i<value_deal_cards; i++){
                hand.push(this.deck.pop());
              }
              item.update({hand:hand});
            }.bind(this));
          }

          /**
          * взять из колоды карты
          */
          take_deck_cards(number){
            let hand = [];
            for(let i= 0; i<number && this.deck.length>0; i++){
              hand.push(this.deck.pop());
            }
            return hand;
          }

          /**
          * положить карты в колоду
          */
          put_deck_cards(cards){
            let e_deck=[];
            for(let i=0; i<cards.length; i++){
              e_deck.push(new Card({type:cards[i].type, total_cards:1}));
            }
            this.deck = [].concat(this.deck, e_deck);
          }

          /**
          * перетасовать колоду
          */
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

          /**
          * создать всех игроков
          */
          fill_players(){
            let data = [{
              login: 'Stalin',
              avatar: "./assets/avatar.svg",
              has_star: true,
              his_turn: false,
              total_cards:0,
              score: 0,
            },
            {
              login: 'Beria',
              avatar: "./assets/avatar.svg",
              has_star: false,
              his_turn: false,
              total_cards:0,
              score: 0,
            },
            {
              login: 'Hitler',
              avatar: "./assets/avatar.svg",
              has_star: true,
              his_turn: false,
              total_cards:0,
              score: 0,
            },
            {
              login: 'Goebbels',
              avatar: "./assets/avatar.svg",
              his_turn: false,
              has_star: false,
              total_cards:0,
              score: 0,
            },];

            this.players.push(new Player(JSON.parse(localStorage.getItem('UserProfile'))));
            data.forEach(function(item){
              this.players.push(new Player(item));
            }.bind(this));

          }

          /**
          * создать колоду и перетасовать
          */
          fill_deck(){
            for(let card in g_deck){
              for(let i= 4; i>0; i--){
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
