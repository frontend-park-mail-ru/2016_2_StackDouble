(function () {
    'use strict';
    const Block = window.Block;

    class UserScoreTop extends Block {

        /**
         * Конструктор класса Form
         */
        constructor(options = {data: {}}) {
            super('form');
            this.template = window.fest['userscore/userscore.tmpl'];
            this.data = options.data;
            this._el = options.el;
            this.render();
        }

        render() {
            this._el.innerHTML = this.template(this.data);
        }
    }
    /* export */
    window.UserScoreTop = UserScoreTop;
}());