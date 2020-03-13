var app = angular.module("exam101", []);
// --------------------------------------------------------------
// --------------------------------------------------------------
app.controller("PhoneBookController", function($scope, $http){
    $scope.title = "Phone Book";
    $scope.phoneBooks = [];
    $scope.url = "http://localhost:3000/api/phone/";
    $scope.phoneForFind = "1-908-512-2222";
    
    $scope.result = "";
    // --------------------------------------------------------------
    $scope.init = function(){
        let url = $scope.url;
        $http.get(url)
        .then(function(response){
            $scope.phoneBooks = response.data;
        })
        .catch(function(error){
            console.log("Error : ", error);
        });
    }
    // --------------------------------------------------------------
    $scope.findByPhone = function(){
        let url = $scope.url+$scope.phoneForFind;

        $http.get(url)
        .then(function(response){
            $scope.result = response.data;
        })
        .catch(function(err){
            console.log(err);
        });
    }
    // --------------------------------------------------------------
    $scope.setToFind = function(phoneNo){
        $scope.phoneForFind = phoneNo;
    }
    // --------------------------------------------------------------
});
// --------------------------------------------------------------
// --------------------------------------------------------------
app.controller("StringEncoderController", function($scope, $http){
    $scope.title="String Encoder";
    $scope.url = "http://localhost:3000/api/string-decoder/";

    $scope.data = "WUBWEWUBAREWUBWUBTHEWUB BACKYARD WUBMYWUBFRIENDWUB";
    $scope.keyword = "WUB";

    $scope.result = "";
    // --------------------------------------------------------------
    $scope.resolveEncoder = function(){
        let url = $scope.url+$scope.data+"/"+$scope.keyword;
        $http.get(url)
        .then(function(response){
            $scope.result = response.data;
        }).catch(function(err){
            console.log(err);
        });
    }
    // --------------------------------------------------------------
});
