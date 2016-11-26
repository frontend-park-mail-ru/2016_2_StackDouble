(function () {
  'use strict';
const Player = window.PlayerModel;

  class Rival extends Player{
    /**
     * Создаёт соперника
     * @param {boolean} his_turn - показывает чей ход
     * @param {number} total_cards - количество карт
     */
    constructor(){
      super();
      this.his_turn = false;
      this.total_cards = 0;
    }
  }

/**
* класс контейнер Rivals
*/
  class Rivals {
    constructor() {

    }

    update(rivals){
      this.rivals = rivals;
    }
  }


//export
window.GameRivals = Rivals;
})();
