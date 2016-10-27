(function () {
 'use strict';

 const View = window.View;

 class waitingRoomView extends View {
  constructor(options = {}) {
   super(options);
   this._el = document.querySelector('.js-game');
   this.hide();
  }

  resume(options = {}) {
   if (!options.username && !options.email) {
    return this.router.go('/');
   }

   // TODO: дописать реализацию

   this.show();
  }
 }


 // export
 window.waitingRoomView = waitingRoomView ;

})();