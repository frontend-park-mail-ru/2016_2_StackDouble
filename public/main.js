'use strict';

let userData = {};

function filter (str, rules = ['КЕК']) {
	let arr = stringtoarray(str);
	str = ''
	arr.forEach((item)=> {
		if (rules.find((element)=>{return element===item})) {
			str += new Array(item.length + 1).join('*')
		} else {
			str += item;
		}
	});
	return str;
}

function onLogin (form, block) {
	userData = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	jsLogin.hidden = true;
	jsChat.hidden = false;

	if (userData.user) {
		userData.user = filter(userData.user);
		jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
	}

	subscribe();
}

function createMessage (opts, isMy = false) {
	let message = document.createElement('div');
	let email = document.createElement('div');

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

function onChat (form) {
	let data = {
		message: form.elements['message'].value,
		email: userData.email
	};

	let result = technolibs.request('/api/messages', data);
	form.reset();
}

function renderChat (items) {
	jsMessages.innerHTML = '';
	items.forEach(item => {
		let message = createMessage(item, item.email === userData.email);
		jsMessages.appendChild(message);
	});
	jsMessages.scrollTop = jsMessages.scrollHeight;
}

function subscribe () {
	technolibs.onMessage(data => {
		renderChat(Object.keys(data).map(key => data[key]));
	});
}

function hello(text) {
	return 'Привет, ' + text;
}

function plural (value){
	let text = "Вы были на портале " + value +" раз";

	let i=value%100;
	i=(i<10||i>20)?i%10:0;
	text+=(i>1 && i<5)?"a.":".";

	return text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.filter = filter;
	exports.plural = plural;
}

function stringtoarray(str) {
	let arr = [];
	let word = '';
	let regexp = /[а-яёa-z]+$/i;
	let flag=false;
	for (let i=0;i<str.length;i++){
		if (regexp.test(str[i])){
			word+=str[i];
			flag=false
		}else{
			if (word!==''){
				arr.push(word);
				word = '';
			}
			arr.push(str[i]);
			flag=true;
		}
	}
	if(!flag) arr.push(word);
	return arr;
}