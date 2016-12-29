process.env.NODE_ENV = 'test';

['.css', '.png', '.jpg'].forEach(ext => {
    require.extensions[ext] = () => null;
});

require('babel-register')();
require('jsdom-global')();
