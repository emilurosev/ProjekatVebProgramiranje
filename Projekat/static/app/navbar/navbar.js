(function (angular) {
    var app = angular.module('myApp');
    app.controller('NavbarCtrl', ['loginService', '$state', '$scope', '$window', function(loginService, $state, $scope, $window) {
        var that = this;
        that.loggedIn = false;
        that.loggedInUser = {};
        that.adminLogged = false;

        var onLogin = function() {
            that.loggedIn = true;
        }

        var onLogout = function() {
            that.loggedIn = false;
        }

        loginService.addLoginListener($scope, onLogin);
        loginService.addLogoutListener($scope, onLogout);

        that.logout = function () {
            loginService.logout(function () {
                that.adminLogged = false;
                alert("You have succesfully logged out");
                $state.go('home');
            }, function () { });
        }

        loginService.isLoggedIn(function () {
            that.loggedIn = true;
        },
            function () {
                that.loggedIn = false;
            });

        loginService.getLoggedIn(function (user) {
            that.loggedInUser = user;
        },
            function (errorReason) {
                console.log(errorReason);
            });

        loginService.checkAdmin(function () {
            that.adminLogged = true;
            console.log("ULOGOVAN JE ADMIN")
        },function () {
            that.adminLogged = false;
        });

    }]);
})(angular);