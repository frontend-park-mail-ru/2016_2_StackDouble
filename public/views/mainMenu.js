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

      this._el = document.querySelector('#js-mainmenu');
      this.hide();
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
                  id: "btn_top_list",
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

    render(options = {}) {
    }

    init(options = {}) {
      this.setAttrs(options.attrs);

      console.log("init topmenu");
      this.topmenu._el.querySelector('#top_btn_exit').addEventListener('click', (event)=> {
          event.preventDefault();
          this._el = document.querySelector('#js-topmenu');
          this.remove();
          this._el = document.querySelector('#js-mainmenu');
          this.remove();
          //TODO: пересоздавать вью или как тест пусть будет
          window.location.reload([true]);
          this.router.go('/');
        });

        console.log("init mainmenu");
        this.mainmenu._el.querySelector('#btn_exit').addEventListener('click', (event)=> {
            event.preventDefault();
            console.log("exit");
            this._el = document.querySelector('#js-topmenu');
            this.remove();
            this._el = document.querySelector('#js-mainmenu');
            this.remove();
            window.location.reload([true]);
            this.router.go('/');
          });

          this.mainmenu._el.querySelector('#btn_top_list').addEventListener('click', (event)=> {
              event.preventDefault();
              console.log("go to top list");
              this.router.go('/toplist');
            });

            this.mainmenu._el.querySelector('#btn_start').addEventListener('click', (event)=> {
                event.preventDefault();
                this.mainmenu._el.querySelector('.waiting-sign').hidden = false;
                //for test
                setTimeout((function(){
                  console.log("go to game");
                  this.router.go('/game');
                }).bind(this), 2000);

              });


    }

    pause(options = {}) {
      this._el = document.querySelector('#js-mainmenu');
      this.hide();
    }


    resume(options = {}) {
      if (!options.username && !options.email) {
        //		return this.router.go('/');
      }
      //window.location.assign(window.location.host+"/waitingroom");
      //window.location.reload([true]);
      // TODO: дописать реализацию
      this._el = document.querySelector('#js-topmenu');
      this.show();
      this._el = document.querySelector('#js-mainmenu');
      this.show();
    }
  }
  // export
  window.MainMenuView = MainMenuView;

})();
