(function () {
	'use strict';

	class Desk {
		/**
		 * Создаёт стол
		 * @param {number} deck - осталось карт
     * @param {time} timer - время
		 */
		constructor(data) {
      this.deck = data.deck;
      this.timer = data.timer;
		}

		/**
		 * обновляет поля
		 * @param {number} deck - осталось карт
     * @param {time} timer - время
		 */
    update(data){
      this.deck = data.deck;
      this.timer = data.timer;
    }

	}

	//export
	window.GameDesk = Desk;
})();
