(function () {
  'use strict';

  const Desk = window.GameDesk;
  const Rivals = window.GameRivals;
  const Player = window.GamePlayer;

//test
  class Fakesocket{
    constructor(){
    }
  }



  class Worker {
    /**
    * Создаёт новую игру
    * @param {socket} socket - имя пользователя
    * @param {User} user - объект пользователя
    * @param {number=} nrivals - число соперников
    * @param {number} status - прогресс выполнения
    */
    constructor(user, nrivals=4) {
      this.status = 0;//socket opened =1, поиск игроков, игра создана, игра окончена
      this.nrivals = nrivals;
      this.desk;
      this.user = user;
      this.rivals;
      this.player;

      //test
      this.start()

    }

    finish(){
      //TODO:допаботать
      this.status = null;
      this.nrivals = null;
      this.desk = null;
      this.user = null;
      this.rivals = null;
      this.player = null;
    }


    /**
    * установка и нстройка соединения
    * @private
    */
    setconnection(){
      //TODO:только установка соединения
      // Выбираем по какому протоколу будет производиться соединение
      const protocol = window.location.protocol === 'https:' ?
      'wss:' : 'ws:';
      // Составляем адрес, по которому будет призводиться соединение
      const address = `${protocol}//${location.host}/ws/echo`;
      console.log('Создаём новый WebSocket:', address);

      //test
      //this.socket = new WebSocket(address);
      this.socket = new Fakesocket();

      //TODO: отправка сешн ид для установки/восстановления соединения

      this.socket.onopen = function (event) {
        console.log('Соединение установленно');
        this.status = 1;
      }.bind(this);

      this.socket.onclose = function (event) {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
          clearInterval(this.intervalId);
        } else {
          console.log('Обрыв соединения');
          this.setconnection();
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
      }.bind(this);

      this.socket.onerror = function (error) {
        console.log('Ошибка ' + error.message);
      };

      this.socket.onmessage = this.receiver.bind(this, event);

    }

    /**
    * Начало новой игры
    */
    start() {
      this.setconnection();

      //test
      var event = new CustomEvent("onmessage");
      event.data = JSON.stringify(window.TestInfo.data['game_start']);
      this.receiver(event);
      event.data = JSON.stringify(window.TestInfo.data['change_player']);
      this.receiver(event);
      event.data = JSON.stringify(window.TestInfo.data['change_rivals']);
      this.receiver(event);
      event.data = JSON.stringify(window.TestInfo.data['next_round']);
      this.receiver(event);

      //TODO:запрос на поиск игроков и начало игры
      //TODO:вызов апдейтов стола, игрока и соперников
      //TODO: проверка игрока и переправка серверу/переделать в лисен объекта?
      this.intervalId= setInterval(()=>{this.checkPlayer.call(this);}, 300)
    }

    isStopped() {
      return this._stopped;
    }

    /**
    * отправка действия игрока
    * @private
    * @param {string} action - действие пользователя
    * @param {Card[].type} data - номиналы карт
    * @return {textstatus} - status
    */
   send(action, data){
      var msg ={
        action: action,
        data:data
      };
      try {
        this.socket.send(JSON.stringify(msg));

      } catch (e) {
        console.log('Ошибка при отправке' + e.message);
        return "error";
      }
    }

    //получить заново все данные с сервера для продолжения игры
    reloadAll(){

    }

    /**
    * колбек на сообщения сокета. вызывает апдейты
    * @callback receiver
    * @param {Card[]} hand - колода игрока
    */
    receiver(event){
      var msg = JSON.parse(event.data);

      switch(msg.action) {
        case "game_start"://апдейт игрока, соперников, стола
        this.rivals = new Rivals(msg.data.rivals);
        this.desk = new Desk(msg.data.desk);
        this.player = new Player(msg.data.player);
        break;
        case "game_end"://коректно завершаем
        this.finish();
        break;
        case "change_player": //новые карты от обмена, колво очков от комбо
        this.player.update(msg.data.player);
        break;
        case "change_rivals"://инфа о ид делающего ход, ид предыдущего и его действие
        this.rivals.update(msg.data.rivals);
        break;
        case "next_round": //ап колоды игрока, инфы о соперниках(сколько карт), колоды на столе
        this.rivals.update(msg.data.rivals);
        this.desk.update(msg.data.desk);
        this.player.update(msg.data.player);
        break;
      }

    }

    /**
    * проверка сделал ли игрок действие и вызов его отправки
    * @private
    */
    checkPlayer() {
      var t = this.player.get_action();
      if(t.action !== false){
        //отправка действия и списка карт
        this.send(t.action, t.cards);
      }
    }

  }

  //export
  window.GameWorker = Worker;
})();
