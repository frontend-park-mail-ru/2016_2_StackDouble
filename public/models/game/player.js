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

      this.hand = [];
      if(data.hand){
      data.hand.forEach(function(item){
      this.hand.push(new Card(item));
      }.bind(this));
    }else{
      g_deck.forEach(function(item){
      this.hand.push(new Card(item));
      }.bind(this));
    }
    
    }

//TODO: сделать колоду ассоциативным массивом?
    get_card(str){
      for(let j=0; j<this.hand.length; j++){
        if(str === this.hand[j].type) {
          return this.hand[j];
        }}
    }


    //TODO: выбрать реализацию в зависимости от инфы от сервера
    /**
    * апдейт колоды игрока
    * @param {Card[]} hand - колода игрока
    */

    update(data){
      //переписать
      this.his_turn = data.his_turn || this.his_turn;
      this.hand.forEach(function(item, i, hand){
        item.new_cards =0;
        for(let j=0; j<this.length; j++){
          if(item.type === this[j].type) {
            item.total_cards+=this[j].total_cards;
            item.new_cards+=this[j].total_cards;
            //break;
          }
        }
      }.bind(data.hand));
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
      this.hand.forEach((item, i, hand) => {
        total+=item.total_cards;
      }, total);
      return total;
    }

    /**
    * фиксирует действие для отправки на сервер
    * @param {string} action - комбо|обмен
    * @param {Card[]} cards - список карт над которыми сделать действие
    * @returns {statusText}
    */
    do_action(action, cards){
      let backup  = JSON.parse(JSON.stringify(this.hand));
      cards.forEach(function(item, i, cards){
        for(let j=0; j<this.hand.length; j++){
          if(item.type === this.hand[j].type) {
            this.hand[j].total_cards--;
            if(this.hand[j].total_cards<0){
              this.hand=backup;
              return "error";
            }
            break;
          }
        }
      }.bind(this));
      if(cards.length !==0 ){
        this.action.cards = cards;
        this.action.action = action;
        this.has_new_action = true;
      }
      return "ok";
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
      this.new_cards = data.new_cards || 0;
    }
  }


//export
window.GamePlayer = Player;
window.GameCard = Card;

})();
