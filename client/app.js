var modalInstance = {};
var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);

var userId = "59b299729751dd27889de49c";

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
    	templateUrl : 'views/homepage.html'
    })
    .when('/homepage', {
    	templateUrl : 'views/homepage.html'
    })
    .when('/profile', {
    	templateUrl : 'views/profile.html'
    })
    .when("/resultsRestroom", {
        templateUrl : "views/resultsRestroom.html"
    })
    .when('/restroom', {
    	templateUrl : "views/restroom.html" 
    })
    .when('/rankings', {
    	templateUrl : "views/rankings.html" 
    })
    .when('/pooping', {
    	templateUrl : "views/poopingPage.html" 
    })
});


app.controller('homepage', ['$scope', '$http', '$interval', '$window', '$location', function($scope, $http, $interval, $window, $location){
	$scope.init = function(){
	}

	$scope.openResults = function(){
		$location.path('/resultsRestroom');
	}
}]);

app.controller('profile', ['$scope', '$http', '$interval', '$window', '$location', function($scope, $http, $interval, $window, $location){
	$scope.users = [];
	$scope.user;
	$scope.username;
	$scope.trophys;
	$scope.avatar;
	$scope.totalRates;
	$scope.totalPoops;
	$scope.totalComments;

	$scope.init = function(){
		$scope.getUserData();
	}

	$scope.getUserData = function(){
		console.log("DADOS");	
		$http({
	        method : "GET",
	        url : "api/users/" + userId
	    }).then(function success(response) {
	        $scope.user = response.data;
	    }, function error(response) {
	        console.log(response);
	    });
	}
}]);

