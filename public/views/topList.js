(function () {
	'use strict';

	const View = window.View;
	const UserScoreTop = window.UserScoreTop;

	class TopListView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-topList');
			this.hide();

		}
		resume(options = {}) {
			if (!options.username && !options.email) {
				//		return this.router.go('/');
			}

			// TODO: дописать реализацию

			this.show();
		}
	}
	// export
	window.TopListView = TopListView;
	
})();

/*
 this.form = new UserScoreTop({
 el: this._el,
 data: {
 title: 'TopList',
 action: '/',
 method: 'GET',

 piece: 100,
 login: "Nick Name",
 score: 100000
 }
 })
 */