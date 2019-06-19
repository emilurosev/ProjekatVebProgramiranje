(function(angular) {
    var app = angular.module('myApp', ['ui.router', "loginService"]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('app', {
            abstract: true,
            views: {
                navbar: {
                    templateUrl: 'app/navbar/navbar.tpl.html',
                    controller: 'NavbarCtrl',
                    controllerAs: 'nb'
                },
                '': {
                    template: '<ui-view name=""></ui-view>'
                }
            }
        })
        $stateProvider.state('login', {
            parent: 'app',
            url: '/login',
            templateUrl: 'app/login/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'lc'
    
        }).state('realestates', {
            parent: 'app',
            url: '/realestates',
            templateUrl: 'app/realestates/realestates.tpl.html',
            controller: 'NekretnineCtrl',
            controllerAs: 'ln'
           
        }).state('home', {
            parent: 'app',
            url: '/',
            templateUrl: 'app/home-page/home-page.tpl.html',
            controller: 'HomeCtrl',
            controllerAs: 'hpc'
        }).state('register', {
            parent: 'app',
            url: '/register',
            templateUrl: 'app/signup/register.html',
            controller: 'RegCtrl',
            controllerAs: 'rc'
        }).state('addRealestate', {
            parent: 'app',
            url: '/addRealestate',
            templateUrl: 'app/add-realestate/add-realestate.tpl.html',
            controller: 'realestateCreateCtrl',
            controllerAs: 'ar'
        }).state('profile', {
            parent: 'app',
            url: '/profile',
            templateUrl: 'app/profile/profile.tpl.html',
            controller: 'UserProfileCtrl',
            controllerAs: 'up'
        }).state('showUsers', {
            parent: 'app',
            url: '/showUsers',
            templateUrl: 'app/users/users.tpl.html',
            controller: 'userCtrl',
            controllerAs: 'uc'
        })
    }]);

})(angular);