(function () {
	'use strict';

	function stringToArray(str) {
		const arr = [];
		let word = '';
		const regexp = /[а-яёa-z]+$/i;
		let flag = false;
		for (let i = 0; i < str.length; i += 1) {
			if (regexp.test(str[i])) {
				word += str[i];
				flag = false;
			} else {
				if (word !== '') {
					arr.push(word);
					word = '';
				}
				arr.push(str[i]);
				flag = true;
			}
		}
		if (!flag) arr.push(word);
		return arr;
	}

	function filter(str, rules = ['КЕК']) {
		const arr = stringToArray(str);
		let newstr = '';
		arr.forEach((item) => {
			if (rules.find((element) => {
				return element === item;
			})) {
				newstr += new Array(item.length + 1).join('*');
			} else {
				newstr += item;
			}
		});
		return newstr;
	}

	/* *for NodeJS */
	if (typeof exports === 'object') {
		exports.filter = filter;
	} else {
		window.filter = filter;
	}
}());
