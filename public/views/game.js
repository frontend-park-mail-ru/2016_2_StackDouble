(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const request = window.request;
	const Game = window.Game;

	class GameView extends View {
		constructor(options = {}) {
			//for test
			var user = new window.UserModel({login: 'MeMyself&I',
									avatar: "./assets/avatar.svg",});
			localStorage.setItem("UserProfile", JSON.stringify(user));
			window.gamesession = new GameWorker(JSON.parse(localStorage.getItem('UserProfile')));


			super(options);
			this._el = document.querySelector('#js-game');
			this.hide();
			this.game = new Game({
				el:this._el,
				data: window.gamesession});
			}

			init(){
				//TODO: решить где хранить это
				window.drawer = [];

				var tmp = document.querySelectorAll('.player-deck__card');
				tmp.forEach((item, i, arr)=>{
					item.addEventListener("click", (event)=>{
						var tmp = document.querySelectorAll('.player-desk__btns > button');
						tmp.forEach((b)=>{b.disabled = false;});
						var card = window.gamesession.player.get_card(event.target.id);
						//TODO: переделать
						if(event.target.querySelector('span').innerText>0 && window.capacity_of_drawer > window.drawer.length){
							window.drawer.push(card);
							//TODO: переделать
							event.target.querySelector('span').innerText--;
							tmp = document.querySelector('.player-desk-drawer');
							card = new Block('div', {attrs:{class: "player-desk-drawer__card" + " player-desk-drawer__card_type-" +event.target.id, id:"drawer-card_"+window.drawer.length}});
							tmp.appendChild(card._el);
						}
					});
				});

				this.tmp = document.querySelector('#btn_exchange');
				this.tmp.addEventListener("click", (event)=>{
					debugger;
					if(window.gamesession.player.do_action("exchange", window.drawer)=="ok"){
						this.update_player_desk();
					}

				});

				this.tmp = document.querySelector('#btn_combo');
				this.tmp.addEventListener("click", (event)=>{
					if(window.gamesession.player.do_action("combo", window.drawer)=="ok"){
						this.update_player_desk();
					}
				});

				this.tmp = document.querySelector('#btn_reset');
				this.tmp.addEventListener("click", (event)=>{
					window.drawer = [];
					var tmp = document.querySelector('.player-desk-drawer');
					while (tmp.firstChild) {
						tmp.removeChild(tmp.firstChild);
					}
					this.update_player_desk();
					var tmp = document.querySelectorAll('.player-desk__btns > button');
					tmp.forEach((b)=>{b.disabled = true;});
				});
//TODO: доработать
				 this.timerId = setInterval(function(){this.update_desk();}.bind(this), 1000);
			}

			update_player_desk(){
				var tmp = document.querySelectorAll('.player-deck__card');
				for(var j=0; j<tmp.length; j++){
					tmp[j].querySelector(".player-deck__card__num-cards").innerText = window.gamesession.player.hand[j].total_cards;
				}
			}

			update_rivals(){
				var tmp = document.querySelectorAll('.rival-info__card__num-cards');
				for(var j=0; j<tmp.length; j++){
					tmp[j].innerText = window.gamesession.rivals.list[j].total_cards;
				}
			}

			update_desk(){
				this.now =  this.now || Date.now();
				let dt =(Date.now() - this.now)/1000;
				let timer;
				if(window.gamesession.desk.timer - dt>0){
				 timer = window.gamesession.desk.timer-dt;
			} else{
				clearInterval(this.timerId);
				timer=0;
			}
				var tmp = document.querySelector('.timer__time');
				tmp.innerText = Math.round(timer);

			}

			pause(options = {}) {
				this._el = document.querySelector('#js-game');
				this.hide();
			}

			resume(options = {}) {
				if (!options.username && !options.email) {
					//		return this.router.go('/');
				}
				this.show();


				//for test
				this._el = document.querySelector('#js-topmenu');
				this.show();

				// TODO: дописать реализацию

			}
		}


		// export
		window.GameView = GameView;

	})();
