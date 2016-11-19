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
			this.game = new Game({
        el:this._el,
				data: {
            rivals: [
                {
                    nick: 'Stalin',
										avatar: "./assets/avatar.svg",
										has_star: true,
                },
								{
										nick: 'Beria',
										avatar: "./assets/avatar.svg",
																				has_star: false,
								},
								{
										nick: 'Hitler',
										avatar: "./assets/avatar.svg",
																				has_star: true,
								},
								{
										nick: 'Goebbels',
										avatar: "./assets/avatar.svg",
										has_star: false,
								},
            ],
						deck: 112,
						types: [
							{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},
							{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},{image:"./assets/card.svg",},
							{image:"./assets/card.svg",},{image:"./assets/card.svg",},
						],
						capacity_of_drawer: 15,
        },
      });

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
