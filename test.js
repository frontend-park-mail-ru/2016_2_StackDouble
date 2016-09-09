let assert = require('assert');
let hello = require('./public/main').hello;
let plural = require('./public/main').plural;

assert.equal(hello('Test'), 'Привет, Test');

assert.equal(plural(0), 'Вы были на портале 0 раз.');
assert.equal(plural(1), 'Вы были на портале 1 раз.');
assert.equal(plural(2), 'Вы были на портале 2 разa.');
assert.equal(plural(13), 'Вы были на портале 13 раз.');
assert.equal(plural(15), 'Вы были на портале 15 раз.');
assert.equal(plural(100), 'Вы были на портале 100 раз.');
