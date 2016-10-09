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
					title: 'Autorisation',
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
			this._el.appendChild(this.form.el);
		}
		
		init(options = {}) {
			// TODO: дописать реализацию
			this.form.on('submit', (event) => {
				event.preventDefault();
				this.router.go('/game');
				this._el.hidden = true;
			});
			this.form.on('reset', (event) => {
				event.preventDefault();
				this._el .hidden = true;
				this.router.go('/registration');
			});
		}
	}
	
	// export
	window.MainView = MainView;
	
})();