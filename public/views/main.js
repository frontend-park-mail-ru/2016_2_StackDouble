(function () {
	'use strict';
	
	const View = window.View;
	const Form = window.Form;
	const request = window.request;
	
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
				const formData = this.form.getFormData();
				const url = window.baseUrlApp + '/api/session';
				const resultRequest = request(url, formData);
				if (resultRequest.status === 200){
					console.log("go to game");
					this.router.go('/game');
				}
				alert('Неправильный логин/пароль');
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