(function () {
	'use strict';

	class Player {
		/**
		 * Создаёт нового пользователя
		 * @param {string} login - имя пользователя
     * @param {string} avatar - аватар пользователя
		 * @param {number} score - очки пользователя
		 */
		constructor(data = {}) {
			this.login = data.login;
			this.avatar = data.avatar || "http://lorempixel.com/40/40";
      this.score = data.score || 0;
		}

		set_player(data){
			this.username = data.login;
			this.avatar = data.avatar;
			this.score = data.score;
		}


		/**
		 * Возвращает характеристики пользователя в виде plain объекта
		 * @returns {{username: (string|*), email: (string|*)}} - данные о пользователе
		 */
		get json() {
			return {
				username: this.login,
        avatar: this.avatar,
				email: this.email
			};
		}
	}

	//export
	window.PlayerModel = Player;
})();
