module.exports = {
    'swagger': '2.0',
    'info': {
        'version': '0.0.3',
        'title': 'Stack Double API',
        'description': 'Карточная игра',
    },
    'basePath': '/api',
    'schemes': ['http'],
    'host': 'http://localhost:3000',

    paths: {
        '/messages': require('./resources/messages'),
        '/session': require('./resources/session'),
        '/user': require('./resources/user'),
    },

    definitions: {
        Message: require('./scheme/Message'),
        Session: require('./scheme/Session'),
        User: require('./scheme/User'),
    },
};