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
      this.hand = [];
      data.hand.forEach(function(item, i, data){
      this.hand.push(new Card(item));
      }.bind(this));
      this.has_new_action = false;
      this.action = {action:false, cards:[]};
      this.his_turn = false;
      this.update([{type:"ace"},{type:"ace"}]);
    }

    //TODO: выбрать реализацию в зависимости от инфы от сервера
    /**
    * апдейт колоды игрока
    * @param {Card[]} hand - колода игрока
    */
    update(cards){
      //переписать
      this.hand.forEach(function(item, i, hand){
        item.new_cards =0;
        for(var j=0; j<this.length; j++){
          if(item.type === this[j].type) {
            item.total_cards++;
            item.new_cards++;
          }
        }
      }.bind(cards));
    }

    /**
    * апдейт колоды игрока
    * @returns {object} action - колода игрока
    */
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
      var total =0;
      this.hand.forEach((item, i, hand) => {
        total+=item.total_cards;
      }, total);
      return total;
    }

    /**
    * фиксирует действие для отправки на сервер
    * @returns {statusText}
    */
    do_action(action, cards){
      var backup  = JSON.parse(JSON.stringify(this.hand));
      cards.forEach(function(item, i, cards){
        for(var j=0; j<this.hand.length; j++){
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
})();
