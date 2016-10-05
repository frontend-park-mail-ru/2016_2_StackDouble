(function () {
	'use strict';

	function hello(text) {
		return 'Привет, ' + text;
	}

	/* *for NodeJS */
	if (typeof exports === 'object') {
		exports.hello = hello;
	} else {
		window.hello = hello;
	}
}());
