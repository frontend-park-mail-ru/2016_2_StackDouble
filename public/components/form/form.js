(function () {
	'use strict';

	/* import */
	const Button = window.Button;

	class Form {

		constructor(options = { data: {} }) {
			this.data = options.data;
			this.el = options.el;

			this.render();
		}

		render() {
			this._updateHtml();
			this._installControls();
		}

		_getFields() {
			const { fields = [] } = this.data;
			return fields.map((field) => {
				return `<input ${field.required ? 'required' : ''} placeholder="${field.placeholder}" type="${field.type}" name="${field.name}">`;
			}).join(' ');
		}

		_updateHtml() {
			this.el.innerHTML = `
				<form action="/" method="POST">
					<h1>${this.data.title}</h1>
					<div>${this._getFields()}</div>
					<div class="js-controls"></div>
				<form>			`;
		}

		_installControls() {
			const { controls = [] } = this.data;

			controls.forEach((data) => {
				const control = new Button({ text: data.text, attrs: data.attrs }).render();
				this.el.querySelector('.js-controls').appendChild(control.el);
			});
		}

        on(type, callback) {
			this.el.addEventListener(type, callback);
		}

		getFormData() {
			const form = this.el.querySelector('form');
			const elements = form.elements;
			const fields = {};

			Object.keys(elements).forEach((element) => {
				const name = elements[element].name;
				const value = elements[element].value;

				if (!name) {
					return;
				}

				fields[name] = value;
			});

			return fields;
		}

	}

	/* export */
	window.Form = Form;
}());
