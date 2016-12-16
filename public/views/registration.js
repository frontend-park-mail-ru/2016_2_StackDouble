(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const request = window.request;
  const UserModel = window.UserModel;

	class RegistrationView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('#js-registration');
			this.hide();

			// TODO: дописать реализацию
			this.form = new Form({
				el: this._el,
				data: {
					title: 'Регистрация нового пользователя:',
					method: "POST",
					fields: [{
						name: 'login',
						type: 'text',
						placeholder: 'Введите login',
						required: true,
					}, {
						name: 'email',
						type: 'email',
						placeholder: 'Введите email',
						required: true,
					}, {
						name: 'password',
						type: 'password',
						placeholder: 'Введите пароль',
						required: true,
					}, {

						name: 'lastpassword',
						type: 'password',
						placeholder: 'Повторите пароль',
						required: true,

					}, ],
					controls: [{
						text: 'Зарегистрироваться',
						attrs: {
							type: 'submit',
							class: "btn btn-success btn-margin",
						},
					}, ],
				},
			});
			//this._el.appendChild(this.form._el);
		}

		resume(options = {}) {

			// TODO: дописать реализацию
			this.form.on('submit', (event) => {
				event.preventDefault();
				const formData = this.form.getFormData();
				const url = window.baseUrlApp + '/api/user';
				console.log(formData);
				if (request(url, {login:formData.login},'GET').status !== 200) {
					if (formData.password === formData.lastpassword) {
						const resultRequest = request(url , formData);
						if (resultRequest.status === 200){
							alert('Регистрация прошла успешно!');
							let u = new UserModel({login: formData.login, avatar:"http://lorempixel.com/40/40", score: 0});
							localStorage.setItem("UserProfile", JSON.stringify(u));
							console.log("go to game");
							this.router.go('/MainMenu');
						}else {
							alert('Упс что-то пошло не так');
							console.log("go to registration");
							this.router.go('/registration');
						}
					}else {
						alert('Пароли не совпадают');
					}
				}else {
					alert('Такой пользователь уже существует!');
				}

			});
			this.show();
		}

		pause(options = {}) {
			this._el = document.querySelector('#js-registration');
			this.hide();
		}
	}

	// export
	window.RegistrationView = RegistrationView;

})();
