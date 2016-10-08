(function () {
	'use strict';

	/* import */
	const Block = window.Block;
	const Button = window.Button;

	class Form extends Block {

		constructor(options = { data: {} }) {
			super('form', {
				attrs: {
					class: 'form',
					action: options.action,
					method: options.method
				}});
			this.data = options.data;
			this.render();
		}



		render() {
			this._updateHtml();
			this._installControls();
		}

		_updateHtml() {
			this.append(new Block('h1'));
			this._el.querySelector('h1').innerText = this.data.title;

			Object.keys(this.data.fields).forEach((field) => {
				let atr = {};
				atr.attrs=this.data.fields[field]
				this.append(new Block('input', atr));
			});

			this.append(new Block('div', {
								attrs: {
									class: 'js-controls'
								}}));
		}

		_installControls() {
			const { controls = [] } = this.data;

			controls.forEach((data) => {
				const control = new Button({ text: data.text, attrs: data.attrs }).render();
				this._el.querySelector('.js-controls').appendChild(control.el);
			});
		}

        on(type, callback) {
		this._el.addEventListener(type, callback);
		}

		getFormData() {
			const elements = this._el;
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


	class SinginForm extends Form {
		constructor(options){
			super(options);

		}


//TODO работа с сервером
		onSingin(){
				return this.getFormData();
		}

	}

	/* export */
	window.Form = Form;
	window.SinginForm = SinginForm;
}());
