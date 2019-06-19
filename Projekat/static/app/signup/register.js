(function (angular) {
    var app = angular.module('myApp');
    app.controller('RegCtrl', ['$state', '$http', function ($state, $http) {

        //initializers
        var that = this;

        that.users = [];

        //user registration containers
        that.passwordcheck = "";
        
        //new user container
        that.novi = {
            "username": "",
            "passw": "",
            "first_name": "",
            "last_name": "",
            "email": "",
            "type": "user"
        };

        //-----------------------------------Functions for Registration-------------------------------------------//
        that.checkAvailability = function () {
            for (i = 0; i < that.users.length; i++) {
                if (that.novi.email == that.users[i].email || that.novi.username == that.users[i].username) {
                    alert("This user has already been registered");
                    return false;
                }
            }
            return true;
        }

        that.appendUser = function () {
            if(that.checkAvailability()) {
                $http.post("/users", that.novi).then(function (response) {
                    if (response.data["status"] == "done") {
                        alert("You have succesfully registered")
                        $state.go('login')
                    }
                },
                function (reason) {
                    console.log(reason);
                });

            }
            
        }

        that.passwordMatch = function () {
            if (that.novi.password == that.passwordcheck) {
                return false;
            }
            else {
                return true;
            }
        }


        that.getUsers = function () {
            $http.get("/users").then(function (response) {
                that.users = response.data;
            }, function (reason) {
                console.log(reason);
            });
        }

        that.getUsers();
        console.log(that.users);

    }]);

})(angular);