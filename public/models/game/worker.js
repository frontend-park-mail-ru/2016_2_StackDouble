var g_deck = {ace:{type:"ace"}, king:{type:"king"}, queen:{type:"queen"},jack:{type:"jack"},joker:{type:"joker"},
ten:{type:"ten"},nine:{type:"nine"},eight:{type:"eight"},seven:{type:"seven"},six:{type:"six"},
five:{type:"five"},four:{type:"four"},three:{type:"three"},two:{type:"two"}};

//или так с точным опредом карт?
/*let deck1 = [{type:"ace", total_cards: 4},{type:"king", total_cards: 4},{type:"queen", total_cards: 4},{type:"jack", total_cards: 4},{type:"joker", total_cards: 4},
{type:"ten", total_cards: 4},{type:"nine", total_cards: 4},{type:"eight", total_cards: 4},{type:"seven", total_cards: 4},{type:"six", total_cards: 4},
{type:"five", total_cards: 4},{type:"four", total_cards: 4},{type:"three", total_cards: 4},{type:"two", total_cards: 4}];*/

const pair = {notype:[2], score: 10};
const set = {notype:[3], score: 16};
const double_pair = {notype:[2, 2], score: 24};
const square = {notype:[4], score: 28};
const full_house = {notype:[3, 2], score: 35};
const low_straight = {notype:[], type:{two:1, three:1, four:1, five:1, six: 1}, score: 70};
const flush_royal = {notype:[], type:{ten:1, jack:1, queen:1, king:1, ace: 1}, score: 100};

var g_combinations = {pair:pair, set:set, square:square, double_pair:double_pair, full_house:full_house, flush_royal:flush_royal, low_straight:low_straight};

var g_action_name__combo = "combo",
g_action_name__exchange = "exchange";

var g_min_combo = 2;


(function () {
  'use strict';

  const Desk = window.GameDesk;
  const Rivals = window.GameRivals;
  const Player = window.GamePlayer;
  const SinglePlayer = window.SinglePlayer;

  class Worker {
    /**
    * Создаёт новую игру
    * @param {WebSocket} socket - имя пользователя
    * @param {User} user - объект пользователя
    * @param {number=} nrivals - число соперников
    * @param {number} status - прогресс выполнения
    */
    constructor(user, nrivals=4) {
      console.log("worker created");
      this.status_pr = 0;//socket opened =1, поиск игроков, игра создана, игра окончена
      this.nrivals = nrivals;
      this.desk;
      this.user = user;
      this.rivals;
      this.player;
      this.single;
      this.onstatuschange = function(){};
      this.onendgame = function(){};
    }

    set status(number){
      this.status_pr = number;
      this.onstatuschange();
    }

    get status(){
      return this.status_pr;
    }

    finish(){
      //TODO:доработать
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

      this.socket = {};

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
      this.status = 2;
      //TODO:  если не удалось установить соединение, то сохдать SingePlayer
      this.single = new SinglePlayer(this);
      //TODO: отправка сешн ид для установки/восстановления соединения
    }

    /**
    * Начало новой игры
    */
    start() {
      this.setconnection();
      //TODO:запрос на поиск игроков и начало игры
      //TODO:вызов апдейтов стола, игрока и соперников
      //TODO: проверка игрока и переправка серверу/переделать в лисен объекта?

      this.player.onaction = function(){
        this.desk.timer = 0;
          this.send(this.player.action);
    }.bind(this);
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
   send(msg){
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
    * @callback WebSocket-onmessage
    * @param {event} event - событие
    * @param {object} event.data - переданная инфа
    */
    receiver(event){
      let msg = JSON.parse(event.data);

      switch(msg.action) {
        case "game_start"://апдейт игрока, соперников, стола
        this.rivals = new Rivals(msg.data.rivals);
        this.desk = new Desk(msg.data.desk);
        this.player = new Player(msg.data.player);
        this.status = 3;
        break;
        case "game_end"://коректно завершаем
        this.status = 4;
        this.player.update(msg.data.player);
        this.rivals.update(msg.data.rivals);
        this.onendgame();
        this.finish();
        break;
        case "change_player": //новые карты от обмена, колво очков от комбо
        this.user.score = msg.data.player.score;
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

  }

  //export
  window.GameWorker = Worker;
})();
