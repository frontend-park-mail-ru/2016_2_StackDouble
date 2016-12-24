// наименование для нашего хранилища кэша
const CACHE_NAME = 'app_serviceworker_v_1';
const MAX_AGE = 300000;
// ссылки на кэшируемые файлы
const cacheUrls = [
  "/assets/avatar.svg",
  "/assets/card.svg",
  "/assets/clock.svg",
  "/assets/clock_red.svg",
  "/assets/goblet.svg",
  "/assets/starb.svg",
  "/assets/stary.svg",
  "/assets/deck/ace.svg",
  "/assets/deck/deck_face.svg",
  "/assets/deck/deck.svg",
  "/assets/deck/eight.svg",
  "/assets/deck/five.svg",
  "/assets/deck/four.svg",
  "/assets/deck/jack.svg",
  "/assets/deck/joker.svg",
  "/assets/deck/king.svg",
  "/assets/deck/queen.svg",
  "/assets/deck/seven.svg",
  "/assets/deck/six.svg",
  "/assets/deck/ten.svg",
  "/assets/deck/three.svg",
  "/assets/deck/two.svg",

"/css/style.css",
"/baseUrl.js",
"/lib/request.js",
"/libs/technolibs/index.js",
"/modules/pathToRegex.js",
"/modules/view.js",
"/modules/route.js",
"/modules/router.js",

"/components/block/block.js",
"/components/button/button.js",
"/components/form/form.tmpl.js",
"/components/form/form.js",
"/components/topmenu/topmenu.js",
"/components/topmenu/topmenu.tmpl.js",
"/components/mainmenu/mainmenu.js",
"/components/mainmenu/mainmenu.tmpl.js",
"/components/toplist/toplist.js",
"/components/toplist/toplist.tmpl.js",
"/components/game/game.js",
"/components/game/game.tmpl.js",

"/models/player.js",
"/models/user.js",
"/models/toplist.js",
"/models/game/desk.js",
"/models/game/player.js",
"/models/game/rivals.js",
"/models/game/singleplayer.js",
"/models/game/worker.js",

"/views/main.js",
"/views/game.js",
"/views/registration.js",
"/views/mainMenu.js",
"/views/topList.js",
"/assets/clock.svg",

"/main.js",

];

this.addEventListener('install', function (event) {
  // задержим обработку события
  // если произойдёт ошибка, serviceWorker не установится
  event.waitUntil(
    // находим в глобальном хранилище Cache-объект с нашим именем
    // если такого не существует, то он будет создан
    caches.open(CACHE_NAME)
    .then(function (cache) {
      // загружаем в наш cache необходимые файлы
      return cache.addAll(cacheUrls);
    })
  );
});

this.addEventListener('fetch', function (event) {
  // console.log(event);
  event.respondWith(
    // ищем запрашиваемый ресурс в хранилище кэша
    caches.match(event.request).then(function (cachedResponse) {
      let lastModified, fetchRequest;
      console.log(cachedResponse);
      // выдаём кэш, если он есть
      if (cachedResponse) {
        lastModified = new Date(cachedResponse.headers.get('last-modified'));
        if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE){
          fetchRequest = event.request.clone();
          // создаём новый запрос
          return fetch(fetchRequest).then(function(response) {
            if (!response || response.status !== 200) {
              return cachedResponse;
            }
            // обновляем кэш
          /*  caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, response.clone());
            });*/
            // возвращаем свежий ресурс
            return response;
          }).catch(function() {
            return cachedResponse;
          });
        }

        return cachedResponse;
      }

      // иначе запрашиваем из сети как обычно
      return fetch(event.request);
    })
  );
});
