(function () {
    'use strict';

    const View = window.View;

    class WaitingRoomView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-waitingroom');
            this.hide();
        }

        resume(options = {}) {
            if (!options.username && !options.email) {
                //		return this.router.go('/');
            }
            window.location="https://pr.to/BIJ91I/";
            // TODO: дописать реализацию

            this.show();
        }
    }
    // export
    window.WaitingRoomView = WaitingRoomView ;

})();