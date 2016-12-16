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
			this.avatar = data.avatar || "./assets/avatar.svg";
      this.score = data.score || 0;
		}

		set_player(data){
			this.username = data.login;
			this.avatar = data.avatar;
			this.score = data.score;
		}

		/**
		 * Получает список пользователей с сервера
		 * @returns {Promise}
		 */
		static fetchAll(amount) {
			return new Promise(function (resolve, reject) {
				const xhr = new XMLHttpRequest();

				xhr.open('GET', `/api/users`, true);
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

				xhr.onreadystatechange = function () {
					if (this.readyState !== 4) return;
					if (this.status !== 200) {
						return reject(this.statusText);
					}
					resolve(JSON.parse(this.responseText));
				};

				xhr.send();
			});
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
