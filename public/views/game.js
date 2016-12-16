(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const request = window.request;
	const Game = window.Game;

	class GameView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('#js-game');
			this.hide();
			}

			init(){
				if(!window.gamesession){
					return;
				}
				//TODO: переделать
				if(!this.game){
				this._el = document.querySelector('#js-game');
				this.game = new Game({
					el:this._el,
					data: window.gamesession});
				}
				//TODO: решить где хранить это
				window.drawer = [];

				let tmp = document.querySelectorAll('.player-deck__card');
				tmp.forEach(function(item, i, arr){
					item.addEventListener("click", this.player_deck_card_onclick);
				}.bind(this));


				this.tmp = document.querySelectorAll('#btn_exchange');
				this.tmp.forEach(function(tmp){
					tmp.addEventListener("click", (event)=>{
						if(window.gamesession.player.do_action(g_action_name__exchange, window.drawer)=="ok"){

						}else{
							event.target.classList.add("player-desk__btns__game-btn_error");
							setTimeout(function(){
								event.target.classList.remove("player-desk__btns__game-btn_error");
							}, 3000);
						}

						document.querySelector('#btn_reset').click();
					});
				}.bind(this));

				this.tmp = document.querySelectorAll('#btn_combo');
				this.tmp.forEach(function(tmp){
					tmp.addEventListener("click", (event)=>{
						if(window.gamesession.player.do_action(g_action_name__combo, window.drawer)=="ok"){

						}else{
							event.target.classList.add("player-desk__btns__game-btn_error");
							setTimeout(function(){
								event.target.classList.remove("player-desk__btns__game-btn_error");
							}, 3000);
						}
						document.querySelector('#btn_reset').click();
					});
				}.bind(this));

				this.tmp = document.querySelectorAll('#btn_reset');
				this.tmp.forEach(function(tmp){
					tmp.addEventListener("click", this.btn_reset_onclick.bind(this));
				}.bind(this));

				window.gamesession.desk.onchange = this.update_desk;
				window.gamesession.player.onchange = this.update_player_desk;
				window.gamesession.rivals.onchange = this.update_rivals;
				window.gamesession.onendgame = function(){
					//TODO: написать завершение игры
					document.querySelector('.end_game').innerText = "YOU DIED!";
					document.querySelector('.end_game').hidden = false;
					clearInterval(this.timerId);
				}

				this.update_desk();
				this.update_player_desk();
				this.update_rivals();
			}

			/**
	    *
	    * @callback
	    */
			btn_reset_onclick(event){
				window.drawer = [];
				let tmp = document.querySelector('.player-desk-drawer');
				while (tmp.firstChild) {
					tmp.removeChild(tmp.firstChild);
				}
				this.update_player_desk();
				tmp = document.querySelectorAll('.player-desk__btns > button');
				tmp.forEach((b)=>{b.disabled = true;});
				tmp = document.querySelectorAll('.player-desk__btns-horizontal > button');
				tmp.forEach((b)=>{b.disabled = true;});

				tmp = document.querySelectorAll('.player-desk__btns__game-btn__num');
				tmp.forEach((b)=>{b.innerText = window.gamesession.player.new_cards});
			}

			/**
	    *
	    * @callback
	    */
			player_deck_card_onclick(event){
				let tmp, card = window.gamesession.player.hand[event.target.id];
				//TODO: переделать
				if(event.target.querySelector('span').innerText>0 && window.capacity_of_drawer > window.drawer.length && window.gamesession.player.his_turn){
					window.drawer.push(card);
					//TODO: переделать
					event.target.querySelector('span').innerText--;
					tmp = document.querySelector('.player-desk-drawer');
					card = new Block('div', {attrs:{class: "player-desk-drawer__card" + " player-desk-drawer__card_type-" +event.target.id, id:"drawer-card_"+window.drawer.length}});
					tmp.appendChild(card._el);
				}

				tmp = document.querySelectorAll('#btn_reset');
				tmp.forEach((b)=>{
					if(document.querySelector('.player-desk-drawer').childElementCount>0){
						document.querySelectorAll('#btn_reset').forEach((b)=>{
							b.disabled=false;
						});
					}else {
						document.querySelectorAll('#btn_reset').forEach((b)=>{
							b.disabled=true;
						});
					}
				});

				tmp = document.querySelectorAll('.player-desk__btns__game-btn__num');
				tmp.forEach((b)=>{
					b.innerText = window.gamesession.player.new_cards - document.querySelector('.player-desk-drawer').childElementCount;
					if(b.innerText==0){
						document.querySelectorAll('#btn_exchange').forEach((b)=>{
							b.disabled=false;
						});
					}else {
						document.querySelectorAll('#btn_exchange').forEach((b)=>{
							b.disabled=true;
						});
					}
				});

				tmp = document.querySelectorAll('#btn_combo');
				tmp.forEach((b)=>{
					if(document.querySelector('.player-desk-drawer').childElementCount>=g_min_combo){
						document.querySelectorAll('#btn_combo').forEach((b)=>{
							b.disabled=false;
						});
					}else {
						document.querySelectorAll('#btn_combo').forEach((b)=>{
							b.disabled=true;
						});
					}
				});
			}

			/**
	    *
	    * @callback
	    */
			update_player_desk(){
				let tmp = document.querySelectorAll('.player-deck__card');
				for(let j=0; j<tmp.length; j++){
					let t = tmp[j].querySelector(".player-deck__card__num-cards");
					t.innerText = window.gamesession.player.hand[tmp[j].id].total_cards;
					if( window.gamesession.player.hand[tmp[j].id].total_cards===0){
						t.classList.add("player-deck__card__num-cards_zero");
					}else{
						t.classList.remove("player-deck__card__num-cards_zero");
					}

					t = tmp[j].querySelector(".player-deck__card__num-new-cards");
					t.innerText = window.gamesession.player.hand[tmp[j].id].new_cards;
					if( window.gamesession.player.hand[tmp[j].id].new_cards!==0){
						t.hidden=false;
					}else{
						t.hidden=true;
					}
					t = document.querySelectorAll('.player-desk__btns__game-btn__num');
					t.forEach((b)=>{b.innerText = window.gamesession.player.new_cards});
				}

				document.querySelector('#btn_reset').click();
				// if while test test
				if(document.querySelector("#score")){
					document.querySelector("#score").innerText = window.UserProfile.score;
				}
			}

			/**
	    *
	    * @callback
	    */
			update_rivals(){
				let tmp = document.querySelectorAll('.rival-info__card__num-cards');
				for(let j=0; j<tmp.length; j++){
					tmp[j].innerText = window.gamesession.rivals.list[j].total_cards;
				}
				tmp = document.querySelectorAll('.rival-info__score');
				for(let j=0; j<tmp.length; j++){
					tmp[j].innerText = window.gamesession.rivals.list[j].score;
				}

				tmp = document.querySelectorAll('.rival-info__card');
				for(let j=0; j<tmp.length; j++){
					if(window.gamesession.rivals.list[j].out_of_game){
						tmp[j].classList.add("rival-info__card_out-of-game");
					}
				}

				tmp = document.querySelectorAll('.rival-info');
				for(let j=0; j<tmp.length; j++){
					if(window.gamesession.rivals.list[j].his_turn){
						tmp[j].classList.add("rival-info_his-turn");
					}else{
						tmp[j].classList.remove("rival-info_his-turn");
					}
				}
			}

			/**
	    *
	    * @callback
	    */
			update_desk(){
				clearInterval(this.timerId);
				this.now = null;
				document.querySelector('.timer').classList.remove("timer_red");
				document.querySelector('.timer').classList.remove("timer_red-dead");
				document.querySelector('.timer').hidden = false;
				let tmp = document.querySelector('.deck__num-cards');
				tmp.innerText=window.gamesession.desk.deck;
				this.timerId = setInterval(function(){
					this.now =  this.now || Date.now();
					let dt =(Date.now() - this.now)/1000;
					let timer;
					if(!window.gamesession.desk){clearInterval(this.timerId); timer=0; return;}
					if(window.gamesession.desk.timer - dt>0){
						timer = window.gamesession.desk.timer-dt;
					} else{
						clearInterval(this.timerId);
						timer=0;
						this.now = null;
						document.querySelector('.timer').classList.remove("timer_red");
						document.querySelector('.timer').hidden = true;
					}
					if(timer <=10){
						document.querySelector('.timer').classList.add("timer_red");
					}
					if(timer <=3){
						document.querySelector('.timer').classList.add("timer_red-dead");
					}
					tmp = document.querySelector('.timer__time');
					tmp.innerText = Math.round(timer);
				}.bind(this), 1000);
			}

			pause(options = {}) {
				this._el = document.querySelector('#js-game');
				this.hide();
			}

			resume(options = {}) {
				if (!options.username && !options.email) {
					//		return this.router.go('/');
				}

				if (!window.gamesession || !localStorage.getItem('UserProfile')) {
					return this.router.go('/');
				}

				this.show();

				//for test
				this._el = document.querySelector('#js-topmenu');
				this.show();

				// TODO: дописать реализацию
this.init();
			}
		}


		// export
		window.GameView = GameView;

	})();
