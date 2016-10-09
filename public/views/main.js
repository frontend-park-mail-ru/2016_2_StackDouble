(function () {
	'use strict';
	
	const View = window.View;
	const Form = window.Form;
	
	class MainView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-login');
			this.hide();
			// TODO: дописать реализацию
			this.form = new Form({
				el: document.createElement('div'),
				data: {
					title: 'Authorization',
					fields: [{
							name: 'login',
							type: 'text',
							placeholder: 'Введите login',
							required: true,
						}, {
							name: 'password',
							type: 'password',
							placeholder: 'Введите пароль',
							required: true,
						}
					],
					controls: [
						{
							text: 'Войти',
							attrs: {
								type: 'submit',
								name: 'signIn',
							}
						}, {
							text: 'Регистрация',
							attrs: {
								type: 'reset',
								name: 'registration',
							}
						},
					]
				},
			});
			this._el.appendChild(this.form._el);
		}
		
		init(options = {}) {
			// TODO: дописать реализацию
			console.log("init mainView");
			this.form.on('submit', (event) => {
				event.preventDefault();
				console.log("go to game");
				this.router.go('/game');
			});
			this.form.on('reset', (event) => {
				event.preventDefault();
				console.log("go to registration");
				this.router.go('/registration');
			});
		}
	}
	
	// export
	window.MainView = MainView;
	
})();