module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            'app/lib/jquery/jquery.js',
            'app/lib/jquery-ui/ui/jquery-ui.js',
            'app/lib/angular/angular.js',
            'angular-dragdrop.js',
            'test/helpers.js',
            'test/unit/**/*.js',
            'test/lib/**/*.js'
        ],

        basePath: '../',

        autoWatch: true,

        proxies: {
            '/': 'http://localhost:8000/'
        },

        urlRoot: '__karma__',

        browsers: ['C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'],

        reporters: ['dots'],

        LogLevel: config.LOG_DEBUG,

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-script-launcher'
        ]
    });
};
