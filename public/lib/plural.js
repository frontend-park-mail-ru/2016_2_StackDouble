(function () {
	'use strict';

	function plural(value) {
		let text = 'Вы были на портале ' + value + ' раз';

		let i = value % 100;
		i = (i < 10 || i > 20) ? i % 10 : 0;
		text += (i > 1 && i < 5) ? 'a.' : '.';

		return text;
	}

	/* for NodeJS */
	if (typeof exports === 'object') {
		exports.plural = plural;
	} else {
		window.plural = plural;
	}
}());
