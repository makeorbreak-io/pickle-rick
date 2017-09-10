var modalInstance = {};
var app = angular.module('myApp', ['ngRoute', 'ngMaterial','ngMessages']);

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
    .when('/hangGame', {
    	templateUrl : "views/hangGame.html" 
    })
    
});


app.controller('homepage', ['$scope', '$http', '$interval', '$window', '$location', function($scope, $http, $interval, $window, $location){
	$scope.distanceRange;
	$scope.init = function(){
		$scope.distanceRange = 500;
	}

	$scope.openResults = function(){
		$location.path('/resultsRestroom').search({range: $scope.distanceRange});
	}
}]);


app.controller('menu', ['$scope', '$http', '$interval', '$window', '$location', function($scope, $http, $interval, $window, $location){
	$scope.textColor1 = "";
	$scope.textColor2 = "text-primary";
	$scope.textColor3 = "";

	$scope.changeTab1 = function(){
		$scope.textColor2 = "";
		$scope.textColor1 = "text-primary";
		$scope.textColor3 = "";
	}

	$scope.changeTab2 = function(){
		$scope.textColor1 = "";
		$scope.textColor2 = "text-primary";
		$scope.textColor3 = "";
	}

	$scope.changeTab3 = function(){
		$scope.textColor2 = "";
		$scope.textColor3 = "text-primary";
		$scope.textColor1 = "";
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
	        $scope.getNumberOfPoops();
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getNumberOfPoops = function(){
		console.log("DADOS");	
		$http({
	        method : "GET",
	        url : "api/ratings?idUser=" + userId
	    }).then(function success(response) {
	        
	        $scope.numberOfPoops = response.data;
	        console.log($scope.numberOfPoops);
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
		$scope.getComments();
		$scope.getPaper();
	}

	$scope.getPaper = function(){
		console.log("PAPEL PAPEL PAPEL")
		$http({
	        method : "GET",
	        url : "http://192.168.1.60/sensor"
	    }).then(function success(response) {
	        if(response.data.papel == 0){
	        	$scope.toiletPaper = "assets/nopaper.png";
	        }
	        else{
	        	$scope.toiletPaper = "assets/papel.png";
	        }

	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
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
	    		$scope.restroomRate = "N/A";
	    	}
	    	else{
	    		$scope.restroomRate = (scoreRate/totalRates).toFixed(1) + " / 5";
	    	}
	    	if($scope.restroomRate < "1.5" ){
	    		$scope.poopRate = "assets/rate1.png"
	    	}
	    	else if($scope.restroomRate < "2.5"){
	    		$scope.poopRate = "assets/rate2.png"
	    	}
	    	else if($scope.restroomRate < "3.5"){
	    		$scope.poopRate = "assets/rate3.png"
	    	}
	    	else if($scope.restroomRate < "4.5"){
	    		$scope.poopRate = "assets/rate4.png"
	    	}
	    	else if($scope.restroomRate <= "5.1"){
	    		$scope.poopRate = "assets/rate5.png"
	    	}
	    	else{
	    		$scope.poopRate = "assets/ratesleep.png"
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
			$scope.badgesPrivacy = 0;
			$scope.badgesConfort = 0;
			$scope.badgesClean = 0;
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
	    	console.log("Privacy: " + $scope.badgesPrivacy);

	    	console.log("Confort: " + $scope.badgesConfort);

	    	console.log("Clean: " + $scope.badgesClean);
	    	if($scope.badgesPrivacy >= 5 && $scope.badgesPrivacy < 10){
		    		$scope.imgPrivacy = "assets/PP.png";
		    	}
		    	else if($scope.badgesPrivacy >= 10){
		    		$scope.imgPrivacy = "assets/PO.png";
		    	}

		    	if($scope.badgesConfort >= 5 && $scope.badgesConfort < 10){
		    		$scope.imgConfort = "assets/CFP.png";
		    	}
		    	else if($scope.badgesConfort >= 10){
		    		$scope.imgConfort = "assets/CFO.png";
		    	}

		    	if($scope.badgesClean >= 5 && $scope.badgesClean < 10){
		    		$scope.imgClean = "assets/CP.png";
		    	}
		    	else if($scope.badgesClean >= 10){
		    		$scope.imgClean = "assets/CO.png";
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

	$scope.comment = "";
	$scope.leaveComment = function(){
		console.log($scope.comment);
		$http({
	        method : "POST",
	        url : "api/comments",
	        data: {
	        	"idUser" : userId,
	        	"idRestroom" : $scope.restroom._id,
	        	"commentDescription" : $scope.comment,
	        	"nameUser" : "Vasco Ribeiro"

	        }
	    }).then(function success(response) { 
	    	$scope.getComments();
	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
	}
	$scope.allComments = [];

	$scope.getComments = function(){
		console.log("CENAS")
		$http({
	        method : "GET",
	        url : "api/comments"
	    }).then(function success(response) {
	    	var i;
	    	console.log($scope.restroom._id);
	    	for(i = 0; i < response.data.length; i++){
	    		if(response.data[i].idRestroom == $scope.restroom._id){
	    			$scope.allComments.push(response.data[i]);
	    		}
	    	}
	        console.log($scope.allComments);
	    }, function error(response) {
	        console.log(response);
	    });
	}
}]);


app.controller('resultsRestroom', ['$scope', '$http', '$interval', '$window', '$location', '$routeParams', function($scope, $http, $interval, $window, $location, $routeParams){
	$scope.allRestrooms = [];
	$scope.nearRestrooms = [];
	$scope.init = function(){
		$scope.getAllPlaces();
	}
	$scope.noResults = false;
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

	$scope.getInternalId2 = function(id, index){
		$http({
	        method : "GET",
	        url : "api/restrooms/?id=" + id
	    }).then(function success(response) {
	        var internalId = response.data[0]._id;
	        $scope.getBadges(internalId, index);
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.getBadges = function(internalId, index){
		$http({
	        method : "GET",
	        url : "api/restroomBadges"
	    }).then(function success(response) {
	    	var i;
	    	var totalBadges = 0;
	    	$scope.nearRestrooms[index].badgePrivacy = 0;
	    	$scope.nearRestrooms[index].badgeClean = 0;
	    	$scope.nearRestrooms[index].badgeConfort = 0;

	    	for(i = 0; i < response.data.length; i++){
	    		if(response.data[i].idRestroom == internalId){
	    			
	    			if(response.data[i].badge == 1){
	    				$scope.nearRestrooms[index].badgePrivacy++;
	    			}
	    			else if(response.data[i].badge == 2){
	    				$scope.nearRestrooms[index].badgeConfort++;
	    			}
	    			else if(response.data[i].badge == 3){
	    				$scope.nearRestrooms[index].badgeClean++;
	    			}
	    		}
	    	}

	    	if($scope.nearRestrooms[index].badgePrivacy > 0 && $scope.nearRestrooms[index].badgePrivacy < 5){
	    		$scope.nearRestrooms[index].imgBadgePrivacy = "assets/PB.png"
	    	}
	    	else if($scope.nearRestrooms[index].badgePrivacy >= 5 && $scope.nearRestrooms[index].badgePrivacy < 10){
	    		$scope.nearRestrooms[index].imgBadgePrivacy = "assets/PP.png"
	    	}
	    	else if($scope.nearRestrooms[index].badgePrivacy >= 10){
	    		$scope.nearRestrooms[index].imgBadgePrivacy = "assets/PO.png"
	    	}

	    	if($scope.nearRestrooms[index].badgeConfort > 0 && $scope.nearRestrooms[index].badgeConfort < 5){
	    		$scope.nearRestrooms[index].imgBadgeConfort = "assets/CFB.png"
	    	}
	    	else if($scope.nearRestrooms[index].badgeConfort >= 5 && $scope.nearRestrooms[index].badgeConfort < 10){
	    		$scope.nearRestrooms[index].imgBadgeConfort = "assets/CFP.png"
	    	}
	    	else if($scope.nearRestrooms[index].badgeConfort >= 10){
	    		$scope.nearRestrooms[index].imgBadgeConfort = "assets/CFO.png"
	    	}

	    	if($scope.nearRestrooms[index].badgeClean > 0 && $scope.nearRestrooms[index].badgeClean < 5){
	    		$scope.nearRestrooms[index].imgBadgeClean = "assets/CB.png"
	    	}
	    	else if($scope.nearRestrooms[index].badgeClean >= 5 && $scope.nearRestrooms[index].badgeClean < 10){
	    		$scope.nearRestrooms[index].imgBadgeClean = "assets/CP.png"
	    	}
	    	else if($scope.nearRestrooms[index].badgeConfort >= 10){
	    		$scope.nearRestrooms[index].imgBadgeClean = "assets/CO.png"
	    	}
	    	

	    	$scope.restroomTotalBadges = totalBadges;
	    	
	    	

	    }, function error(response) {
	        console.log(response);
	    });
	}


	$scope.getPlaces = function(){
		var distanceRange = $routeParams.range;
		var actualLocation = new google.maps.LatLng(41.1500879,-8.6042214);
        service = new google.maps.places.PlacesService(document.getElementById("conteudo"));
        var request = {
            location: actualLocation,
            radius: distanceRange,
            type: ['restaurant']
        };
        service.nearbySearch(request, callback);

	}

	function callback(results, status) {
        var i = 0;
        var maxResults = 10;
        if(results.length < 10){
        	maxResults = results.length;
        }
        console.log("GOOOOOGLE");
        console.log(results);
        for(i = 0; i < maxResults; i++){
        	console.log("Resultados API!");
        	
        	checkIfExists(results[i]);

       		$scope.nearRestrooms.push(results[i]);
        }
        if($scope.nearRestrooms.length == 0 ){
        	$scope.noResults = true
        }
        else{
        	$scope.noResults = false;
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
    	var restroomPhoto = ""
    	if(restroom.photos){
    		console.log("NAO TEM FOTO");
    		restroomPhoto = restroom.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
    	}
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
	        	"photoUrl" : restroomPhoto

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
    
 
  $scope.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };

  $scope.rating1 = 3;
  $scope.rating2 = 2;
  $scope.rating3 = 4;

  $scope.disabled1 = Math.floor(Math.random() * 100);
  $scope.disabled2 = 0;
  $scope.disabled3 = 70;

  $scope.invert = Math.floor(Math.random() * 100);

  $scope.isDisabled = true;
}]);

app.controller('hangGame', ['$scope', '$http', '$interval', '$window', '$location', function($scope, $http, $interval, $window, $location){
	//1 - rock
	//2 - paper
	//3 - scissor

	$scope.showDraw = false;
	$scope.showWin = false;
	$scope.showLost = false;
	$scope.init = function(){
		
	}
	$scope.computerPlay;

	$scope.play = function(idPlay){
		$scope.showDraw = false;
		$scope.showWin = false;
		$scope.showLost = false;
		$scope.computerPlay = Math.floor((Math.random() * 3) + 1);
		if(idPlay == $scope.computerPlay){
			$scope.showDraw = true;
			if($scope.computerPlay == 1){
				$scope.imgGame = "assets/rock.png";
			}
			else if($scope.computerPlay == 2){
				$scope.imgGame = "assets/paper.png";
			}
			else{
				$scope.imgGame = "assets/scissor.png";
			}
		}
		else if( (idPlay == 1 && $scope.computerPlay == 2) || (idPlay == 2 && $scope.computerPlay == 3) || (idPlay == 3 && $scope.computerPlay == 1) ){
			$scope.showLost = true;
			if($scope.computerPlay == 1){
				$scope.imgGame = "assets/rock.png";
			}
			else if($scope.computerPlay == 2){
				$scope.imgGame = "assets/paper.png";
			}
			else{
				$scope.imgGame = "assets/scissor.png";
			}
			$scope.papelR();
		}
		else{
			if($scope.computerPlay == 1){
				$scope.imgGame = "assets/rock.png";
			}
			else if($scope.computerPlay == 2){
				$scope.imgGame = "assets/paper.png";
			}
			else{
				$scope.imgGame = "assets/scissor.png";
			}
			$scope.showWin = true;
			$scope.papel();
		}
	}

	$scope.papel = function(){
		console.log
		$http({
	        method : "POST",
	        url : "http://192.168.1.60/motor"
	    }).then(function success(response) {
	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
	}

	$scope.papelR = function(){
		console.log
		$http({
	        method : "POST",
	        url : "http://192.168.1.60/motorev"
	    }).then(function success(response) {
	        console.log(response);
	    }, function error(response) {
	        console.log(response);
	    });
	}
}]);
