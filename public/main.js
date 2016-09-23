(function () {
  'use strict';

  let userData = {};

  function createMessage(opts, isMy = false) {
    const message = document.createElement('div');
    const email = document.createElement('div');

    message.classList.add('chat__message');
    email.classList.add('chat__email');

    if (isMy) {
      message.classList.add('chat__message_my');
    } else {
      message.style.backgroundColor = `#${technolibs.colorHash(opts.email || '')}`;
    }
    message.innerHTML = opts.message;
    email.innerHTML = opts.email;
    message.appendChild(email);

    return message;
  }


  function renderChat(items) {
    jsMessages.innerHTML = '';
    items.forEach((item) => {
      const message = createMessage(item, item.email === userData.email);
      jsMessages.appendChild(message);
    });
    jsMessages.scrollTop = jsMessages.scrollHeight;
  }

  function subscribe() {
    technolibs.onMessage((data) => {
      renderChat(Object.keys(data).map(key => data[key]));
    });
  }

  function onLogin(form, block) {
    userData = {
      user: form.elements['user'].value,
      email: form.elements['email'].value,
    };

    jsLogin.hidden = true;
    jsChat.hidden = false;

    if (userData.user) {
      userData.user = filter(userData.user);
      jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
    }

    subscribe();
  }

  function onChat(form) {
    const data = {
      message: form.elements['message'].value,
      email: userData.email,
    };

    const result = technolibs.request('/api/messages', data);
    form.reset();
  }

  if (typeof exports !== 'object') {
    window.onLogin = onLogin;
    window.onChat = onChat;
  }
})();
