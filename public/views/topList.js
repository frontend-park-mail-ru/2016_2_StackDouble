(function () {
	'use strict';

	const View = window.View;
	const TopList = window.TopList;

	class TopListView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('#js-topList');
			this.hide();
			this.toplistdata = new TopListModel();
			this.toplist = new TopList({
				el:this._el,
			});
		}

		update_list(){
			this.toplistdata.get_next().then(function(data){
				this._el = document.querySelector('.list-group');
				this.template = window.fest['toplist/toplistitem.tmpl'];
				this._el.innerHTML+=this.template(data);
			}.bind(this));
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
			window.onscroll=function(){
				/*let scrollHeight = Math.max(
					document.body.scrollHeight, document.documentElement.scrollHeight,
					document.body.offsetHeight, document.documentElement.offsetHeight,
					document.body.clientHeight, document.documentElement.clientHeight
				);*/
				if(document.body.scrollHeight-window.scrollY<1000){
					this.update_list();
				}
			}.bind(this);
			this.update_list();
		}
	}
	// export
	window.TopListView = TopListView;

})();
