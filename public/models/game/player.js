(function () {
  'use strict';
  const PlayerModel =	window.PlayerModel;
  class Player extends PlayerModel{
    /**
    * Создаёт нового игрока
    * @param {Card[]} hand - колода игрока
    * @param {boolean} his_turn - ход игрока
    * @param {object} action
    * @param {boolean} action.action
    * @param {Card[]} action.cards
    */
    constructor(data) {
      super(data);
      this.action = {action:false, cards:[]};
      this.his_turn = data.his_turn || false;
      this.out_of_game = false;
      this.onchange = function(){};
      this.onaction = function(){};
      this.hand = {};
      //TODO: исправить
      this.new_cards = data.new_cards || 1; //количество полученных карт и также количество, которое нужно обменять. поэтому не может быть 0
      data.hand = data.hand || g_deck;
      for(let card in data.hand){
        this.hand[card] = new Card(data.hand[card]);
      }
    }


//TODO: выбрать реализацию в зависимости от инфы от сервера
/**
* апдейт колоды игрока
* @param {object} data - поля для обновления
* @param {Card[]} data.hand - колода игрока
*/
update(data){
  //переписать
  this.out_of_game = data.out_of_game || this.out_of_game;
  this.score =   data.score || this.score ;
  this.his_turn = data.his_turn || this.his_turn;
  if(data.hand){

    //см. описание поля
    if(data.hand.length !==0){
  this.new_cards = data.hand.length;
}else{
  this.new_cards = 1;
}
  for(let card in this.hand){
    this.hand[card].new_cards =0;
  }
  data.hand.forEach(function(item){
    let card = this.hand[item.type];
    card.new_cards += item.total_cards;
    card.total_cards += item.total_cards;
  }.bind(this));
}
  this.onchange();
}


/**
* возвращает колличество карт у игрока
* @return {number} total - колода игрока
*/
get total_cards(){
  let total =0;
  for(let card in this.hand){
    total += this.hand[card].total_cards;
  }
  return total;
}


/**
* фиксирует действие для отправки на сервер
* @param {string} action - комбо|обмен
* @param {Card[]} cards - список карт над которыми сделать действие
* @returns {statusText}
*/
do_action(action, cards){
  if(action == g_action_name__exchange && this.new_cards != cards.length){
    return "error";
  }
  cards = JSON.parse(JSON.stringify(cards));
  let backup  = JSON.parse(JSON.stringify(this.hand));
  cards.forEach(function(item, i, cards){
    this.hand[item.type].total_cards--;
    if(this.hand[item.type].total_cards<0){
      this.hand=backup;
      return "error";
    }
  }.bind(this));

  if( action == g_action_name__combo && this.check_combo(cards)===0){
    this.hand=backup;
    return "error";
  }

  if(cards.length !==0 ){
    this.action.cards = cards;
    this.action.action = action;
  }

  //TODO: так или ждать ответа серва?
  this.his_turn = false;
  this.onaction();
  return "ok";
}



check_combo(cards){
  let hand = {};
  cards.forEach(function(item, i, cards){
    if(item.type in hand){
      this[item.type].total_cards+=1;
    }else{
      this[item.type] = {total_cards:1};
    }
  }.bind(hand));
  //TODO: переделать. тут оче криво
  let ok_notype = false, ok_type = false, comb_name;
  for(let comb in g_combinations){
    ok_notype = false;
    ok_type = false;
    for(let card in hand){
      if(g_combinations[comb].notype && g_combinations[comb].notype==hand[card].total_cards){
        ok_notype = true;
      }
      if(g_combinations[comb].type){
        for(let scard in hand){
          if(scard in g_combinations[comb].type && g_combinations[comb].type[scard] === hand[card].total_cards){
            ok_type = true;
          }
        }
      }else{
        ok_type = true;
      }
    }
    if(ok_notype && ok_type){
      comb_name = comb;
    }
  }

  if(comb_name){
     return comb_name;
  } else {
    return 0;
  }
}

}


class Card{
  /**
  * Создаёт карту представляющую собой набор карт такого же номинала
  * @param {string} type - номинал карты
  * @param {number} total_cards - всего катр такого номинала
  * @param {number} new_cards - новых с последней раздачи
  */
  constructor(data) {
    this.type = data.type;
    this.total_cards = data.total_cards || 0;
    this.new_cards = data.new_cards || this.total_cards;
  }
}


//export
window.GamePlayer = Player;
window.GameCard = Card;

})();
