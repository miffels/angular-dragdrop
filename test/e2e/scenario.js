/*global browser sleep element describe beforeEach it expect */

(function() {
'use strict';

    /**
     * Utility function granting access to the scope of an element :)
     * stackoverflow.com/questions/11959548/angularjs-accessing-scope-objects-in-e2e-tests
     *
     */
    angular.scenario.dsl('scope', function() {
        /*global scope:false */
        return function(selector, entry) {
            return this.addFutureAction('find scope variable for "' + selector + '"',
                function($window, $document, done) {
                    var $ = $window.$;
                    var element = $(selector);
                    if(!element.length) {
                        return done ('No element matched "' + selector + '".');
                    }
                    var property = element.scope();
                    if(entry) {
                        var entries = entry.split('.');
                        for(var key in entries) {
                            if(entries.hasOwnProperty(key)) {
                                property = property[entries[key]];
                            }
                        }
                    }
                    done(null, property);
                }
            );
        };
    });

    angular.scenario.dsl('trigger', function() {
        /*global trigger:false */
        return function(selector, event, data) {
            return this.addFutureAction('trigger "' + event + '" on "' + selector + '"',
                function($window, $document, done) {
                    var $ = $window.$;
                    var element = $(selector);
                    if(!element.length) {
                        return done ('No element matched "' + selector + '".');
                    }
                    element.trigger(event, data);
                    done();
                }
            );
        };
    });

    describe('My Application', function() {
        beforeEach(function() {
            browser().navigateTo('/');
            sleep(0.5);
        });

        it('should automatically reload the page', function() {
            expect(browser().location().url()).toBe('');
        });

        it('should allow dropping cats on the first box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var catData = scopePromise.value.cat;

            trigger('#drop-cat', 'drop', {
                draggable: {
                    data: function() {
                        return catData;
                    },
                    is: function(cls) {
                        return cls === '*' || cls === '.cat' || cls === '.cat,.dog';
                    }
                }
            });

            expect(element('#cat-value').val()).toEqual(catData);
        });

        it('should not allow dropping cats on the second box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var catData = scopePromise.value.cat;

            trigger('#drop-dog', 'drop', {
                draggable: {
                    data: function() {
                        return catData;
                    },
                    is: function(cls) {
                        return cls === '*' || cls === '.cat' || cls === '.cat,.dog';
                    }
                }
            });

            expect(element('#dog-value').val()).toEqual('');
        });

        it('should allow dropping cats on the third box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var catData = scopePromise.value.cat;

            trigger('#drop-cat-dog', 'drop', {
                draggable: {
                    data: function() {
                        return catData;
                    },
                    is: function(cls) {
                        return cls === '*' || cls === '.cat' || cls === '.cat,.dog';
                    }
                }
            });

            expect(element('#cat-value').val()).toEqual(catData);
        });

        it('should allow dropping dogs on the second box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var dogData = scopePromise.value.dog;

            trigger('#drop-dog', 'drop', {
                draggable: {
                    data: function() {
                        return dogData;
                    },
                    is: function(cls) {
                        return cls === '*' || cls === '.dog' || cls === '.cat,.dog';
                    }
                }
            });

            expect(element('#dog-value').val()).toEqual(dogData);
        });

        it('should not allow dropping dogs on the first box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var dogData = scopePromise.value.dog;

            trigger('#drop-cat', 'drop', {
                draggable: {
                    data: function() {
                        return dogData;
                    },
                    is: function(cls) {
                        return cls === '*' || cls === '.dog' || cls === '.cat,.dog';
                    }
                }
            });

            expect(element('#cat-value').val()).toEqual('');
        });

        it('should allow dropping dogs on the third box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var dogData = scopePromise.value.dog;

            trigger('#drop-cat-dog', 'drop', {
                draggable: {
                    data: function() {
                        return dogData;
                    },
                    is: function(cls) {
                        return cls === '*' || cls === '.dog' || cls === '.cat,.dog';
                    }
                }
            });

            expect(element('#dog-value').val()).toEqual(dogData);
        });

        it('should allow dropping catdogs on the first box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var catdogData = scopePromise.value.catdog;

            trigger('#drop-cat', 'drop', {
                draggable: {
                    data: function() {
                        return catdogData;
                    },
                    is: function(cls) {
                        return cls === '*' ||
                            cls === '.cat,.dog' ||
                            cls === '.cat.dog' ||
                            cls === '.cat' ||
                            cls === '.dog';
                    }
                }
            });

            expect(element('#cat-value').val()).toEqual('[object Object]');
        });

        it('should allow dropping catdogs on the second box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var catdogData = scopePromise.value.catdog;

            trigger('#drop-dog', 'drop', {
                draggable: {
                    data: function() {
                        return catdogData;
                    },
                    is: function(cls) {
                        return cls === '*' ||
                            cls === '.cat,.dog' ||
                            cls === '.cat.dog' ||
                            cls === '.cat' ||
                            cls === '.dog';
                    }
                }
            });

            expect(element('#dog-value').val()).toEqual('[object Object]');
        });

        it('should allow dropping catdogs on the third box', function() {
            var scopePromise = scope('#draggables');
            scopePromise.execute(function(){});
            var catdogData = scopePromise.value.catdog;

            trigger('#drop-cat-dog', 'drop', {
                draggable: {
                    data: function() {
                        return catdogData;
                    },
                    is: function(cls) {
                        return cls === '*' ||
                            cls === '.cat,.dog' ||
                            cls === '.cat.dog' ||
                            cls === '.cat' ||
                            cls === '.dog';
                    }
                }
            });

            expect(element('#cat-value').val()).toEqual('[object Object]');
            expect(element('#dog-value').val()).toEqual('[object Object]');
        });

        // No test for the fourth box because it only logs to the console

    });

})();