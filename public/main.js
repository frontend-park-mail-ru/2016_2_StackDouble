(function () {
	'use strict';
	
	const Router = window.Router;
	const gameView = window.gameView;
	const MainView = window.MainView;
	const waitingRoomView =window.waitingRoomView;
	const registrationView = window.registrationView;
    const topListView = window.topListView;
	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
		.addRoute('/waitingRoom', waitingRoomView)
        .addRoute('/topList', topListView)
		.addRoute('/game', gameView)
		.addRoute('/registration', registrationView)
		.addRoute('/', MainView)
		.start();
}());