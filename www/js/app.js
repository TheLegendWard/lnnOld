angular.module("lnn", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","lnn.controllers", "lnn.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "LNN" ;
		$rootScope.appLogo = "" ;
		$rootScope.appVersion = "1.3" ;
		$rootScope.headerShrink = false ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_home = false ;
		$rootScope.hide_menu_news_sources = false ;
		$rootScope.hide_menu_about_lnn = false ;
		$rootScope.hide_menu_rate_us = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "lnn",
				storeName : "lnn",
				description : "The offline datastore for LNN app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admob-free --save
			if (typeof admob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "ca-app-pub-3103082555954281/4590587137",
					interstitial: "",
				};
				
				// banner
				try{
					admob.banner.config({
						id: admobid.banner,
						autoShow: false
					});
					admob.banner.prepare();
				}catch(err){ 
					//alert(err.message);
				}
				$interval(function(){
					if($rootScope.liveStatus == "run"){
						try{
							admob.banner.show();
						}catch(err){ 
							//alert(err.message);
						}
					}
				},10000); 
				
				$ionicPlatform.on("pause",function(){
					try{
						admob.banner.hide();
					}catch(err){ 
						//alert(err.message);
					}
				});
				
				// interstitial
				try{
					admob.interstitial.config({
						id: admobid.interstitial,
						autoShow: false
					});
					admob.interstitial.prepare();
				}catch(err){ 
					//alert(err.message);
				}
			}


			//required: cordova plugin add onesignal-cordova-plugin --save
			if(window.plugins && window.plugins.OneSignal){
				window.plugins.OneSignal.enableNotificationsWhenActive(true);
				var notificationOpenedCallback = function(jsonData){
					try {
						$timeout(function(){
							$window.location = "#/lnn/" + jsonData.notification.payload.additionalData.page ;
						},200);
					} catch(e){
						console.log("onesignal:" + e);
					}
				}
				window.plugins.OneSignal.startInit("d52a6f44-5ec9-474d-a9c9-bd3c11f6c359").handleNotificationOpened(notificationOpenedCallback).endInit();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("lnn.home");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("lnn",{
		url: "/lnn",
			abstract: true,
			templateUrl: "templates/lnn-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("lnn.about_lnn", {
		url: "/about_lnn",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-about_lnn.html",
						controller: "about_lnnCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.about_us", {
		url: "/about_us",
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.billboard_singles", {
		url: "/billboard_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-billboard_singles.html",
						controller: "billboard_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.bookmarks", {
		url: "/bookmarks",
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-bookmarks.html",
						controller: "bookmarksCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.dashboard_bookmark", {
		url: "/dashboard_bookmark",
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-dashboard_bookmark.html",
						controller: "dashboard_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.dashboard_singles", {
		url: "/dashboard_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-dashboard_singles.html",
						controller: "dashboard_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("lnn.faqs", {
		url: "/faqs",
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.frontpage_africa", {
		url: "/frontpage_africa/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-frontpage_africa.html",
						controller: "frontpage_africaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.frontpage_africa_singles", {
		url: "/frontpage_africa_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-frontpage_africa_singles.html",
						controller: "frontpage_africa_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.gnn_liberia", {
		url: "/gnn_liberia/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-gnn_liberia.html",
						controller: "gnn_liberiaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.gnn_liberia_singles", {
		url: "/gnn_liberia_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-gnn_liberia_singles.html",
						controller: "gnn_liberia_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.home", {
		url: "/home",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-home.html",
						controller: "homeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.lina", {
		url: "/lina/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-lina.html",
						controller: "linaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.lina_singles", {
		url: "/lina_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-lina_singles.html",
						controller: "lina_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.lnn_posts", {
		url: "/lnn_posts/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-lnn_posts.html",
						controller: "lnn_postsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.menu_one", {
		url: "/menu_one",
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-menu_one.html",
						controller: "menu_oneCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.menu_two", {
		url: "/menu_two",
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-menu_two.html",
						controller: "menu_twoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.my", {
		url: "/my/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-my.html",
						controller: "myCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.news_sources", {
		url: "/news_sources",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-news_sources.html",
						controller: "news_sourcesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.observer", {
		url: "/observer",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-observer.html",
						controller: "observerCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.observer_bookmark", {
		url: "/observer_bookmark",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-observer_bookmark.html",
						controller: "observer_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.observer_singles", {
		url: "/observer_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-observer_singles.html",
						controller: "observer_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.post_bookmark", {
		url: "/post_bookmark",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-post_bookmark.html",
						controller: "post_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.post_singles", {
		url: "/post_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-post_singles.html",
						controller: "post_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.slide_tab_menu", {
		url: "/slide_tab_menu",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.the_burh_chicken", {
		url: "/the_burh_chicken/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-the_burh_chicken.html",
						controller: "the_burh_chickenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.the_burh_chicken_singles", {
		url: "/the_burh_chicken_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-the_burh_chicken_singles.html",
						controller: "the_burh_chicken_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.the_bush_chicken_singles", {
		url: "/the_bush_chicken_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-the_bush_chicken_singles.html",
						controller: "the_bush_chicken_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.the_liberian_billboard", {
		url: "/the_liberian_billboard/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-the_liberian_billboard.html",
						controller: "the_liberian_billboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.the_news_newspap_singles", {
		url: "/the_news_newspap_singles/:id",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-the_news_newspap_singles.html",
						controller: "the_news_newspap_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("lnn.the_news_newspaper", {
		url: "/the_news_newspaper/:categories",
		cache:false,
		views: {
			"lnn-side_menus" : {
						templateUrl:"templates/lnn-the_news_newspaper.html",
						controller: "the_news_newspaperCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})


// router by user


	$urlRouterProvider.otherwise("/lnn/home");
});
