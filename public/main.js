(function () {
	'use strict';

	const Router = window.Router;
	const GameView = window.GameView;
	const MainView = window.MainView;
	const MainMenuView =window.MainMenuView;
	const RegistrationView = window.RegistrationView;
  const TopListView = window.TopListView;
	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
    .addRoute('/toplist', TopListView)
		.addRoute('/game', GameView)
		.addRoute('/mainmenu', MainMenuView)
		.addRoute('/registration', RegistrationView)
		.addRoute('/', MainView)
		.start();
}());
