(function () {
	'use strict';
	
	const Router = window.Router;
	const gameView = window.gameView;
	const MainView = window.MainView;
	const registrationView = window.registrationView;
	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
		.addRoute('/game', gameView)
		.addRoute('/registration', registrationView)
		.addRoute('/', MainView)
		.start()
		.go('/');
}());