(function (angular) {
    var app = angular.module("myApp");
    app.controller("NekretnineCtrl", ['loginService', '$http', '$window', function (loginService, $http, $window) {
        var ln = this;

        ln.nekretnine= [];
        ln.pretragaNekretninaPoNaslovu = [];     


        ln.pretragaBool = false;
        ln.trazeno;

      

        ln.zaIzmenu = {};

        ln.nekretnina = {};
        ln.korisnik = {};

        ln.loggedInUser = {};
        ln.admin = false;

        ln.trazi = function() {
            ln.pretragaBool = true;
        }
    

        ln.dobaviNekretnine = function() {
            $http.get("/realestate").then(function(response) {
                ln.nekretnine = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }



        ln.dobaviNekretninu = function(id) {
            $http.get("/realestate/"+id).then(function(response){
                ln.nekretnina = response.data;
            },
            function(reason){
                console.log(reason);
            });
        };

        ln.dobaviNekretninuPoNaslovu = function(title) {
            $http.get("/realestate/"+title).then(function(response) {
                ln.pretragaNekretninaPoNaslovu = response.data;
            },
            function(reason) {
                console.log(reason);
            });
        };

        ln.dobaviKorisnika = function(id) {
            $http.get("/users/"+id).then(function(response) {
                ln.korisnik = response.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        ln.ukloni = function(id) {
            $http.delete("/realestate/"+id).then(function(response){
                ln.dobaviNekretnine();
            },
            function(reason){
                console.log(reason)
            });
        };

        ln.pripremiZaIzmenu = function(nekretnina) {
            ln.zaIzmenu = angular.copy(nekretnina);
        }

        ln.odustaniOdIzmene = function() {
            ln.zaIzmenu = {};
        }

        ln.izmeniNekretninu = function() {
            $http.put("/realestate/"+ln.zaIzmenu.id, ln.zaIzmenu).then(function(response){
                ln.dobaviNekretnine();
                ln.zaIzmenu = {};
            },
            function(reason){
                console.log(reason)
            });
        }

        ln.dobaviNekretnine();

        loginService.getLoggedIn(function (user) {
            ln.loggedInUser = user;
            console.log(ln.loggedInUser.id + "   " + typeof(ln.loggedInUser.id));
        }, function (errorReason) {
            console.log(errorReason);
        });

        loginService.checkAdmin(function() {
            ln.admin = true;
            console.log("Ulogovan je admin");
        }, function() {
            ln.admin = false;
        }); 
            
            
                

    }]);
})(angular);