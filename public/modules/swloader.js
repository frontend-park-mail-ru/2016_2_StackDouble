(function () {
	'use strict';
	if (!navigator.serviceWorker) {
		return;
	}
	navigator.serviceWorker.register(
		'/sw.js'
	).then(function (registration) {
		// при удачной регистрации имеем объект типа ServiceWorkerRegistration
		console.log('ServiceWorker registration', registration);
		// строкой ниже можно прекратить работу serviceWorker’а
		registration.unregister();
	}).catch(function (err) {
		throw new Error('ServiceWorker error: ' + err);
	});

//test
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
	 for(let registration of registrations) {
	  registration.unregister()
	} })
})();
