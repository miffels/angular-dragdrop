module.exports = function(config) {
    config.set({
        frameworks: ['ng-scenario'],

        files: [
            {pattern: 'app/js/**/*.js', included: false, watched: true, served: false},
            'test/e2e/**/*.js'
        ],

        basePath: '../',

        autoWatch: true,

        proxies: {
            '/': 'http://localhost:8000/'
        },

        urlRoot: '__karma__',

        browsers: ['Chrome'],

        reporters: ['dots'],

        plugins: [
            'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    });
};
