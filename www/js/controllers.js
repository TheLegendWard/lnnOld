angular.module("lnn.controllers", [])



// TODO: indexCtrl --|-- 
.controller("indexCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;

	// TODO: indexCtrl --|-- $rootScope.exitApp
	$rootScope.exitApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm Exit",
			template: "Are you sure you want to exit?"
		});
		confirmPopup.then(function (close){
			if(close){
				ionic.Platform.exitApp();
			}
			$rootScope.closeMenuPopover();
		});
	};
	
	// TODO: indexCtrl --|-- $rootScope.changeLanguage
	$rootScope.changeLanguage = function(langKey){
		if(typeof langKey !== null){
			$translate.use(langKey);
			tmhDynamicLocale.set(langKey);
			try {
				$rootScope.language_option = langKey;
				localforage.setItem("language_option",langKey);
			}catch(e){
				localforage.setItem("language_option","en-us");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showLanguageDialog
	var modal_language = "";
	modal_language += "<ion-modal-view>";
	modal_language += "<ion-header-bar class=\"bar bar-header bar-assertive-900\">";
	modal_language += "<h1 class=\"title\">{{ 'Language' | translate }}</h1>";
	modal_language += "</ion-header-bar>";
	modal_language += "<ion-content class=\"padding\">";
	modal_language += "<div class=\"list\">";
	modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'en-us'\" ng-click=\"tryChangeLanguage('en-us')\">English - US</ion-radio>";
	modal_language += "<button class=\"button button-full button-assertive-900\" ng-click=\"closeLanguageDialog()\">{{ 'Close' | translate }}</button>";
	modal_language += "</div>";
	modal_language += "</ion-content>";
	modal_language += "</ion-modal-view>";
	
	$rootScope.languageDialog = $ionicModal.fromTemplate(modal_language,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showLanguageDialog = function(){
		$rootScope.languageDialog.show();
		localforage.getItem("language_option", function(err, value){
			$rootScope.language_option = value;
		}).then(function(value){
			$rootScope.language_option = value;
		}).catch(function (err){
			$rootScope.language_option = "en-us";
		})
	};
	
	$rootScope.closeLanguageDialog = function(){
		$rootScope.languageDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	$rootScope.tryChangeLanguage = function(langKey){
		$rootScope.changeLanguage(langKey);
	};
	
	localforage.getItem("language_option", function(err, value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).catch(function (err){
		localforage.setItem("language_option","en-us");
	})
	// TODO: indexCtrl --|-- $rootScope.changeFontSize
	$rootScope.changeFontSize = function(fontSize){
		if(typeof fontSize !== null){
			try {
				$rootScope.fontsize_option = $rootScope.fontsize = fontSize;
				localforage.setItem("fontsize_option",fontSize);
			}catch(e){
				localforage.setItem("fontsize_option","normal");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showFontSizeDialog
	var modal_fontsize = "";
	modal_fontsize += "<ion-modal-view>";
	modal_fontsize += "<ion-header-bar class=\"bar bar-header bar-assertive-900\">";
	modal_fontsize += "<h1 class=\"title\">{{ 'Font Size' | translate }}</h1>";
	modal_fontsize += "</ion-header-bar>";
	modal_fontsize += "<ion-content class=\"padding\">";
	modal_fontsize += "<div class=\"list\">";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'small'\" ng-click=\"tryChangeFontSize('small');\">{{ 'Small' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'normal'\" ng-click=\"tryChangeFontSize('normal');\">{{ 'Normal' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'large'\" ng-click=\"tryChangeFontSize('large');\">{{ 'Large' | translate }}</ion-radio>";
	modal_fontsize += "<button class=\"button button-full button-assertive-900\" ng-click=\"closeFontSizeDialog()\">{{ 'Close' | translate }}</button>";
	modal_fontsize += "</div>";
	modal_fontsize += "</ion-content>";
	modal_fontsize += "</ion-modal-view>";
	
	$rootScope.fontSizeDialog = $ionicModal.fromTemplate(modal_fontsize,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showFontSizeDialog = function(){
		$rootScope.fontSizeDialog.show();
		localforage.getItem("fontsize_option", function(err, value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).then(function(value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).catch(function (err){
			$rootScope.fontsize_option = $rootScope.fontsize = "normal";
		})
	};
	
	$rootScope.closeFontSizeDialog = function(){
		$rootScope.fontSizeDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	localforage.getItem("fontsize_option", function(err, value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).catch(function (err){
		console.log(err);
		localforage.setItem("fontsize_option","normal");
	})
	
	
	$rootScope.tryChangeFontSize = function(val){
		$rootScope.changeFontSize(val);
	};
	
	// TODO: indexCtrl --|-- $rootScope.modal_notification
	var modal_notification = "";
	$rootScope.disable_notification_option = false;
	modal_notification += "<ion-modal-view>";
	modal_notification += "<ion-header-bar class=\"bar bar-header bar-assertive-900\">";
	modal_notification += "<h1 class=\"title\">{{ 'Notifications' | translate }}</h1>";
	modal_notification += "</ion-header-bar>";
	modal_notification += "<ion-content class=\"\">";
	modal_notification += "<div class=\"list\">";
	modal_notification += "<ion-toggle ng-model=\"disable_notification_option\"  ng-click=\"tryChangeNotification(disable_notification_option)\">";
	modal_notification += "{{ 'Disable Alerts' | translate }}";
	modal_notification += "</ion-toggle>";
	modal_notification += "<div class=\"item\">";
	modal_notification += "<button class=\"button button-full button-assertive-900\" ng-click=\"closeNotificationDialog()\">{{ 'Close' | translate }}</button>";
	modal_notification += "</div>";
	modal_notification += "</div>";
	modal_notification += "</ion-content>";
	modal_notification += "</ion-modal-view>";
	
	$rootScope.notificationDialog = $ionicModal.fromTemplate(modal_notification,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showNotificationDialog = function(){
		get_notification();
		$rootScope.notificationDialog.show();
	};
	
	$rootScope.closeNotificationDialog = function(){
		$rootScope.notificationDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	var get_notification =  function(){
		localforage.getItem("disable_notification_option", function(err, value){
			var notification_value = false ;
			if(value === null){
				notification_value = false ;
			}
			if(value === true){
				notification_value = true ;
			}else{
				notification_value = false ;
			}
			localforage.setItem("disable_notification_option",notification_value);
			$rootScope.disable_notification_option = notification_value ;
		}).then(function(value){
			var notification_value = false ;
			if(value === null){
				notification_value = false ;
			}
			if(value === true){
				notification_value = true ;
			}else{
				notification_value = false ;
			}
			localforage.setItem("disable_notification_option",notification_value);
			$rootScope.disable_notification_option = notification_value ;
		}).catch(function (err){
			localforage.setItem("disable_notification_option",false);
			$rootScope.disable_notification_option = false ;
		})
	
	}
	
	get_notification();
	
	
	$rootScope.tryChangeNotification = function(val){
		$rootScope.changeNotification(val);
	};
	
	
	$rootScope.changeNotification = function(val){
		$rootScope.disable_notification_option = val;
		localforage.setItem("disable_notification_option",val);
	};
	
	
	$scope.$watch("disable_notification_option", function (newValue, oldValue, scope) {
		if(window.plugins && window.plugins.OneSignal){
			if(newValue == true){
				window.plugins.OneSignal.setSubscription(false);
			}else{
				window.plugins.OneSignal.setSubscription(true);
			}
		}
	});
	
	// TODO: indexCtrl --|-- $rootScope.clearCacheApp
	$rootScope.clearCacheApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm",
			template: "Are you sure you want to clear cache?"
		});
		confirmPopup.then(function (close){
			if(close){
				localforage.keys().then(function(keys) {
					for(var e = 0; e < keys.length ; e++) {
						localforage.setItem(keys[e],[]);
					}
					$state.go("lnn.home");
				}).catch(function(err) {
					$state.go("lnn.home");
				});
			}
			$rootScope.closeMenuPopover();
		});
	};
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: indexCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: indexCtrl --|-- $scope.openURL
	// open external browser 
	$rootScope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: indexCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$rootScope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done,hardwareback=Done,toolbarposition=top,location=yes");
	
		appBrowser.addEventListener("loadstart",function(){
			navigator.notification.activityStart("Please Wait", "Its loading....");
		});
	
	
		appBrowser.addEventListener("loadstop",function(){
			navigator.notification.activityStop();
		});
	
	
		appBrowser.addEventListener("loaderror",function(){
			navigator.notification.activityStop();
			window.location = "retry.html";
		});
	
	
		appBrowser.addEventListener("exit",function(){
			navigator.notification.activityStop();
		});
	
	};
	
	
	// TODO: indexCtrl --|-- $scope.openWebView
	// open WebView
	$rootScope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no,toolbar=no");
	
		appWebview.addEventListener("loadstart",function(){
			navigator.notification.activityStart("Please Wait", "Its loading....");
		});
	
	
		appWebview.addEventListener("loadstop",function(){
			navigator.notification.activityStop();
		});
	
	
		appWebview.addEventListener("loaderror",function(){
			navigator.notification.activityStop();
			window.location = "retry.html";
		});
	
	
		appWebview.addEventListener("exit",function(){
			navigator.notification.activityStop();
		});
	
	};
	
	
	// TODO: indexCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: indexCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: indexCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `index` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: side_menusCtrl --|-- 
.controller("side_menusCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: side_menusCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: side_menusCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: side_menusCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: side_menusCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `side_menus` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: about_lnnCtrl --|-- 
.controller("about_lnnCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: about_lnnCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: about_lnnCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: about_lnnCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: about_lnnCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `about_lnn` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: about_usCtrl --|-- 
.controller("about_usCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: about_usCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: about_usCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: about_usCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: about_usCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `about_us` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: billboard_singlesCtrl --|-- 
.controller("billboard_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (billboard)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: billboard_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: billboard_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: billboard_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: billboard_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: billboard_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: billboard_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: billboard_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: billboard_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.billboard = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: billboard_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: billboard_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: billboard_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.billboard = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.billboard = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: billboard_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `billboard_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: bookmarksCtrl --|-- 
.controller("bookmarksCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: bookmarksCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: bookmarksCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: bookmarksCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: bookmarksCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `bookmarks` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: dashboard_bookmarkCtrl --|-- 
.controller("dashboard_bookmarkCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: dashboard_bookmarkCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: dashboard_bookmarkCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: dashboard_bookmarkCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: dashboard_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: dashboard_bookmarkCtrl --|-- $scope.loadDbVirtualDashboard
	 
	$scope.loadDbVirtualDashboard = function(){
		$ionicLoading.show();
		//dashboard_bookmark
		$scope.dashboard_bookmark = []; 
		localforage.getItem("dashboard_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.dashboard_bookmark = []; 
			}else{
				try{
					$scope.dashboard_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_dashboard = $scope.dashboard_bookmark.length;
				}catch (e){
					$scope.dashboard_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualDashboard();
	});
	// TODO: dashboard_bookmarkCtrl --|-- $scope.clearDbVirtualDashboard
	$scope.clearDbVirtualDashboard = function(){
					$rootScope.item_in_virtual_table_dashboard = 0;
		localforage.setItem("dashboard_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualDashboard();
		},200);
	};
	// TODO: dashboard_bookmarkCtrl --|-- $scope.removeDbVirtualDashboard
	$scope.removeDbVirtualDashboard = function(itemId){
		var virtual_items = [];
		var last_items = $scope.dashboard_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("dashboard_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualDashboard();
		},200);
	};
	// TODO: dashboard_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: dashboard_bookmarkCtrl --|-- $scope.loadDbVirtualObserver
	 
	$scope.loadDbVirtualObserver = function(){
		$ionicLoading.show();
		//dashboard_bookmark
		$scope.observer_bookmark = []; 
		localforage.getItem("observer_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.observer_bookmark = []; 
			}else{
				try{
					$scope.observer_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_observer = $scope.observer_bookmark.length;
				}catch (e){
					$scope.observer_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualObserver();
	});
	// TODO: dashboard_bookmarkCtrl --|-- $scope.clearDbVirtualObserver
	$scope.clearDbVirtualObserver = function(){
					$rootScope.item_in_virtual_table_observer = 0;
		localforage.setItem("observer_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualObserver();
		},200);
	};
	// TODO: dashboard_bookmarkCtrl --|-- $scope.removeDbVirtualObserver
	$scope.removeDbVirtualObserver = function(itemId){
		var virtual_items = [];
		var last_items = $scope.observer_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("observer_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualObserver();
		},200);
	};
	// TODO: dashboard_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: dashboard_bookmarkCtrl --|-- $scope.loadDbVirtualPost
	 
	$scope.loadDbVirtualPost = function(){
		$ionicLoading.show();
		//dashboard_bookmark
		$scope.post_bookmark = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.post_bookmark = []; 
			}else{
				try{
					$scope.post_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_post = $scope.post_bookmark.length;
				}catch (e){
					$scope.post_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualPost();
	});
	// TODO: dashboard_bookmarkCtrl --|-- $scope.clearDbVirtualPost
	$scope.clearDbVirtualPost = function(){
					$rootScope.item_in_virtual_table_post = 0;
		localforage.setItem("post_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// TODO: dashboard_bookmarkCtrl --|-- $scope.removeDbVirtualPost
	$scope.removeDbVirtualPost = function(itemId){
		var virtual_items = [];
		var last_items = $scope.post_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// code 

	// TODO: dashboard_bookmarkCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `dashboard_bookmark` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: dashboard_singlesCtrl --|-- 
.controller("dashboard_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (post)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: dashboard_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: dashboard_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: dashboard_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: dashboard_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var form = {"uname":"demo","pwd":"demo"};
		$scope.form = {};
		var authPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="form.uname" placeholder="Username"><input type="password" placeholder="Password" ng-model="form.pwd">',
			title: "Authorization",
			subTitle: "Please use username and password",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
				{text:"<strong>Save</strong>",type:"button-positive",onTap:function(e){
						return $scope.form;
					}},
			],
		}).then(function(form){
			if( angular.isDefined(form)){
				var uname = form.uname || "demo";
				var pwd = form.pwd || "demo";
				var http_value = "Basic " + base64.encode(uname + ":" + pwd);
				$http.defaults.headers.common["X-Authorization"] = http_value;
				localforage.setItem("ima_session", JSON.stringify(http_value));
				$scope.doRefresh();
			}
		},function(err){
		},function(msg){
		});
	};
	// TODO: dashboard_singlesCtrl --|-- $scope.addToVirtual(); //data single
	$scope.addToDbVirtual = function(newItem){
		if(typeof newItem.id === "undefined"){
			return false;
		}
		var is_already_exist = false ;
		// animation loading 
		$ionicLoading.show();
		var virtual_items = []; 
		localforage.getItem("dashboard_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				virtual_items = [];
			}else{
				try{
					var last_items = JSON.parse(dbVirtual); 
				}catch(e){
					var last_items = [];
				}
				for(var z=0;z<last_items.length;z++){
					virtual_items.push(last_items[z]);
					if(newItem.id ==  last_items[z].id){
						is_already_exist = true;
					}
				}
			}
		}).then(function(value){
			if(is_already_exist === false){
				newItem["_qty"]=1;
				virtual_items.push(newItem);
			}
			localforage.setItem("dashboard_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_dashboard = virtual_items.length;
			},200);
		}).catch(function(err){
			virtual_items = [];
			virtual_items.push(newItem);
			localforage.setItem("dashboard_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_dashboard = virtual_items.length;
			},200);
		})
	};
	
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: dashboard_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://radioapp.radiolib.us/wp-json/wp/v2/posts/?_embed&categories=12&per_page=12&page=1";
	// TODO: dashboard_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://radioapp.radiolib.us/wp-json/wp/v2/posts/?_embed&categories=12&per_page=12&page=1&callback=JSON_CALLBACK";
	// TODO: dashboard_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_dashboards_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.dashboard = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: dashboard_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: dashboard_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_dashboards_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "Network Error" + " (" + data.status + ")",
						template: "An error occurred while collecting data.",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.dashboard = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: dashboard_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: dashboard_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: dashboard_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_dashboards_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: dashboard_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: dashboard_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_dashboards_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.dashboard = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.dashboard = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: dashboard_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `dashboard_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: faqsCtrl --|-- 
.controller("faqsCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: faqsCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: faqsCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: faqsCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: faqsCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `faqs` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: frontpage_africaCtrl --|-- 
.controller("frontpage_africaCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (frontpage_africa)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: frontpage_africaCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: frontpage_africaCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: frontpage_africaCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: frontpage_africaCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url Frontpage Africa
	targetQuery = "categories=2"; //default param
	raplaceWithQuery = "categories=2";
		
	$scope.first_param = {};
	$scope.first_param.categories = "2";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.frontpage_africaQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.frontpage_africaQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: frontpage_africaCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: frontpage_africaCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=2";
	// TODO: frontpage_africaCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=2&callback=JSON_CALLBACK";
	// TODO: frontpage_africaCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_frontpage_africas = [];
	
	if(data_frontpage_africas === null ){
		data_frontpage_africas =[];
	}
	if(data_frontpage_africas.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: frontpage_africaCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_frontpage_africas = response.data;
				$scope.data_frontpage_africas = response.data;
				$scope.frontpage_africas = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_frontpage_africas[lastPush])){
						$scope.frontpage_africas.push(data_frontpage_africas[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: frontpage_africaCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_frontpage_africas = data;
						$scope.data_frontpage_africas = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.frontpage_africas = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_frontpage_africas[lastPush])){
								$scope.frontpage_africas.push(data_frontpage_africas[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: frontpage_africaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: frontpage_africaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_frontpage_africas.data)){
					if($scope.data_frontpage_africas.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: frontpage_africaCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: frontpage_africaCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_frontpage_africas = response.data;
			$scope.data_frontpage_africas = response.data;
			$scope.frontpage_africas = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_frontpage_africas[lastPush])){
					$scope.frontpage_africas.push(data_frontpage_africas[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: frontpage_africaCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_frontpage_africas = data;
					$scope.data_frontpage_africas = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.frontpage_africas = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_frontpage_africas[lastPush])){
							$scope.frontpage_africas.push(data_frontpage_africas[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: frontpage_africaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: frontpage_africaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_frontpage_africas === null){
		data_frontpage_africas = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_frontpage_africas[lastPush])){
				$scope.frontpage_africas.push(data_frontpage_africas[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: frontpage_africaCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_frontpage_africas);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `frontpage_africa` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: frontpage_africa_singlesCtrl --|-- 
.controller("frontpage_africa_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (frontpage_africa)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: frontpage_africa_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: frontpage_africa_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: frontpage_africa_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: frontpage_africa_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: frontpage_africa_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: frontpage_africa_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: frontpage_africa_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: frontpage_africa_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.frontpage_africa = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: frontpage_africa_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: frontpage_africa_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: frontpage_africa_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.frontpage_africa = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.frontpage_africa = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: frontpage_africa_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `frontpage_africa_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: gnn_liberiaCtrl --|-- 
.controller("gnn_liberiaCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_burh_chicken)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: gnn_liberiaCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: gnn_liberiaCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: gnn_liberiaCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: gnn_liberiaCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url GNN Liberia
	targetQuery = "categories=7"; //default param
	raplaceWithQuery = "categories=7";
		
	$scope.first_param = {};
	$scope.first_param.categories = "7";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.gnn_liberiaQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.gnn_liberiaQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: gnn_liberiaCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=7";
	// TODO: gnn_liberiaCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=7&callback=JSON_CALLBACK";
	// TODO: gnn_liberiaCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_gnn_liberias = [];
	
	if(data_gnn_liberias === null ){
		data_gnn_liberias =[];
	}
	if(data_gnn_liberias.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: gnn_liberiaCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_gnn_liberias = response.data;
				$scope.data_gnn_liberias = response.data;
				$scope.gnn_liberias = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_gnn_liberias[lastPush])){
						$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: gnn_liberiaCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_gnn_liberias = data;
						$scope.data_gnn_liberias = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.gnn_liberias = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_gnn_liberias[lastPush])){
								$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: gnn_liberiaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: gnn_liberiaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_gnn_liberias.data)){
					if($scope.data_gnn_liberias.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: gnn_liberiaCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_gnn_liberias = response.data;
			$scope.data_gnn_liberias = response.data;
			$scope.gnn_liberias = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_gnn_liberias[lastPush])){
					$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: gnn_liberiaCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_gnn_liberias = data;
					$scope.data_gnn_liberias = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.gnn_liberias = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_gnn_liberias[lastPush])){
							$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: gnn_liberiaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: gnn_liberiaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_gnn_liberias === null){
		data_gnn_liberias = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_gnn_liberias[lastPush])){
				$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// TODO: gnn_liberiaCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url GNN Liberia
	targetQuery = "categories=7"; //default param
	raplaceWithQuery = "categories=7";
		
	$scope.first_param = {};
	$scope.first_param.categories = "7";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.gnn_liberiaQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.gnn_liberiaQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}
	
	$scope.first_param = {};
	$scope.first_param.categories = "7";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.gnn_liberiaQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.gnn_liberiaQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: gnn_liberiaCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=7";
	// TODO: gnn_liberiaCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=7&callback=JSON_CALLBACK";
	// TODO: gnn_liberiaCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_the_burh_chickens = [];
	
	if(data_the_burh_chickens === null ){
		data_the_burh_chickens =[];
	}
	if(data_the_burh_chickens.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: gnn_liberiaCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_the_burh_chickens = response.data;
				$scope.data_the_burh_chickens = response.data;
				$scope.the_burh_chickens = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_the_burh_chickens[lastPush])){
						$scope.the_burh_chickens.push(data_the_burh_chickens[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: gnn_liberiaCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_the_burh_chickens = data;
						$scope.data_the_burh_chickens = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.the_burh_chickens = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_the_burh_chickens[lastPush])){
								$scope.the_burh_chickens.push(data_the_burh_chickens[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: gnn_liberiaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: gnn_liberiaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_the_burh_chickens.data)){
					if($scope.data_the_burh_chickens.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: gnn_liberiaCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_the_burh_chickens = response.data;
			$scope.data_the_burh_chickens = response.data;
			$scope.the_burh_chickens = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_the_burh_chickens[lastPush])){
					$scope.the_burh_chickens.push(data_the_burh_chickens[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: gnn_liberiaCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_the_burh_chickens = data;
					$scope.data_the_burh_chickens = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.the_burh_chickens = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_the_burh_chickens[lastPush])){
							$scope.the_burh_chickens.push(data_the_burh_chickens[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: gnn_liberiaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: gnn_liberiaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_the_burh_chickens === null){
		data_the_burh_chickens = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_the_burh_chickens[lastPush])){
				$scope.the_burh_chickens.push(data_the_burh_chickens[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: gnn_liberiaCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_the_burh_chickens);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `gnn_liberia` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: gnn_liberia_singlesCtrl --|-- 
.controller("gnn_liberia_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (gnn_liberia)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: gnn_liberia_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.gnn_liberia = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: gnn_liberia_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: gnn_liberia_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: gnn_liberia_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.gnn_liberia = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.gnn_liberia = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: gnn_liberia_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `gnn_liberia_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: homeCtrl --|-- 
.controller("homeCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	// TODO: homeCtrl --|-- showBanner
	if (typeof admob !== "undefined"){
		try{
			admob.banner.show();
		}catch(err){ 
			//alert(err.message);
		}
	}
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: homeCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: homeCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: homeCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: homeCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `home` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: linaCtrl --|-- 
.controller("linaCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (lina)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: linaCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: linaCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: linaCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: linaCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url LINA
	targetQuery = "categories=11"; //default param
	raplaceWithQuery = "categories=11";
		
	$scope.first_param = {};
	$scope.first_param.categories = "11";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.linaQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.linaQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: linaCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: linaCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=11";
	// TODO: linaCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=11&callback=JSON_CALLBACK";
	// TODO: linaCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_linas = [];
	
	if(data_linas === null ){
		data_linas =[];
	}
	if(data_linas.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: linaCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_linas = response.data;
				$scope.data_linas = response.data;
				$scope.linas = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_linas[lastPush])){
						$scope.linas.push(data_linas[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: linaCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_linas = data;
						$scope.data_linas = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.linas = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_linas[lastPush])){
								$scope.linas.push(data_linas[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: linaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: linaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_linas.data)){
					if($scope.data_linas.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: linaCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: linaCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_linas = response.data;
			$scope.data_linas = response.data;
			$scope.linas = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_linas[lastPush])){
					$scope.linas.push(data_linas[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: linaCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_linas = data;
					$scope.data_linas = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.linas = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_linas[lastPush])){
							$scope.linas.push(data_linas[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: linaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: linaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_linas === null){
		data_linas = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_linas[lastPush])){
				$scope.linas.push(data_linas[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: linaCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_linas);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `lina` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: lina_singlesCtrl --|-- 
.controller("lina_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (lina)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: lina_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: lina_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: lina_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: lina_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: lina_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: lina_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: lina_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: lina_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.lina = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: lina_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: lina_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: lina_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.lina = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.lina = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: lina_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `lina_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: lnn_postsCtrl --|-- 
.controller("lnn_postsCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (post)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: lnn_postsCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: lnn_postsCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: lnn_postsCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: lnn_postsCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url LNN Posts
	targetQuery = "categories=2"; //default param
	raplaceWithQuery = "categories=2";
		
	$scope.first_param = {};
	$scope.first_param.categories = "2";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.lnn_postsQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.lnn_postsQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: lnn_postsCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	// TODO: lnn_postsCtrl --|-- $scope.addToVirtual
	$scope.addToDbVirtual = function(newItem){
		var is_already_exist = false ;
		// animation loading 
		$ionicLoading.show();
		var virtual_items = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				virtual_items = [];
			}else{
				try{
					var last_items = JSON.parse(dbVirtual); 
				}catch(e){
					var last_items = [];
				}
				for(var z=0;z<last_items.length;z++){
					virtual_items.push(last_items[z]);
					if(newItem.categories ==  last_items[z].categories){
						is_already_exist = true;
					}
				}
			}
		}).then(function(value){
			if(is_already_exist === false){
				newItem["_qty"]=1;
				virtual_items.push(newItem);
			}
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			virtual_items = [];
			virtual_items.push(newItem);
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		})
	};
	
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: lnn_postsCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=2";
	// TODO: lnn_postsCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=2&callback=JSON_CALLBACK";
	// TODO: lnn_postsCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_posts = [];
	
	if(data_posts === null ){
		data_posts =[];
	}
	if(data_posts.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: lnn_postsCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_posts = response.data;
				$scope.data_posts = response.data;
				$scope.posts = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_posts[lastPush])){
						$scope.posts.push(data_posts[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: lnn_postsCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_posts = data;
						$scope.data_posts = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.posts = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_posts[lastPush])){
								$scope.posts.push(data_posts[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: lnn_postsCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: lnn_postsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_posts.data)){
					if($scope.data_posts.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: lnn_postsCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: lnn_postsCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_posts = response.data;
			$scope.data_posts = response.data;
			$scope.posts = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_posts[lastPush])){
					$scope.posts.push(data_posts[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: lnn_postsCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_posts = data;
					$scope.data_posts = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.posts = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_posts[lastPush])){
							$scope.posts.push(data_posts[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: lnn_postsCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: lnn_postsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_posts === null){
		data_posts = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_posts[lastPush])){
				$scope.posts.push(data_posts[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: lnn_postsCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_posts);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `lnn_posts` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: menu_oneCtrl --|-- 
.controller("menu_oneCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: menu_oneCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: menu_oneCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: menu_oneCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: menu_oneCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `menu_one` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: menu_twoCtrl --|-- 
.controller("menu_twoCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: menu_twoCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: menu_twoCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: menu_twoCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: menu_twoCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `menu_two` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: myCtrl --|-- 
.controller("myCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (postt)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: myCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: myCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: myCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: myCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_postts);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `my` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: news_sourcesCtrl --|-- 
.controller("news_sourcesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (lnn_categories)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: news_sourcesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: news_sourcesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: news_sourcesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: news_sourcesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url  
	targetQuery = "exclude=1"; //default param
	raplaceWithQuery = "exclude=1";
	
	
	// TODO: news_sourcesCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: news_sourcesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/categories?exclude=1";
	// TODO: news_sourcesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/categories?exclude=1&callback=JSON_CALLBACK";
	// TODO: news_sourcesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_lnn_categoriess = [];
	
	if(data_lnn_categoriess === null ){
		data_lnn_categoriess =[];
	}
	if(data_lnn_categoriess.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: news_sourcesCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_lnn_categoriess = response.data;
				$scope.data_lnn_categoriess = response.data;
				$scope.lnn_categoriess = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_lnn_categoriess[lastPush])){
						$scope.lnn_categoriess.push(data_lnn_categoriess[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: news_sourcesCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_lnn_categoriess = data;
						$scope.data_lnn_categoriess = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.lnn_categoriess = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_lnn_categoriess[lastPush])){
								$scope.lnn_categoriess.push(data_lnn_categoriess[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: news_sourcesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: news_sourcesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_lnn_categoriess.data)){
					if($scope.data_lnn_categoriess.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: news_sourcesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: news_sourcesCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_lnn_categoriess = response.data;
			$scope.data_lnn_categoriess = response.data;
			$scope.lnn_categoriess = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_lnn_categoriess[lastPush])){
					$scope.lnn_categoriess.push(data_lnn_categoriess[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: news_sourcesCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_lnn_categoriess = data;
					$scope.data_lnn_categoriess = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.lnn_categoriess = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_lnn_categoriess[lastPush])){
							$scope.lnn_categoriess.push(data_lnn_categoriess[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: news_sourcesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: news_sourcesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_lnn_categoriess === null){
		data_lnn_categoriess = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_lnn_categoriess[lastPush])){
				$scope.lnn_categoriess.push(data_lnn_categoriess[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: news_sourcesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_lnn_categoriess);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `news_sources` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: observerCtrl --|-- 
.controller("observerCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (observer)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: observerCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: observerCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: observerCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: observerCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url Observer
	targetQuery = "categories=3"; //default param
	raplaceWithQuery = "categories=3";
	
	
	// TODO: observerCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	// TODO: observerCtrl --|-- $scope.addToVirtual
	$scope.addToDbVirtual = function(newItem){
		var is_already_exist = false ;
		// animation loading 
		$ionicLoading.show();
		var virtual_items = []; 
		localforage.getItem("observer_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				virtual_items = [];
			}else{
				try{
					var last_items = JSON.parse(dbVirtual); 
				}catch(e){
					var last_items = [];
				}
				for(var z=0;z<last_items.length;z++){
					virtual_items.push(last_items[z]);
					if(newItem.id ==  last_items[z].id){
						is_already_exist = true;
					}
				}
			}
		}).then(function(value){
			if(is_already_exist === false){
				newItem["_qty"]=1;
				virtual_items.push(newItem);
			}
			localforage.setItem("observer_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			virtual_items = [];
			virtual_items.push(newItem);
			localforage.setItem("observer_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		})
	};
	
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: observerCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=3";
	// TODO: observerCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=3&callback=JSON_CALLBACK";
	// TODO: observerCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_observers = [];
	
	if(data_observers === null ){
		data_observers =[];
	}
	if(data_observers.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: observerCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_observers = response.data;
				$scope.data_observers = response.data;
				$scope.observers = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_observers[lastPush])){
						$scope.observers.push(data_observers[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: observerCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_observers = data;
						$scope.data_observers = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.observers = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_observers[lastPush])){
								$scope.observers.push(data_observers[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: observerCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: observerCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_observers.data)){
					if($scope.data_observers.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: observerCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: observerCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_observers = response.data;
			$scope.data_observers = response.data;
			$scope.observers = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_observers[lastPush])){
					$scope.observers.push(data_observers[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: observerCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_observers = data;
					$scope.data_observers = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.observers = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_observers[lastPush])){
							$scope.observers.push(data_observers[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: observerCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: observerCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_observers === null){
		data_observers = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_observers[lastPush])){
				$scope.observers.push(data_observers[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: observerCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_observers);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `observer` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: observer_bookmarkCtrl --|-- 
.controller("observer_bookmarkCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (observer)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: observer_bookmarkCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: observer_bookmarkCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: observer_bookmarkCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: observer_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: observer_bookmarkCtrl --|-- $scope.loadDbVirtualDashboard
	 
	$scope.loadDbVirtualDashboard = function(){
		$ionicLoading.show();
		//observer_bookmark
		$scope.dashboard_bookmark = []; 
		localforage.getItem("dashboard_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.dashboard_bookmark = []; 
			}else{
				try{
					$scope.dashboard_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_dashboard = $scope.dashboard_bookmark.length;
				}catch (e){
					$scope.dashboard_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualDashboard();
	});
	// TODO: observer_bookmarkCtrl --|-- $scope.clearDbVirtualDashboard
	$scope.clearDbVirtualDashboard = function(){
					$rootScope.item_in_virtual_table_dashboard = 0;
		localforage.setItem("dashboard_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualDashboard();
		},200);
	};
	// TODO: observer_bookmarkCtrl --|-- $scope.removeDbVirtualDashboard
	$scope.removeDbVirtualDashboard = function(itemId){
		var virtual_items = [];
		var last_items = $scope.dashboard_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("dashboard_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualDashboard();
		},200);
	};
	// TODO: observer_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: observer_bookmarkCtrl --|-- $scope.loadDbVirtualObserver
	 
	$scope.loadDbVirtualObserver = function(){
		$ionicLoading.show();
		//observer_bookmark
		$scope.observer_bookmark = []; 
		localforage.getItem("observer_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.observer_bookmark = []; 
			}else{
				try{
					$scope.observer_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_observer = $scope.observer_bookmark.length;
				}catch (e){
					$scope.observer_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualObserver();
	});
	// TODO: observer_bookmarkCtrl --|-- $scope.clearDbVirtualObserver
	$scope.clearDbVirtualObserver = function(){
					$rootScope.item_in_virtual_table_observer = 0;
		localforage.setItem("observer_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualObserver();
		},200);
	};
	// TODO: observer_bookmarkCtrl --|-- $scope.removeDbVirtualObserver
	$scope.removeDbVirtualObserver = function(itemId){
		var virtual_items = [];
		var last_items = $scope.observer_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("observer_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualObserver();
		},200);
	};
	// TODO: observer_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: observer_bookmarkCtrl --|-- $scope.loadDbVirtualPost
	 
	$scope.loadDbVirtualPost = function(){
		$ionicLoading.show();
		//observer_bookmark
		$scope.post_bookmark = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.post_bookmark = []; 
			}else{
				try{
					$scope.post_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_post = $scope.post_bookmark.length;
				}catch (e){
					$scope.post_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualPost();
	});
	// TODO: observer_bookmarkCtrl --|-- $scope.clearDbVirtualPost
	$scope.clearDbVirtualPost = function(){
					$rootScope.item_in_virtual_table_post = 0;
		localforage.setItem("post_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// TODO: observer_bookmarkCtrl --|-- $scope.removeDbVirtualPost
	$scope.removeDbVirtualPost = function(itemId){
		var virtual_items = [];
		var last_items = $scope.post_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// code 

	// TODO: observer_bookmarkCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `observer_bookmark` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: observer_singlesCtrl --|-- 
.controller("observer_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (observer)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: observer_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: observer_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: observer_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: observer_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	// TODO: observer_singlesCtrl --|-- $scope.addToVirtual(); //data single
	$scope.addToDbVirtual = function(newItem){
		if(typeof newItem.id === "undefined"){
			return false;
		}
		var is_already_exist = false ;
		// animation loading 
		$ionicLoading.show();
		var virtual_items = []; 
		localforage.getItem("observer_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				virtual_items = [];
			}else{
				try{
					var last_items = JSON.parse(dbVirtual); 
				}catch(e){
					var last_items = [];
				}
				for(var z=0;z<last_items.length;z++){
					virtual_items.push(last_items[z]);
					if(newItem.id ==  last_items[z].id){
						is_already_exist = true;
					}
				}
			}
		}).then(function(value){
			if(is_already_exist === false){
				newItem["_qty"]=1;
				virtual_items.push(newItem);
			}
			localforage.setItem("observer_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_observer = virtual_items.length;
			},200);
		}).catch(function(err){
			virtual_items = [];
			virtual_items.push(newItem);
			localforage.setItem("observer_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_observer = virtual_items.length;
			},200);
		})
	};
	
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: observer_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=3";
	// TODO: observer_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=3&callback=JSON_CALLBACK";
	// TODO: observer_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: observer_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.observer = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: observer_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: observer_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: observer_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.observer = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.observer = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: observer_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `observer_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: post_bookmarkCtrl --|-- 
.controller("post_bookmarkCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (post)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: post_bookmarkCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: post_bookmarkCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: post_bookmarkCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: post_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: post_bookmarkCtrl --|-- $scope.loadDbVirtualDashboard
	 
	$scope.loadDbVirtualDashboard = function(){
		$ionicLoading.show();
		//post_bookmark
		$scope.dashboard_bookmark = []; 
		localforage.getItem("dashboard_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.dashboard_bookmark = []; 
			}else{
				try{
					$scope.dashboard_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_dashboard = $scope.dashboard_bookmark.length;
				}catch (e){
					$scope.dashboard_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualDashboard();
	});
	// TODO: post_bookmarkCtrl --|-- $scope.clearDbVirtualDashboard
	$scope.clearDbVirtualDashboard = function(){
					$rootScope.item_in_virtual_table_dashboard = 0;
		localforage.setItem("dashboard_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualDashboard();
		},200);
	};
	// TODO: post_bookmarkCtrl --|-- $scope.removeDbVirtualDashboard
	$scope.removeDbVirtualDashboard = function(itemId){
		var virtual_items = [];
		var last_items = $scope.dashboard_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("dashboard_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualDashboard();
		},200);
	};
	// TODO: post_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: post_bookmarkCtrl --|-- $scope.loadDbVirtualObserver
	 
	$scope.loadDbVirtualObserver = function(){
		$ionicLoading.show();
		//post_bookmark
		$scope.observer_bookmark = []; 
		localforage.getItem("observer_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.observer_bookmark = []; 
			}else{
				try{
					$scope.observer_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_observer = $scope.observer_bookmark.length;
				}catch (e){
					$scope.observer_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualObserver();
	});
	// TODO: post_bookmarkCtrl --|-- $scope.clearDbVirtualObserver
	$scope.clearDbVirtualObserver = function(){
					$rootScope.item_in_virtual_table_observer = 0;
		localforage.setItem("observer_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualObserver();
		},200);
	};
	// TODO: post_bookmarkCtrl --|-- $scope.removeDbVirtualObserver
	$scope.removeDbVirtualObserver = function(itemId){
		var virtual_items = [];
		var last_items = $scope.observer_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("observer_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualObserver();
		},200);
	};
	// TODO: post_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: post_bookmarkCtrl --|-- $scope.loadDbVirtualPost
	 
	$scope.loadDbVirtualPost = function(){
		$ionicLoading.show();
		//post_bookmark
		$scope.post_bookmark = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.post_bookmark = []; 
			}else{
				try{
					$scope.post_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_post = $scope.post_bookmark.length;
				}catch (e){
					$scope.post_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualPost();
	});
	// TODO: post_bookmarkCtrl --|-- $scope.clearDbVirtualPost
	$scope.clearDbVirtualPost = function(){
					$rootScope.item_in_virtual_table_post = 0;
		localforage.setItem("post_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// TODO: post_bookmarkCtrl --|-- $scope.removeDbVirtualPost
	$scope.removeDbVirtualPost = function(itemId){
		var virtual_items = [];
		var last_items = $scope.post_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// code 

	// TODO: post_bookmarkCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `post_bookmark` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: post_singlesCtrl --|-- 
.controller("post_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (post)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: post_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: post_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: post_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: post_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	// TODO: post_singlesCtrl --|-- $scope.addToVirtual(); //data single
	$scope.addToDbVirtual = function(newItem){
		if(typeof newItem.id === "undefined"){
			return false;
		}
		var is_already_exist = false ;
		// animation loading 
		$ionicLoading.show();
		var virtual_items = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				virtual_items = [];
			}else{
				try{
					var last_items = JSON.parse(dbVirtual); 
				}catch(e){
					var last_items = [];
				}
				for(var z=0;z<last_items.length;z++){
					virtual_items.push(last_items[z]);
					if(newItem.id ==  last_items[z].id){
						is_already_exist = true;
					}
				}
			}
		}).then(function(value){
			if(is_already_exist === false){
				newItem["_qty"]=1;
				virtual_items.push(newItem);
			}
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_post = virtual_items.length;
			},200);
		}).catch(function(err){
			virtual_items = [];
			virtual_items.push(newItem);
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_post = virtual_items.length;
			},200);
		})
	};
	
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: post_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: post_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: post_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: post_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.post = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: post_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: post_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: post_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.post = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.post = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: post_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `post_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: slide_tab_menuCtrl --|-- 
.controller("slide_tab_menuCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: slide_tab_menuCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: slide_tab_menuCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `slide_tab_menu` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_burh_chickenCtrl --|-- 
.controller("the_burh_chickenCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_bush_chicken)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_burh_chickenCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_burh_chickenCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_burh_chickenCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_burh_chickenCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url The Bush Chicken
	targetQuery = "categories=8"; //default param
	raplaceWithQuery = "categories=8";
		
	$scope.first_param = {};
	$scope.first_param.categories = "8";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.the_burh_chickenQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.the_burh_chickenQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: the_burh_chickenCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: the_burh_chickenCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=8";
	// TODO: the_burh_chickenCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=8&callback=JSON_CALLBACK";
	// TODO: the_burh_chickenCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_the_bush_chickens = [];
	
	if(data_the_bush_chickens === null ){
		data_the_bush_chickens =[];
	}
	if(data_the_bush_chickens.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: the_burh_chickenCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_the_bush_chickens = response.data;
				$scope.data_the_bush_chickens = response.data;
				$scope.the_bush_chickens = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_the_bush_chickens[lastPush])){
						$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: the_burh_chickenCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_the_bush_chickens = data;
						$scope.data_the_bush_chickens = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.the_bush_chickens = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_the_bush_chickens[lastPush])){
								$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: the_burh_chickenCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_burh_chickenCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_the_bush_chickens.data)){
					if($scope.data_the_bush_chickens.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: the_burh_chickenCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_burh_chickenCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_the_bush_chickens = response.data;
			$scope.data_the_bush_chickens = response.data;
			$scope.the_bush_chickens = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_the_bush_chickens[lastPush])){
					$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: the_burh_chickenCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_the_bush_chickens = data;
					$scope.data_the_bush_chickens = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.the_bush_chickens = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_the_bush_chickens[lastPush])){
							$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: the_burh_chickenCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_burh_chickenCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_the_bush_chickens === null){
		data_the_bush_chickens = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_the_bush_chickens[lastPush])){
				$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: the_burh_chickenCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_the_bush_chickens);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `the_burh_chicken` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_burh_chicken_singlesCtrl --|-- 
.controller("the_burh_chicken_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_burh_chicken)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_burh_chicken_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_burh_chicken_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_burh_chicken_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_burh_chicken_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: the_burh_chicken_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: the_burh_chicken_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: the_burh_chicken_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_burh_chicken_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_burh_chicken = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: the_burh_chicken_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_burh_chicken_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: the_burh_chicken_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.the_burh_chicken = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_burh_chicken = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: the_burh_chicken_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `the_burh_chicken_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_bush_chicken_singlesCtrl --|-- 
.controller("the_bush_chicken_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_bush_chicken)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_bush_chicken_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_bush_chicken = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: the_bush_chicken_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_bush_chicken_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: the_bush_chicken_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.the_bush_chicken = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_bush_chicken = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: the_bush_chicken_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `the_bush_chicken_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_liberian_billboardCtrl --|-- 
.controller("the_liberian_billboardCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (billboard)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_liberian_billboardCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_liberian_billboardCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_liberian_billboardCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_liberian_billboardCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url The Liberian Billboard
	targetQuery = "categories=13"; //default param
	raplaceWithQuery = "categories=13";
		
	$scope.first_param = {};
	$scope.first_param.categories = "13";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.the_liberian_billboardQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.the_liberian_billboardQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: the_liberian_billboardCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: the_liberian_billboardCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=13";
	// TODO: the_liberian_billboardCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=13&callback=JSON_CALLBACK";
	// TODO: the_liberian_billboardCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_billboards = [];
	
	if(data_billboards === null ){
		data_billboards =[];
	}
	if(data_billboards.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: the_liberian_billboardCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_billboards = response.data;
				$scope.data_billboards = response.data;
				$scope.billboards = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_billboards[lastPush])){
						$scope.billboards.push(data_billboards[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: the_liberian_billboardCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_billboards = data;
						$scope.data_billboards = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.billboards = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_billboards[lastPush])){
								$scope.billboards.push(data_billboards[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: the_liberian_billboardCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_liberian_billboardCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_billboards.data)){
					if($scope.data_billboards.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: the_liberian_billboardCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_liberian_billboardCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_billboards = response.data;
			$scope.data_billboards = response.data;
			$scope.billboards = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_billboards[lastPush])){
					$scope.billboards.push(data_billboards[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: the_liberian_billboardCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_billboards = data;
					$scope.data_billboards = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.billboards = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_billboards[lastPush])){
							$scope.billboards.push(data_billboards[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: the_liberian_billboardCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_liberian_billboardCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_billboards === null){
		data_billboards = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_billboards[lastPush])){
				$scope.billboards.push(data_billboards[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: the_liberian_billboardCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_billboards);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `the_liberian_billboard` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_news_newspap_singlesCtrl --|-- 
.controller("the_news_newspap_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_news_newspap)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_news_newspap_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_news_newspap_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_news_newspap_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_news_newspap_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: the_news_newspap_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID;
	// TODO: the_news_newspap_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: the_news_newspap_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_news_newspap_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_news_newspap = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: the_news_newspap_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_news_newspap_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: the_news_newspap_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.the_news_newspap = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_news_newspap = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: the_news_newspap_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `the_news_newspap_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_news_newspaperCtrl --|-- 
.controller("the_news_newspaperCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_news_newspap)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_news_newspaperCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_news_newspaperCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_news_newspaperCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_news_newspaperCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("lnn.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url The News Newspaper
	targetQuery = "categories=9"; //default param
	raplaceWithQuery = "categories=9";
		
	$scope.first_param = {};
	$scope.first_param.categories = "9";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.the_news_newspaperQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.the_news_newspaperQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: the_news_newspaperCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: the_news_newspaperCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://35.226.128.183/wp-json/wp/v2/posts?categories=9";
	// TODO: the_news_newspaperCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://35.226.128.183/wp-json/wp/v2/posts?categories=9&callback=JSON_CALLBACK";
	// TODO: the_news_newspaperCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_the_news_newspaps = [];
	
	if(data_the_news_newspaps === null ){
		data_the_news_newspaps =[];
	}
	if(data_the_news_newspaps.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: the_news_newspaperCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_the_news_newspaps = response.data;
				$scope.data_the_news_newspaps = response.data;
				$scope.the_news_newspaps = [];
				for(lastPush = 0; lastPush < 5; lastPush++) {
					if (angular.isObject(data_the_news_newspaps[lastPush])){
						$scope.the_news_newspaps.push(data_the_news_newspaps[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: the_news_newspaperCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_the_news_newspaps = data;
						$scope.data_the_news_newspaps = data;
						$ionicLoading.hide();
						controller_by_user();
						$scope.the_news_newspaps = [];
						for(lastPush = 0; lastPush < 5; lastPush++) {
							if (angular.isObject(data_the_news_newspaps[lastPush])){
								$scope.the_news_newspaps.push(data_the_news_newspaps[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: the_news_newspaperCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_news_newspaperCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_the_news_newspaps.data)){
					if($scope.data_the_news_newspaps.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: the_news_newspaperCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_news_newspaperCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_the_news_newspaps = response.data;
			$scope.data_the_news_newspaps = response.data;
			$scope.the_news_newspaps = [];
			for(lastPush = 0; lastPush < 5; lastPush++) {
				if (angular.isObject(data_the_news_newspaps[lastPush])){
					$scope.the_news_newspaps.push(data_the_news_newspaps[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: the_news_newspaperCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_the_news_newspaps = data;
					$scope.data_the_news_newspaps = data;
					$ionicLoading.hide();
					controller_by_user();
					$scope.the_news_newspaps = [];
					for(lastPush = 0; lastPush < 5; lastPush++) {
						if (angular.isObject(data_the_news_newspaps[lastPush])){
							$scope.the_news_newspaps.push(data_the_news_newspaps[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: the_news_newspaperCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_news_newspaperCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_the_news_newspaps === null){
		data_the_news_newspaps = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_the_news_newspaps[lastPush])){
				$scope.the_news_newspaps.push(data_the_news_newspaps[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: the_news_newspaperCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_the_news_newspaps);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `the_news_newspaper` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})
