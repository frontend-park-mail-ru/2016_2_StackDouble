(function () {
	'use strict';
	
	let  id = 0;
	
	class Route {
		/**
		 * Создаёт новый Route - ассоциирует некоторую view с шаблоном пути
		 * @param {string} pathname - Шаблон пути
		 * @param {View} view - Класс конкретной View
		 * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
		 */
		constructor(pathname, view, options = {}){
			this.pathToRegex = window.pathToRegex;
			
			this.id = 'p' + id;
			id++;
			this.pathname = pathname;
			this.regex = this.pathToRegex(pathname);
			this.View = view;
			this.options = options;
		}
		
		/**
		 * Проверяет, соответствует ли переданный pathname текущему Route
		 * @param {string} pathname - Путь в приложении
		 * @returns {boolean} Результат проверки
		 */
		match(pathname){
			return !!this.regex(pathname);
		}
		
		/**
		 * Активирует текущий Route (переходит по нему)
		 * @param {string} pathname - Путь в приложении
		 * @param {Object} [state={}] - Объект state, который был передан в событие popstate для объекта window
		 */
		navigate(pathname, state = {}){
			const keys = this.regex(pathname);
			if (!this._view){
				const view = new this.View(this.options);
				view.init(this.options);
				view.setRouter(this.__router);
				this._view = view;
			}
			this._view.resume(Object.assign(state,keys));
		}
		
		/**
		 * Деактивирует текущий Route
		 */
		leave(){
			this._view && this._view.pause();
		}
		
		/**
		 * Устанавливает текущему Route инстанс роутера
		 * @param {Router} router - Инстанс роутера
		 */
		setRouter(router){
			this.__router = router;
		}
	}
	
	/* *export */
	window.Route = Route;
}());