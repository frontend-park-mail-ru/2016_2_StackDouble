let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();
let userslist = {
	email: [],
	value: []
}

app.use('/', express.static('public'));

app.use(parser.json());
app.use(technologger);

app.post('/users', (req, res) => {
    console.log(req.body);
    // TODO: вернуть количество обращений
    res.send(String(getnumber(req.body.email)));
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});

function getnumber(email){
	let i = userslist.email.findIndex(str => str === email);

	if (i==-1){
		i=userslist.email.length;
		userslist.email.push(email);
		userslist.value.push(-1);
	}
	userslist.value[i]++;
	return userslist.value[i];
}
