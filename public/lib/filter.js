(function (){
	'use strict';

	function filter(str, rules){
	rules = rules.map((rule) => {
		return {
			regexp: RegExp('\\b('+rule+')\\b', 'gi'),
			length: rule.length
		};

	});

	rules.forEach(rule => {
		str = str.replace(rule.regexp, (new Array(rule.length+1)).join('*'));

	});

	return str;
}

		/* *for NodeJS */
	if (typeof exports === 'object') {
		exports.filter = filter;
	} else {
		window.filter = filter;
	}

})();
