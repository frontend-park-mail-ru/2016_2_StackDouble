(function () {
	'use strict';

	// TODO сделать так, чтобы все тесты проходили
	const pathToRegex = function (pathname) {
		const keyNames = [];
		const parts = pathname
			.split('/')
			.filter((part) => part)
			.map((part)=> {
				if (/^:/.exec(part)) {
					keyNames.push(part.slice(1));
					return new RegExp(`^\/([^/]+)`, `i`);
				}
				return new RegExp(`^\/${part}`, `i`);
			});


		return function (path) {
			const keys = [];
			let check = parts.every((regexp, step) => {
				const tmp = regexp.exec(path);
				if (!tmp) {
					return false;
				}
				if (tmp.length === 2) {
					keys.push(tmp[1]);
				}
				path = path.replace(regexp, '');
				return true;
			});

			if (path !== '' && path !== '/') {
				check = false;
			}

			if (check) {
				return keys.reduce((prev, curr, pos) => {
					prev[keyNames[pos]] = curr;
					return prev;
				}, {});
			}
			return null;
		};
	};


	/* export */
	window.pathToRegex = pathToRegex;
}());