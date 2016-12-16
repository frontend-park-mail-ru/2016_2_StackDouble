(function () {
	'use strict';

  const Player = window.PlayerModel;

	class TopList {
		/**
		 * Создаёт массив страниц с игроками
		 * @param [{players:array, page:number},] list - имя пользователя
     * @param {number} pages
		 */
		constructor() {
      this.pages = 0;
      this.get_next();
		}

    get_next(){
      //доработать
      return  new Promise((resolve, reject) => {
        this.fetch(++this.pages).then(players => {
        this.list = players;
      });
				});
    }

		/**
		 * Получает список пользователей с сервера
		 * @returns {Promise}
		 */
		fetch(page) {
			return new Promise(function (resolve, reject) {
				const xhr = new XMLHttpRequest();

				xhr.open('GET', `/api/toplist/`+{page}, true);
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


	}

	//export
	window.TopListModel = TopList;
})();
