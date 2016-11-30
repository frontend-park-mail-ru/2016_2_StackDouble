(function () {
  'use strict';
  const PlayerModel =	window.PlayerModel;
  class Player extends PlayerModel{
    /**
    * Создаёт нового игрока
    * @param {Card[]} hand - колода игрока
    * @param {string} action - действие игрока
    * @param {boolean} has_new_action - наличие нового действия
    * @param {boolean} his_turn - ход игрока
    * @param {object} action
    * @param {boolean} action.action
    * @param {Card[]} action.cards
    */
    constructor(data) {
      super(data);
      this.has_new_action = false;
      this.action = {action:false, cards:[]};
      this.his_turn = data.his_turn || false;
      this.drawer = [];
      this.onchange = function(){};
      this.hand = {};
      //TODO: исправить
      this.new_cards = 2;
      data.hand = data.hand || g_deck;
      for(let card in data.hand){
        this.hand[card] = new Card(data.hand[card]);
      }
    }

    //TODO: сделать колоду ассоциативным массивом?
    /*    get_card(str){
    for(let j=0; j<this.hand.length; j++){
    if(str === this.hand[j].type) {
    return this.hand[j];
  }}
}*/


//TODO: выбрать реализацию в зависимости от инфы от сервера
/**
* апдейт колоды игрока
* @param {Card[]} hand - колода игрока
*/

update(data){
  debugger;
  //переписать
  this.his_turn = data.his_turn || this.his_turn;
  if(data.hand){
  this.new_cards = data.hand.length;
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
* действие игрока
* @returns {object} action - колода игрока
* @returns {string} action.action - название дейстия
* @returns {Card[]} action.cards - название дейстия
*/
//не нужна?
get_action(){
  if(this.action.action !== true){
    this.has_new_action = false;
    return this.action;
  } else {
    return {action:false};
  }
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

  let backup  = JSON.parse(JSON.stringify(this.hand));
  cards.forEach(function(item, i, cards){
    this.hand[item.type].total_cards--;
    if(this.hand[item.type].total_cards<0){
      this.hand=backup;
      return "error";
    }
  }.bind(this));

  if(this.check_combo(cards)===0){
    this.hand=backup;
    return "error";
  }

  if(cards.length !==0 ){
    this.action.cards = cards;
    this.action.action = action;
    this.has_new_action = true;
  }
  this.his_turn = false;
  return "ok";
}

check_combo(cards){
  let hand = {};
  cards.forEach(function(item, i, cards){
    if(item.type in hand){
      hand[item.type].total_cards+=1;
    }else{
      hand[item.type] = {total_cards:1};
    }
  }.bind(this));
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

class Deck{
  /**
  * колода как ассоциативный массив
  * @param {Array} deck
  */
  constructor(deck = g_deck) {
    this.deck_pr = {};
    for(let card in deck){
      this.deck_pr[card] = new Card(deck[card]);
    }
  }

}


//export
window.GamePlayer = Player;
window.GameDeck = Deck;
window.GameCard = Card;

})();
