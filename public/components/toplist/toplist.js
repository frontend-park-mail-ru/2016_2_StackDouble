(function () {
    'use strict';
    const Block = window.Block;

    class TopList extends Block {
        constructor(options = {data: {}}) {
            super('div');
            this.template = window.fest['toplist/toplist.tmpl'];
            this.data = options.data;
            this._el = options.el || document.createElement('div');
            this.render();
        }

        render() {
            this._el.innerHTML = this.template(this.data);
        }
    }
    /* export */
    window.TopList = TopList;
}());
