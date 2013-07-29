module.exports = function(config) {
    config.set({
        files: [
            JASMINE,
            JASMINE_ADAPTER,
            'app/lib/jquery/dist/jquery.js',
            'app/lib/**/*.js',
            'test/helpers.js',
            'angular-dragdrop.js',
            'test/unit/**/*.js',
            'test/lib/**/*.js'
        ],

        basePath: '../',

        autoWatch: true,

        proxies: {
            '/': 'http://localhost:8000/'
        },

        urlRoot: '__karma__',

        browsers: ['Chrome'],

        reporters: ['dots'],

        LogLevel: LOG_DEBUG,

        plugins: [
            'karma-ng-scenario',
            'karma-chrome-launcher'
        ]
    });
};
