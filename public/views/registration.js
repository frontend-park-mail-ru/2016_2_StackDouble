(function () {
	'use strict';
	
	const View = window.View;
	const Form = window.Form;
	
	class registrationView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-registration');
			this.hide();
		}
		
		resume(options = {}) {
			if (!options.username && !options.email) {
				return this.router.go('/');
			}
			
			// TODO: дописать реализацию
			
			this.show();
		}
	}
	
	
	// export
	window.registrationView = registrationView;
	
})();