# angular-dragdrop

This project contains AngularJS wrapper directives for the jQuery-UI ``draggable``
and ``droppable`` widgets. The full jQuery-UI API is supported via HTML attributes,
so that no additional widget-related programming should be necessary.


## How to use

Include ``angular-dragdrop.js`` in your HTML file or your ``requireJS`` configuration and add
the module as a dependency to your app:
```
angular.app('MyAppName', ['angular.dragdrop']);
```

You will also need to include jQuery and jQuery-UI in order to use the ``draggable`` and ``droppable`` plugins.

## API

For the well-known configuration options, please refer to the original documentation of
[draggable](http://api.jqueryui.com/draggable/) and [droppable](http://api.jqueryui.com/droppable/).
Please note that properties in **camelCase** should be written in **kebab-case** if used as HTML attribute
- e.g. use ``hover-class`` instead of ``hoverClass``.

### API extensions

#### draggable

* **``draggableData``** - lets your specify data from the scope that will be made available on ``drop`` events.
The value expected is an expression that is evaluated using ``$parse``, so that you may specify any property from
the current scope.

 _Example_ - ``draggable-data="cat"`` will store ``$scope.cat`` in ``element.data('angular-draggable'``.

#### droppable

* **``onDrop``** - lets you specify handlers for drop events.

 _Example_ - ``on-drop="handler"`` will
  * write whatever was specified by ``draggableData`` to ``$scope.handler`` if ``handler`` is _not_ a function
  * call ``$scope.handler`` with the ``draggableData`` if it _is_ a function
  * call ``$scope.handler`` with the ``draggableData`` and ``$scope.$index``, if ``$scope.$index`` was defined.
  This allows you to find out which element the draggable data was dropped on.

 _Example_ - ``on-drop="{".a": "handleA", ".b": "handleB"}" lets you specify a mapping of _dragggable classes_
  to _droppable handlers_. For the handlers, the three cases explained above apply. For the rest, this will
 * use ``$scope.handleA`` if a ``draggable`` of class ``a`` is dropped on this ``droppable``
 * use ``$scope.handleB`` if a ``draggable`` of class ``b`` is dropped on this ``droppable``
 * use **both** handlers, if a ``draggable`` of class ``a b`` is dropped on this ``droppable``.

``index.html`` contains a number of examples for these cases and shows how to access ``draggable`` data in
``droppable``s.