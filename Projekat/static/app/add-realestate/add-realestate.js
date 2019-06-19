(function (angular) {
    var app = angular.module('myApp');
    app.controller('realestateCreateCtrl', ['loginService', '$state', '$http', '$window', function(loginService, $state, $http, $window) {
        var that = this;

        that.loggedInUser = {};
        that.id;

        that.novi = {
            "title": "",
            "location": "",
            "price": "",
            "other_info": "",
            "image_src": "",
            "user_id": 0
        };

        that.appendRealestate = function () {
            that.novi["user_id"] = that.loggedInUser.id;
            $http.post("/realestate", that.novi).then(function (response) {
                if (response.data["status"] == "done") {
                    alert("You have succesfully created your real estate");
                    $state.go('home');
                }
            },function (reason) {
                console.log(reason);
            });
        }

        loginService.getLoggedIn(function (user) {
            that.loggedInUser = user;
            console.log(that.loggedInUser.id);
            that.novi.user_id = user.id;
        }, function (errorReason) {
            console.log(errorReason);
        });

        console.log("user id: " + that.novi.user_id);

    }]);

})(angular);