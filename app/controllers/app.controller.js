angular.module('app').controller('appCtrl', ['$scope', '$http', function ($scope, $http) {

    console.log('App Controller Init!');
    $scope.comments = [];

    $scope.init = function() {
        var root = 'https://jsonplaceholder.typicode.com';
        root = "../json";

        $http.get(root + '/posts.json').then(function (response) {

            console.log(response.data);
            $scope.comments = response.data;

        });
    };

    $scope.init();

}]);