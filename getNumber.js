(function (){
	'use strict';
	let users_list = new Map();

	/* Счетчик входов */
	function getNumber(email){
		let value =(users_list.has(email))?users_list.get(email)+1:0;
		users_list.set(email,value);
		return value;
	}

	/* *for NodeJS */
	if (typeof exports !== 'object') {
		window.getNumber = getNumber;
	}
}());