/*global
describe:false,
beforeEach:false,
it:false,
expect:false,
runs:false,
waitsFor:false,
jasmine:false */

describe('angular-dragdrop', function() {
    'use strict';

    var element, scope;

    beforeEach(function() {
        angular.mock.module('angular.dragdrop');
    });

    describe('angular-droppable', function() {

        function init(template) {
            beforeEach(function() {
                angular.mock.inject(function($rootScope, $compile) {
                    element = angular.element(template);

                    scope = $rootScope;
                    scope.drop = jasmine.createSpy();
                    $compile(element)(scope);
                    scope.$digest();
                });
            });
        }

        describe('defaults', function() {
            init('<div angular-droppable></div>');

            it('should load the jquery-ui droppable plugin and apply it to the element', function() {
                expect(element.droppable).toBeDefined();
                expect(element).toHaveClass('ui-droppable');

                expect(element.droppable('option', 'accept')).toEqual('*');
                expect(element.droppable('option', 'activeClass')).toEqual(false);
                expect(element.droppable('option', 'addClasses')).toEqual(true);
                expect(element.droppable('option', 'disabled')).toEqual(false);
                expect(element.droppable('option', 'greedy')).toEqual(false);
                expect(element.droppable('option', 'hoverClass')).toEqual(false);
                expect(element.droppable('option', 'scope')).toEqual('default');
                expect(element.droppable('option', 'tolerance')).toEqual('intersect');

            });

            it('should not complain about missing on-drop handlers', function() {
                element.trigger('drop');
            });
        });

        describe('custom draggable config values', function() {

            init('<div angular-droppable ' +
                'accept="a b c" ' +
                'active-class="highlight" ' +
                'add-classes="false" ' +
                'disabled="true" ' +
                'greedy="true" ' +
                'hover-class=".hover .another-hover" ' +
                'scope="tasks" ' +
                'tolerance="fit" ' +
                'on-drop="drop" ' +
                '></div>');

            it('should allow configuration via HTML attributes', function() {
                expect(element).not.toHaveClass('ui-droppable');

                expect(element.droppable('option', 'accept')).toEqual('a b c');
                expect(element.droppable('option', 'activeClass')).toEqual('highlight');
                expect(element.droppable('option', 'addClasses')).toEqual(false);
                expect(element.droppable('option', 'disabled')).toEqual(true);
                expect(element.droppable('option', 'greedy')).toEqual(true);
                expect(element.droppable('option', 'hoverClass')).toEqual('.hover .another-hover');
                expect(element.droppable('option', 'scope')).toEqual('tasks');
                expect(element.droppable('option', 'tolerance')).toEqual('fit');

            });

        });

        describe('angular-specific behavior', function() {
            var ui;

            beforeEach(function() {
                ui = {
                    draggable: angular.element('<div class="a"></div>')
                };
                ui.draggable.data('angular-draggable', 'asd');
            });

            init('<div angular-droppable ' +
                'accept=".a,.b,.c" ' +
                'hover-class=".hover .another-hover" ' +
                'on-drop="drop" ' +
                '></div>');

            it('should call the onDrop handler when a drop event occurs', function() {
                element.trigger('drop', ui);
                expect(scope.drop).toHaveBeenCalledWith('asd');
            });

            it('should call the onDrop handler with $index if available', function() {
                scope.$index = 0;
                element.trigger('drop', ui);
                expect(scope.drop).toHaveBeenCalledWith('asd', 0);
            });

            it('should not break if there is no draggable data', function() {
                element.trigger('drop');
                expect(scope.drop).toHaveBeenCalled();
            });

            it('should be able to deal with non-function handlers', function() {
                delete scope.drop;
                element.trigger('drop', ui);
                expect(scope.drop).toEqual('asd');
            });

            it('should be able to deal with undefined non-function handlers', function() {
                delete scope.drop;
                element.trigger('drop', ui);
                expect(scope.drop).toEqual('asd');
            });

            describe('path expressions', function() {
                init('<div angular-droppable ' +
                    'accept=".a,.b,.c" ' +
                    'hover-class="hover hover!" ' +
                    'on-drop="drop.someKey"' +
                    '></div>');

                it('should be able to deal with defined non-function handlers', function() {
                    scope.drop = {someKey: 'asd'};
                    element.trigger('drop', ui);
                    expect(scope.drop.someKey).toEqual('asd');
                });
            });

            describe('handler mappings', function() {
                init('<div angular-droppable ' +
                    'accept=".a,.b" ' +
                    'hover-class="hover hover!" ' +
                    'on-drop="{&quot;.a&quot;: &quot;dropA&quot;, ' +
                    '&quot;.b&quot;: &quot;dropB&quot;}"></div>');

                var a, b, ab;

                beforeEach(function() {
                    a = angular.element('<div class="a"></div>');
                    b = angular.element('<div class="b"></div>');
                    ab = angular.element('<div class="a b"></div>');
                    a.data('angular-draggable', 'asd');
                    b.data('angular-draggable', 'fgh');
                    ab.data('angular-draggable', 'jkl');

                    scope.dropA = jasmine.createSpy();
                    scope.dropB = jasmine.createSpy();
                });

                it('should be able to map a draggable class to a specific handler', function() {
                    ui.draggable = a;

                    element.trigger('drop', ui);

                    expect(scope.dropA).toHaveBeenCalledWith('asd');
                    expect(scope.dropB).not.toHaveBeenCalled();
                });

                it('should be able to map a draggable class to a specific handler', function() {
                    ui.draggable = b;

                    element.trigger('drop', ui);

                    expect(scope.dropA).not.toHaveBeenCalled();
                    expect(scope.dropB).toHaveBeenCalledWith('fgh');
                });

                it('should also be able to notify multiple handlers', function() {
                    ui.draggable = ab;

                    element.trigger('drop', ui);

                    expect(scope.dropA).toHaveBeenCalledWith('jkl');
                    expect(scope.dropB).toHaveBeenCalledWith('jkl');
                });

                it('should not allow dropping when the draggable is not accepted', function() {
                    ui.draggable = angular.element('<div class="asd"></div>');
                    ui.draggable.data('angular-draggable', 'abc');

                    element.trigger('drop', ui);

                    expect(scope.dropA).not.toHaveBeenCalled();
                    expect(scope.dropB).not.toHaveBeenCalled();
                });
            });
        });

    });
});
