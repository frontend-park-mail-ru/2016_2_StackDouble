(function () {
  'use strict';
  const PlayerModel =	window.PlayerModel;
  class Player extends PlayerModel{
    /**
    * Создаёт нового пользователя
    * @param [{Card}] hand - колода игрока
    * @param action - действие игрока
    */
    constructor(data) {
      super(data);
      this.hand = [];
      this.has_new_action = false;
      this.action = {action:false, cards:[]};
    }

    //TODO: выбрать реализацию в зависимости от инфы от сервера
    update(hand){
      this.hand = hand;
    }

    get_action(){
      if(this.action.action !== true){
        this.has_new_action = false;
        return this.action;
      } else {
        return {action:false};
      }
    }

    get total_cards(){
      var total =0;
      this.hand.forEach((item, i, hand) => {
        total+=item.total_cards;
      }, total);
      return total;
    }

    do_action(action, cards){
      var backup  = JSON.parse(JSON.stringify(this.hand));
      cards.forEach((item, i, cards) => {
        for(j=0; j<this.hand.length; j++){
          if(item.value === this.hand[j].value) {
            this.hand[j].total_cards--;
            if(this.hand[j].total_cards<0){
              this.hand=backup;
              return "error";
            }
            break;
          }
        }
      });
      if(cards.length !==0 ){
        this.action.cards = cards;
        this.action.action = action;
        this.has_new_action = true;
      }
      return "ok";
    }

  }


  class Card{
    constructor(value, total_cards, new_cards) {
      this.value = value;
      this.total_cards = total_cards || 0;
      this.new_cards = new_cards || 0;
    }
  }


//export
window.GamePlayer = Player;
})();
