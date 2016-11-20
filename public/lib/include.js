(function () {
    'use strict';

    function include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    /* *for NodeJS */
    if (typeof exports !== 'object') {
        window.include = include;
    }
}());

