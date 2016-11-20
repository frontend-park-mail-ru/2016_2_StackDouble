(function () {
	'use strict';
	
	const View = window.View;
	const Form = window.Form;
	const request = window.request;

	class GameView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-game');
			this.hide();
		}
		
		resume(options = {}) {
			if (!options.username && !options.email) {
		//		return this.router.go('/');
			}
			
			// TODO: дописать реализацию
			
			this.show();
		}
	}
	
	
	// export
	window.GameView = GameView;
	
})();