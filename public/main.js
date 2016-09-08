'use strict';
/**
* @see http://artsiom.mezin.eu/technofront/
*/

function onSubmit (form) {
	let data = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	let result = request('/users', data);

	if (result > -1) {
		form.hidden = true;
		let text = hello(data.user)+ ". " + plural(result)
		window.helloWorld.innerHTML = text;
	}

	console.log(data, result);
}

function hello (text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
}

if (typeof exports === 'object') {
	exports.plural = plural;
}

function plural (value){
	let text = "Вы были на портале " + value +" раз";	

	let i=value%100;
	i=(i<10||i>20)?i%10:0;
	text+=(i>1 && i<5)?"a.":".";

	return text;
}
