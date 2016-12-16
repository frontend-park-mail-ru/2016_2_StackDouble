(function () {
	'use strict';

	const Player = window.PlayerModel;

	/**
	 * Создаёт нового пользователя
	 */
	class UserProfile extends Player {
		constructor(data = {}) {
      super(data);
		}

		singin(data){

		}

		/**
		 * Регистрирует пользователя на сервере
		 * @returns {Promise}
		 */
		signup(data) {
			return new Promise(function (resolve, reject) {
				const xhr = new XMLHttpRequest();

				const json = JSON.stringify({
					login: data.login,
					email: data.email,
					password: data.password
				});

				xhr.open('POST', window.baseUrlApp + '/api/user', true);
				xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

				xhr.onreadystatechange = function () {
					if (this.readyState !== 4) return;
					if (this.status !== 201) {
						return reject(this.statusText);
					}
					let ans = JSON.parse(json);
					this.set_player(ans);
					resolve(JSON.parse(json));
				};

				xhr.onerror = function () {
					reject();
				};

				xhr.send(json);
			}.bind(this));
		}

	}

	//export
	window.UserModel = UserProfile;
})();
