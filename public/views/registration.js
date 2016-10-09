(function () {
	'use strict';
	
	const View = window.View;
	const Form = window.Form;
	
	class registrationView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-registration');
			this.hide();
			
			// TODO: дописать реализацию
			this.form = new Form({
				el: document.createElement('div'),
				data: {
					title: 'Регистрация нового пользователя:',
					fields: [{
						name: 'login',
						type: 'text',
						placeholder: 'Введите login',
						required: true,
					}, {
						name: 'email',
						type: 'text',
						placeholder: 'Введите e-mail',
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
						},
					}, ],
				},
			});
			this._el.appendChild(this.form.el); //-???
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