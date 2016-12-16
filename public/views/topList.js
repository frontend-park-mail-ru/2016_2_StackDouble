(function () {
	'use strict';

	const View = window.View;
	const TopList = window.TopList;

	class TopListView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('#js-topList');
			this.hide();
			let data = new Array(40);
			for(let i=0; i<data.length; i++){
				data[i]={
					nick: "player_" + (i+1),
					id: i,
					avatar: "http://lorempixel.com/40/40",
					score: 367853-3447*i,
					position: i+1,
				};
			};

			this.toplist = new TopList({
				el:this._el,
				data:data,
			});
		}
		
		pause(options = {}) {
			this._el = document.querySelector('#js-topList');
			this.hide();
		}

		init(options = {}) {
			this.setAttrs(options.attrs);
			console.log("init toplist");
			this.toplist._el.querySelector('#btn_back').addEventListener('click', (event)=> {
				event.preventDefault();
				console.log("back from toplist");
				this.router.back();
			});
		}
	}
	// export
	window.TopListView = TopListView;

})();
