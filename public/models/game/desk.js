(function () {
	'use strict';

	class Desk {
		/**
		 * Создаёт стол
		 * @param {number} deck - осталось карт
     * @param {time} timer - время
		 */
		constructor() {
      this.deck = 0;
      this.timer = 0;
		}

		/**
		 * обновляет поля 
		 * @param {number} deck - осталось карт
     * @param {time} timer - время
		 */
    update(data){
      this.deck = data.deck;
      this.timer = data.time;
    }

	}

	//export
	window.GameDesk = Desk;
})();
