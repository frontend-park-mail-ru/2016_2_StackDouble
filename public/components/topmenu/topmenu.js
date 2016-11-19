(function () {
    'use strict';
    const Block = window.Block;

    class TopMenu extends Block {
        constructor(options = {data: {}}) {
            super('div');
            this.template = window.fest['topmenu/topmenu.tmpl'];
            this.data = options.data;
            this._el = options.el || document.createElement('div');
            this.render();
        }

        render() {
            this._el.innerHTML = this.template(this.data);
        }
    }
    /* export */
    window.TopMenu = TopMenu;
}());
