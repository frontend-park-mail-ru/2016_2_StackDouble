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
			this.list=[];
		}

		/**
		* возвращает промис на массив с игроками
		* @return {Promise} pages
		*/
		get_next(){
			//доработать
			return  new Promise((resolve, reject) => {
				let last_id = this.list.length-1>0 ? this.list[this.list.length-1].id : 0;
				this.fetch(last_id).then(players => {
					players.forEach(function(item, i, arr){
						item.position = this.list.length+i+1;
						item.avatar ="../assets/avatar.svg";
					}.bind(this));

					 this.list =this.list.concat(players);
					 resolve(players);
				});
			});
		}

		/**
		* Получает список пользователей с сервера
		* @returns {Promise}
		*/
		fetch(page = 0) {
			return new Promise(function (resolve, reject) {
				const url = window.baseUrlApp + '/api/top';
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url, false);
				xhr.setRequestHeader('Content-Type', 'application/json');

				xhr.onreadystatechange = function () {
					if (this.readyState !== 4) return;
					if (this.status !== 200) {
						return reject(this.statusText);
					}
					//вернуть только список игроков
					resolve(JSON.parse(this.responseText).response);
				};

				xhr.send();
			});
		}
	}

	//export
	window.TopListModel = TopList;
})();
