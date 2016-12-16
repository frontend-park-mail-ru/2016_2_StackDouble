(function () {
    'use strict';
    const Block = window.Block;

    class Game extends Block {
        constructor(options = {data: {}}) {
            super('div');
            this.template = window.fest['game/game.tmpl'];
            this.data = options.data || {};
            this._el = options.el || document.createElement('div');
            this.render();
        }

        render() {
          //исправить
          this.data.capacity_of_drawer= 0;
          window.capacity_of_drawer= 15;
            this._el.innerHTML = this.template(this.data);
        }
    }
    /* export */
    window.Game = Game;
}());
