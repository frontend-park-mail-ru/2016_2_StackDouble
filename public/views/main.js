(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const request = window.request;

	class MainView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('#js-login');
			this.hide();
			// TODO: дописать реализацию
			this.form = new Form({
				el: this._el,
				data: {
            title: 'Autorisation',
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
/*			document.querySelectorAll('div').forEach(function(item, i, arr) {
				debugger;
				if (item) {
					item.hidden = true;
				}
});*/
			this._el = document.querySelector('#js-login');
			this.show();
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
