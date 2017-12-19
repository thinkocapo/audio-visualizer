app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'assets/js/home/home.html',
        controller: 'homeCtrl'
    });
});