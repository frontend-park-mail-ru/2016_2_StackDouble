(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const request = window.request;
	const UserModel = window.UserModel;

	class MainView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('#js-login');
			this.hide();
			// TODO: дописать реализацию
			this.form = new Form({
				el: this._el,
				data: {
					title: 'Authorization',
					action: '/',
					method: 'POST',
					fields: [
						{

							tabindex: '1',
							name: 'login',
							type: 'text',
							placeholder: 'Введите e-mail',
							required: true,
						},
						{
							tabindex: '2',
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
								class: "btn btn-success btn-margin",
							}
						},
						{
							text: 'Регистрация',
							attrs: {
								type: 'reset',
								name: 'registration',
								class: "btn btn-success btn-margin",
							}
						},
					]
				},
			});
			//this._el.appendChild(this.form._el);
		}

		pause(options = {}) {
			this._el = document.querySelector('#js-login');
			this.hide();
		}

		resume(options = {}) {
			this._el = document.querySelector('#js-login');
			this.show();

			//TODO: разобраться с куками и переделать

			let user= localStorage.getItem('UserProfile');
			if(user){
				user =JSON.parse(localStorage.getItem('UserProfile'));
				window.UserProfile = new UserModel(user);
				console.log("go MainMenu");
				this.router.go('/MainMenu');
			}
		}

		init(options = {}) {

			// TODO: дописать реализацию
			console.log("init mainView");
			this.form.on('submit', (event) => {
				event.preventDefault();
				console.log("go MainMenu");
				//TODO: переделать в
				/*
				var user = new UserModel();
				user.singin(this.form.getFormData());
				localStorage.setItem("UserProfile", user);
				*/

				const formData = this.form.getFormData();
				const url = window.baseUrlApp + '/api/session';
				const resultRequest = request(url, formData);
				if (resultRequest.status === 200){
					console.log("go MainMenu");
					this.router.go('/MainMenu');
				}else {
					alert('Неправильный логин/пароль');
				}
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
