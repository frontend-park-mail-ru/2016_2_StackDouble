(function () {
  'use strict';

  const View = window.View;
  const TopMenu = window.TopMenu;
  const request = window.request;
  const MainMenu = window.MainMenu;

  class MainMenuView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('#js-topmenu');
      this.hide();
      this.topmenu = new TopMenu({
        el:this._el,
        data:{
          //TODO:передавать инфу игрока
          nick: "Amadeus",
          avatar: "http://lorempixel.com/40/40",
          score: "318"
        }
      });
      this.show();
      this._el = document.querySelector('#js-mainmenu');
      this.mainmenu = new MainMenu({
        data:{
          buttons: [
              {
                  tabindex: '1',
                  id: "btn_start",
                  text: "Играть!"
              },
              {
                  tabindex: '2',
                  id: "btn_totorial",
                  text: "Туториал"
              },
              {
                  tabindex: '3',
                  id: "btn_score_bord",
                  text: "Рейтинг"
              },
              {
                  tabindex: '4',
                  id: "btn_exit",
                  text: "Выйти"
              },
          ],
        }
      });
      this._el.appendChild(this.mainmenu._el);
    }


    resume(options = {}) {
      console.log("init topmenu");
      this.topmenu._el.querySelector('#top_btn_exit').addEventListener('click', (event)=> {
          event.preventDefault();
          console.log("exit");
          //TODO:исправить хуйню
          this.hide();
          this._el = document.querySelector('#js-topmenu');
          this.hide();
          this.router.go('/');
        });

        console.log("init mainmenu");
        this.mainmenu._el.querySelector('#btn_exit').addEventListener('click', (event)=> {
            event.preventDefault();
            //TODO:исправить хуйню
            this.hide();
            this._el = document.querySelector('#js-topmenu');
            this.hide();
            console.log("exit");
            this.router.go('/');
          });

      if (!options.username && !options.email) {
        //		return this.router.go('/');
      }
      //window.location.assign(window.location.host+"/waitingroom");
      //window.location.reload([true]);
      // TODO: дописать реализацию

      this.show();
    }
  }
  // export
  window.MainMenuView = MainMenuView;

})();
