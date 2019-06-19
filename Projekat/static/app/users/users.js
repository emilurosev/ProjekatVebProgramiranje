(function (angular) {
    var app = angular.module('myApp');
    app.controller('userCtrl', ['loginService', '$http', function(loginService, $http) {
        uc = this;

        uc.korisnici = [];
        uc.loggedInUser = {};
        var id;

        uc.dobaviKorisnike = function() {
            $http.get('/users').then(function(response) {
                uc.korisnici = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        uc.izbrisiKorisnika = function(id) {
            $http.delete('/users/'+id).then(function(response) {
                uc.dobaviKorisnike();
            }), function(reason) {
                console.log('reason');
            }
        }

        loginService.getLoggedIn(function (user) {
            uc.loggedInUser = user;
            console.log(uc.loggedInUser.id);
            id = uc.loggedInUser.id;
        }, function (errorReason) {
            console.log(errorReason);
        });
        console.log(id+' van fje')
        uc.dobaviKorisnike();

    }]);
})(angular);