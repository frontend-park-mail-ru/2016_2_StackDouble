(function () {
	'use strict';
	
	const View = window.View;
	const Form = window.Form;
	
	class MainView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-login');
			this.hide();
			
			const form = new Form({
				el: document.createElement('div'),
				data: {
					title: 'Autorisation',
					fields: [
						{
							name: 'email',
							type: 'text',
							placeholder: 'Введите e-mail',
							required: true,
						},
						{
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
						},
						{
							text: 'Регистрация',
							attrs: {
								type: 'reset',
								name: 'registration',
							}
						},
					]
				},
			});
			
		}
		
		init(options = {}) {
			// TODO: дописать реализацию
		}
	}
	
	
	// export
	window.MainView = MainView;
	
})();