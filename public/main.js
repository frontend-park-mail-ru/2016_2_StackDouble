(function () {
	'use strict';

	if (typeof window === 'object') {
		/* * import */
		let Button = window.Button;
		const Chat = window.Chat;
		const Form = window.Form;
		
		const loginPage = document.querySelector('.js-login');
		const chatPage = document.querySelector('.js-chat');
		
		const form = new Form({
			el: document.createElement('div'),
			data: {
				title: 'Login',
				fields: [
					{
						name: 'user',
						type: 'text'
					},
					{
						name: 'email',
						type: 'email'
					}
				],
				controls: [
					{
						text: 'Войти',
						attrs: {
							type: 'submit'
						}
					}
				]
			}
		});
		
		const chat = new Chat({
			el: document.createElement('div'),
		});
		
		form.on('submit', (event) => {
			event.preventDefault();
			
			const formData = form.getFormData();
			technolibs.request('/api/login', formData);

			chat.set({
				username: formData.user,
				email: formData.email
			})
			.render();
			
			chat.subscribe();
			
			loginPage.hidden = true;
			chatPage.hidden = false;
		});

		loginPage.appendChild(form.el);
		chatPage.appendChild(chat.el);

		loginPage.hidden = false;
	}
}());
