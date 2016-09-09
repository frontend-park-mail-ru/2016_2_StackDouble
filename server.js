let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();
let userslist = new Map();

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
	let value =(userslist.has(email))?userslist.get(email)+1:0;
	userslist.set(email,value);
	return value;
}
