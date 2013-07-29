angular.module('dragdropSample.controllers', [])
    .controller('DragCtrl', ['$scope', function($scope) {
        $scope.cat = 'Cat Minky';
        $scope.dog = 'Dog Barky';

        $scope.catdog = {
            cat: 'Cat Minky',
            dog: 'Dog Barky'
        };

    }])
    .controller('DropCtrl', ['$scope', function($scope) {
        $scope.cat = '';
        $scope.dog = '';

        $scope.$index = 123; // If $index is set, it is given to the callback

        $scope.catdogHandler = function(data, $index) {
            if(!data) {
                return '';
            }
            console.log($index + ' - ' + JSON.stringify(data));
            return $index + ' - ' + JSON.stringify(data);
        };
    }]);
