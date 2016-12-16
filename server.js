'use strict';

let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

app.use('/', express.static('public', { maxAge: 1 }));
app.use('/registration', express.static('public', { maxAge: 1 }));
app.use('/game', express.static('public', { maxAge: 1 }));
app.use('/mainmenu', express.static('public', { maxAge: 1 }));
app.use('/topList', express.static('public', { maxAge: 1 }));

app.use(express.static(__dirname + '/css'));

technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.get('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});

app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
