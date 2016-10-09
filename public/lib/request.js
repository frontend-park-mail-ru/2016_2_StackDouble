(function () {
	'use strict';

	function request(url, data, type = 'POST') {
		const xhr = new XMLHttpRequest();

		xhr.open(type, url, false);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(data));

		return xhr.responseText;
	}
	window.request = request;
}());
