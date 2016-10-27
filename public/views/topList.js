(function () {
	'use strict';
	
	const View = window.View;
	
	class topListView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-game');
			this.hide();
		}
		
		resume(options = {}) {
			
			// TODO: дописать реализацию
			
			this.show();
		}
	}

    window.onscroll = function(e) {
      //  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      //  document.getElementById('showScroll').innerHTML = scrolled + 'px';
        console.log(e);
    };

	// export
	window.topListView = topListView;
	
})();