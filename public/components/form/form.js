(function () {
	'use strict';

	/* import */
	const Button = window.Button;
	const Block = window.Block;

	class Form extends Block{
		constructor(options = { data: {} }) {
			super('form');
			this._el=options.el || document.createElement('div');
			this.template = window.fest['form/form.tmpl'];
			this.data = options.data;
			this.render();
		}

		render() {
			this._updateHtml();
			this._installControls();
		}

		reset(){
			this._el.querySelector('form').reset();
		}

		_updateHtml() {
			this._el.innerHTML = this.template(this.data);
		}

		_installControls() {
			const { controls = [] } = this.data;

			controls.forEach((data) => {
				const control = new Button({ text: data.text, attrs: data.attrs});
				this._el.querySelector('.js-controls').appendChild(control._get());
			});
		}

		getFormData() {
			const form = this._el.querySelector('form');
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