app.controller('restroom', ['$scope', '$http', '$interval', '$window', '$location', '$routeParams', function($scope, $http, $interval, $window, $location, $routeParams){
	var reference;
	$scope.restroom;
	$scope.urlPicture;
	$scope.restroomId;
	$scope.rateClicked = false;
	$scope.poopImage = []
	$scope.poopImage[0] = "assets/poop-rank-outline.png";
	$scope.poopImage[1] = "assets/poop-rank-outline.png";
	$scope.poopImage[2] = "assets/poop-rank-outline.png";
	$scope.poopImage[3] = "assets/poop-rank-outline.png";
	$scope.poopImage[4] = "assets/poop-rank-outline.png";

	$scope.restroomRate = 0;

	$scope.restroomTotalRates = 0;

	$scope.badgesConfort = 0;
	$scope.badgesClean = 0;
	$scope.badgesPrivacy = 0;

	$scope.imgClean = "";
	$scope.imgConf = "";
	$scope.imgPrivacy = "";

	$scope.userClean = "assets/CNW.png";
	$scope.userConf = "assets/CFNW.png";
	$scope.userPrivacy = "assets/PNW.png";

	$scope.init = function(){
		$scope.getRestroomId();
		$scope.getRestroomData();
		$scope.getRating();
		$scope.getBadges();
	}

	$scope.getRestroomId = function(){
		$scope.restroomId = $routeParams.id;
	}

	$scope.getRestroomData = function(){
		console.log("DADOS");	
		$http({
	        method : "GET",
	        url : "api/restrooms?id=" + $scope.restroomId
	    }).then(function success(response) {
	        $scope.restroom = response.data[0];
	        $scope.getPicture();
	        console.log($scope.restroom);
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getRating = function(){
		$http({
	        method : "GET",
	        url : "api/ratings"
	    }).then(function success(response) {
	    	var i;
	    	var totalRates = 0;
	    	var scoreRate = 0;
	    	for(i = 0; i < response.data.length; i++){
	    		if(response.data[i].idRestroom == $scope.restroom._id){
	    			totalRates++;
	    			scoreRate += response.data[i].rate;
	    		}
	    	}
	    	$scope.restroomTotalRates = totalRates;
	    	if(totalRates == 0){
	    		$scope.restroomRate = "Sem classificação";
	    	}
	    	else{
	    		$scope.restroomRate = (scoreRate/totalRates).toFixed(1) + " / 5";
	    	}
	    	

	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getBadges = function(){
		$http({
	        method : "GET",
	        url : "api/restroomBadges"
	    }).then(function success(response) {
	    	var i;
	    	var totalBadges = 0;

	    	for(i = 0; i < response.data.length; i++){
	    		if(response.data[i].idRestroom == $scope.restroom._id){
	    			if(response.data[i].idUser == userId){
	    				if(response.data[i].badge == 1){
							$scope.userPrivacy = "assets/PN.png";
	    				}

	    				if(response.data[i].badge == 2){
	    					$scope.userConf = "assets/CFN.png";
	    				}

	    				if(response.data[i].badge == 3){
	    					$scope.userClean = "assets/CN.png";
	    				}
	    			}
	    			if(response.data[i].badge == 1){
						$scope.badgesPrivacy++;
						$scope.imgPrivacy = "assets/PB.png";
						console.log("Privacidade");
	    			}
	    			else if(response.data[i].badge == 2){
	    				$scope.badgesConfort++;
	    				$scope.imgConfort = "assets/CFB.png";
						console.log("Conf");
	    			}
	    			else if(response.data[i].badge == 3){
						$scope.badgesClean++;
						$scope.imgClean = "assets/CB.png";
						console.log("Clean");
	    			}
	    		}

	    	}
	    	$scope.restroomTotalBadges = totalBadges;
	    	
	    	

	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.papel = function(){
		$http({
	        method : "POST",
	        url : "http://192.168.1.60/motor"
	    }).then(function success(response) {
	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getPicture = function(){
		
		$scope.urlPicture = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + $scope.restroom.reference + "&maxwidth=600&key=AIzaSyCsJDMTK8gKOOolnFwyj1llufkgtWRNDk0"
	}

	$scope.giveBadge = function(badge){
		$http({
	        method : "POST",
	        url : "api/restroomBadges",
	        data: {
	        	"idUser" : userId,
	        	"idRestroom" : $scope.restroom._id,
	        	"badge" : badge

	        }
	    }).then(function success(response) { 
	    	
	    	$scope.getBadges();
	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.rate = function(rate){
		console.log(userId);
		console.log($scope.restroom._id)
		$http({
	        method : "POST",
	        url : "api/ratings",
	        data: {
	        	"idUser" : userId,
	        	"idRestroom" : $scope.restroom._id,
	        	"rate" : rate

	        }
	    }).then(function success(response) { 
	    	var i;
	    	for(i = 0; i < rate; i++){
	    		$scope.poopImage[i] = "assets/poop-rank.png";
	    	}
	    	for(i = rate; i < 5; i++){
	    		$scope.poopImage[i] = "assets/poop-rank-outline.png";
	    	}
	    	$scope.getRating();
	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
	}
}]);


app.controller('resultsRestroom', ['$scope', '$http', '$interval', '$window', '$location', function($scope, $http, $interval, $window, $location){
	$scope.allRestrooms = [];
	$scope.nearRestrooms = [];
	$scope.init = function(){
		$scope.getAllPlaces();
	}

	$scope.getAllPlaces = function(){
		$http({
	        method : "GET",
	        url : "api/restrooms"
	    }).then(function success(response) {
	        $scope.allRestrooms = response.data;
	        $scope.getPlaces();
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getRating = function(internalId, index){
		console.log("GET RATED");
		$http({
	        method : "GET",
	        url : "api/ratings"
	    }).then(function success(response) {
	    	var i;
	    	var totalRates = 0;
	    	var scoreRate = 0;
	    	var score;
	    	for(i = 0; i < response.data.length; i++){
	    		if(response.data[i].idRestroom == internalId){
	    			totalRates++;
	    			scoreRate += response.data[i].rate;
	    		}
	    	}
	    	
	    	if(totalRates == 0){
	    		$scope.restroomRate = "Sem classificação";
	    		$scope.nearRestrooms[index].score = "WHAT";
	    	}
	    	else{
	    		$scope.nearRestrooms[index].score = (scoreRate/totalRates).toFixed(0);
	    	}   
	    	$scope.nearRestrooms[index].imgPoop = [];
	    	for(i = 0; i < $scope.nearRestrooms[index].score; i++){
	    		$scope.nearRestrooms[index].imgPoop[i] = "assets/poop-rank.png";
	    	}
	    	for(i = $scope.nearRestrooms[index].score; i < 5; i++){
	    		$scope.nearRestrooms[index].imgPoop[i] = "assets/poop-rank-outline.png";
	    	}
	    	 

	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getInternalId = function(id, index){
		$http({
	        method : "GET",
	        url : "api/restrooms/?id=" + id
	    }).then(function success(response) {
	        var internalId = response.data[0]._id;
	        $scope.getRating(internalId, index);
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getPlaces = function(){
		var actualLocation = new google.maps.LatLng(41.1500879,-8.6042214);
        service = new google.maps.places.PlacesService(document.getElementById("conteudo"));
        var request = {
            location: actualLocation,
            radius: '20000',
            type: ['park']
        };
        service.nearbySearch(request, callback);

	}

	function callback(results, status) {
        var i = 0;
        var maxResults = 5;
        if(results.length < 5){
        	maxResults = results.length;
        }
        for(i = 0; i < maxResults; i++){
        	console.log("Resultados API!");
        	console.log(results[i].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500}));
        	checkIfExists(results[i]);

       		$scope.nearRestrooms.push(results[i]);
        }
        console.log("NEAR");
        console.log($scope.nearRestrooms);
        $scope.$apply();
    }

    function checkIfExists(restroom){
    	
    	var i;
    	console.log(restroom);
    	for(i = 0; i < $scope.allRestrooms.length; i++){
    		if($scope.allRestrooms[i].id == restroom.id)
    			return;
    	}
    	$scope.createRestroom(restroom);
    }

    $scope.createRestroom = function(restroom){
    	console.log("RESTROOM to add");
    	console.log(restroom)
    	$http({
	        method : "POST",
	        url : "api/restrooms",
	        data: {
	        	"id": restroom.id,
	        	"place_id" : restroom.place_id,
	        	"name" : restroom.name,
	        	"rating" : 0,
	        	"totalPoops": 0,
	        	"totalComments": 0,
	        	"totalRates": 0,
	        	"totalFavorites": 0,
	        	"reference": restroom.reference,
	        	"address": restroom.vicinity,
	        	"photoUrl" : restroom.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500})

	        }
	    }).then(function success(response) {  
	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
    }

    $scope.openRestroom = function(place){
    	$location.path('/restroom').search({id: place.id});;
    }
    
}]);