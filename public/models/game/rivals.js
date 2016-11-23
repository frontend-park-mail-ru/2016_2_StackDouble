(function () {
  'use strict';
const Player = window.PlayerModel;

  class Rival extends Player{
    constructor(){
      super();
      this.his_turn = false;
      this.total_cards = 0;
    }
  }

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
