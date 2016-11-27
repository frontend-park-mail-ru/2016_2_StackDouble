(function () {
  'use strict';
const Player = window.PlayerModel;

  class Rival extends Player{
    /**
     * Создаёт соперника
     * @param {boolean} his_turn - показывает чей ход
     * @param {number} total_cards - количество карт
     */
    constructor(data){
      super(data);
      this.has_star = data.has_star;
      this.his_turn = data.his_turn;
      this.total_cards = data.total_cards;
    }

    update(data){
      this.his_turn = data.his_turn;
      this.total_cards = data.total_cards;
    }
  }

/**
* класс контейнер Rivals
*/
  class Rivals {
    constructor(data) {
      this.list = [];
      data.forEach(function(item, i, data){
        this.list.push(new Rival(item));
      }.bind(this));
    }

    update(data){
      data.forEach(function(item, i, data){
        this.list[i].update(item);
      }.bind(this));
    }

    get function(){
      return this.list;
    }
  }


//export
window.GameRivals = Rivals;
})();
