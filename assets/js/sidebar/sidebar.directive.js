app.directive('sidebar', function ($state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'assets/js/sidebar/sidebar.html',
        link: function (scope) {
            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Contact', state: 'contact' }
            ];

        }

    };

});