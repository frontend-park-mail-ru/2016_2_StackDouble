(function () {
	'use strict';

	/* import */
	const Button = window.Button;
	const Block = window.Block;

	class Form extends Block {

		/**
		 * Конструктор класса Form
		 */
		constructor(options = {data: {}}) {
			super('form');
			this._el=options.el || document.createElement('div');
			this.template = window.fest['form/form.tmpl'];
			this.data = options.data;
			this.render();
		}

		/**
		 * Обновляем HTML
		 */
		render() {
			this._updateHtml();
			this._installControls();
		}

		/**
		 * Обнуляем форму
		 */
		reset() {
			this._el.querySelector('form').reset();
		}

		/**
		 * Обновить html компонента
		 */
		_updateHtml() {
			this._el.innerHTML = this.template(this.data);
		}

		/**
		 * Вставить управляющие элементы в форму
		 */
		_installControls() {
			const { controls = [] } = this.data;

			controls.forEach((data) => {
				const control = new Button({ text: data.text, attrs: data.attrs});
				this._el.querySelector('.js-controls').appendChild(control._get());
			});
		}

		/**
		 * Взять данные формы
		 * @return {object}
		 */
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
