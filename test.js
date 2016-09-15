let assert = require('assert');
let hello = require('./public/main').hello;
let filter = require('./public/main').filter;
let plural = require('./public/main').plural;

let badwords = ['orange', 'apple'];

assert.equal(plural(0), 'Вы были на портале 0 раз.');
assert.equal(plural(1), 'Вы были на портале 1 раз.');
assert.equal(plural(2), 'Вы были на портале 2 разa.');
assert.equal(plural(13), 'Вы были на портале 13 раз.');
assert.equal(plural(15), 'Вы были на портале 15 раз.');
assert.equal(plural(100), 'Вы были на портале 100 раз.');

assert.equal(hello('Test'), 'Привет, Test');
//TODO: Кейсы для функции filter
assert.equal(filter('КЕК'), '***');
assert.equal(filter('orange',badwords), '******');
assert.equal(filter('orange, asasasasa',badwords), '******, asasasasa');
assert.equal(filter('asasasasa orange',badwords), 'asasasasa ******');
assert.equal(filter('asasasasaorange',badwords), 'asasasasaorange');
