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

    describe('angular-draggable', function() {

        function init(template) {
            beforeEach(function() {
                angular.mock.inject(function($rootScope, $compile) {
                    element = angular.element(template);

                    scope = $rootScope;
                    scope.data = {
                        stuff: function() {
                            return 'asd';
                        }
                    };
                    $compile(element)(scope);
                    scope.$digest();
                });
            });
        }

        describe('defaults', function() {
            init('<div angular-draggable></div>');

            it('should load the jquery-ui draggable plugin ' +
                'and apply it to the element using the default options', function() {
                expect(element.draggable).toBeDefined();
                expect(element).toHaveClass('ui-draggable');
                expect(element.data('draggable')).toBeUndefined();

                expect(element.draggable('option', 'addClasses')).toEqual(true);
                expect(element.draggable('option', 'appendTo')).toEqual('parent');
                expect(element.draggable('option', 'axis')).toEqual(false);
                expect(element.draggable('option', 'cancel')).toEqual('input,textarea,button,select,option');
                expect(element.draggable('option', 'connectToSortable')).toEqual(false);
                expect(element.draggable('option', 'containment')).toEqual(false);
                expect(element.draggable('option', 'cursor')).toEqual('auto');
                expect(element.draggable('option', 'cursorAt')).toEqual(false);
                expect(element.draggable('option', 'delay')).toEqual(0);
                expect(element.draggable('option', 'disabled')).toEqual(false);
                expect(element.draggable('option', 'distance')).toEqual(1);
                expect(element.draggable('option', 'grid')).toEqual(false);
                expect(element.draggable('option', 'handle')).toEqual(false);
                expect(element.draggable('option', 'helper')).toEqual('original');
                expect(element.draggable('option', 'iframeFix')).toEqual(false);
                expect(element.draggable('option', 'opacity')).toEqual(false);
                expect(element.draggable('option', 'refreshPositions')).toEqual(false);
                expect(element.draggable('option', 'revert')).toEqual(false);
                expect(element.draggable('option', 'revertDuration')).toEqual(500);
                expect(element.draggable('option', 'scope')).toEqual('default');
                expect(element.draggable('option', 'scroll')).toEqual(true);
                expect(element.draggable('option', 'scrollSensitivity')).toEqual(20);
                expect(element.draggable('option', 'scrollSpeed')).toEqual(20);
                expect(element.draggable('option', 'snap')).toEqual(false);
                expect(element.draggable('option', 'snapMode')).toEqual('both');
                expect(element.draggable('option', 'snapTolerance')).toEqual(20);
                expect(element.draggable('option', 'stack')).toEqual(false);
                expect(element.draggable('option', 'zIndex')).toEqual(false);
            });
        });

        describe('custom draggable config values', function() {
            init('<div angular-draggable ' +
                    'add-classes="false" ' +
                    'axis="x" ' +
                    'cancel="input" ' +
                    'connect-to-sortable="#123" ' +
                    'containment="parent" ' +
                    'cursor="pointer"' +
                    'cursor-at="{&quot;left&quot;: 5}"' +
                    'delay="50"' +
                    'disabled="true"' +
                    'distance="123"' +
                    'grid="[10, 20]"' +
                    'handle="h123"' +
                    'helper="clone"' +
                    'iframe-fix="true"' +
                    'opacity="0.35"' +
                    'refresh-positions="true"' +
                    'revert="invalid"' +
                    'revert-duration="100"' +
                    'scope="tasks"' +
                    'scroll="false"' +
                    'scroll-sensitivity="10"' +
                    'scroll-speed="10"' +
                    'snap="true"' +
                    'snap-mode="inner"' +
                    'snap-tolerance="10"' +
                    'stack=".products"' +
                    'z-index="123"' +
                '></div>');

            it('should load the jquery-ui draggable plugin ' +
                'and apply it to the element using the default options', function() {
                expect(element).not.toHaveClass('ui-draggable');

                expect(element.draggable('option', 'addClasses')).toEqual(false);
                expect(element.draggable('option', 'appendTo')).toEqual('parent');
                expect(element.draggable('option', 'axis')).toEqual('x');
                expect(element.draggable('option', 'cancel')).toEqual('input');
                expect(element.draggable('option', 'connectToSortable')).toEqual('#123');
                expect(element.draggable('option', 'containment')).toEqual('parent');
                expect(element.draggable('option', 'cursor')).toEqual('pointer');
                expect(element.draggable('option', 'cursorAt')).toEqual({left: 5});
                expect(element.draggable('option', 'delay')).toEqual(50);
                expect(element.draggable('option', 'disabled')).toEqual(true);
                expect(element.draggable('option', 'distance')).toEqual(123);
                expect(element.draggable('option', 'grid')).toEqual([10, 20]);
                expect(element.draggable('option', 'handle')).toEqual('h123');
                expect(element.draggable('option', 'helper')).toEqual('clone');
                expect(element.draggable('option', 'iframeFix')).toEqual(true);
                expect(element.draggable('option', 'opacity')).toEqual(0.35);
                expect(element.draggable('option', 'refreshPositions')).toEqual(true);
                expect(element.draggable('option', 'revert')).toEqual('invalid');
                expect(element.draggable('option', 'revertDuration')).toEqual(100);
                expect(element.draggable('option', 'scope')).toEqual('tasks');
                expect(element.draggable('option', 'scroll')).toEqual(false);
                expect(element.draggable('option', 'scrollSensitivity')).toEqual(10);
                expect(element.draggable('option', 'scrollSpeed')).toEqual(10);
                expect(element.draggable('option', 'snap')).toEqual(true);
                expect(element.draggable('option', 'snapMode')).toEqual('inner');
                expect(element.draggable('option', 'snapTolerance')).toEqual(10);
                expect(element.draggable('option', 'stack')).toEqual('.products');
                expect(element.draggable('option', 'zIndex')).toEqual(123);
            });
        });

        describe('data', function() {
            init('<div angular-draggable draggable-data="data.stuff()"></div>');

            it('should allow setting custom data from the scope', function() {
                expect(element.data('angular-draggable')).toEqual('asd');
            });

        });

    });

});