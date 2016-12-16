(function () {
    'use strict';
    const Block = window.Block;

    class MainMenu extends Block {
        constructor(options = {data: {}}) {
            super('div');
            this.template = window.fest['mainmenu/mainmenu.tmpl'];
            this.data = options.data;
            this._el = options.el || document.createElement('div');
            this.render();
        }

        render() {
            this._el.innerHTML = this.template(this.data);
        }
    }
    /* export */
    window.MainMenu = MainMenu;
}());
