(function () {
	'use strict';

	class Desk {
		/**
		 * Создаёт нового пользователя
		 * @param {number} deck - осталось карт
     * @param {time} timer - время
		 */
		constructor() {
      this.deck = 0;
      this.timer = 0;
		}

    update(data){
      this.deck = data.deck;
      this.timer = data.time;
    }

	}

	//export
	window.GameDesk = Desk;
})();
