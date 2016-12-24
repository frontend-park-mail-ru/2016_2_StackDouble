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

		init(){
						this.form.on('submit', (event) => {
								event.preventDefault();
								const formData = this.form.getFormData();
								const url = window.baseUrlApp + '/api/user';
								if (formData.password !== formData.lastpassword){
										alert('Пароли не совпадают');
								}else{
										const resultRequest = request(url , {login: formData.login, email: formData.email, password: formData.password});
										if (resultRequest.status === 200){
											console.log(formData);
												console.log(resultRequest.responseText);
												const response = JSON.parse(resultRequest.responseText);
												switch (response.code){
														case 0:
																alert('Регистрация прошла успешно!');
																window.UserProfile= new UserModel(response.response);
																localStorage.setItem("UserProfile", JSON.stringify(window.UserProfile));
																console.log("go to game");
																this.router.go('/MainMenu');
																break;
														case 1:
														case 2:
														case 3:
														case 4:
														case 5:
																alert("такой пользователь уже существует");
																console.log("go to registration");
																this.router.go('/registration');
																break;
														default:
																alert('Неизвестная ошибка!');
												}
										}else{
												alert('Неизвестная ошибка!');
										}
								}
			   });
				 this._el = document.querySelector('#js-registration');
					this.show();
		}

		resume(options = {}) {
			this._el = document.querySelector('#js-registration');
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
