/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	//util
	var util = __webpack_require__(2);

	//util.log("ほげほげ");
	(function(angular) {
	    var MODULES = [
	        'ui.router',
	        'angularLocalStorage',
	        'ngResource',
	        'ngSanitize',
	        'ngAnimate',
	        'ngTouch',
	        'toaster'
	    ];
	    var MODULE_GROUP = [
	        'controllers'
	        ,'directives'
	        ,'filters'
	        ,'models'
	        ,'services'
	        ,'config'
	    ];
	    for (var i = 0, len = MODULE_GROUP.length; i < len; i++) angular.module(MODULE_GROUP[i],[]);
	    angular.module('offsideApp',MODULES.concat(MODULE_GROUP));
	})(angular);

	//ルーティング
	__webpack_require__(3);

	//コントローラー読み込み (./controllersフォルダ内の全て)
	var ctx = __webpack_require__(1),
	    map = ctx.keys(),
	    i = map.length;
	while (i--) ctx(map[i]);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./discussCtrl.js": 4,
		"./finishCtrl.js": 5,
		"./loginCtrl.js": 6,
		"./mainCtrl.js": 7,
		"./playerCtrl.js": 8,
		"./readyCtrl.js": 9,
		"./registerCtrl.js": 10,
		"./roleCtrl.js": 11,
		"./roomCtrl.js": 12,
		"./signinCtrl.js": 13,
		"./standbyCtrl.js": 14
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	   log: function(val){
	       console.log("debug",val);
	   }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	angular.module('config').config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/login');
	    $stateProvider
	//        .state("/",{
	//            url:"/",
	//            template: require('../views/intro.html'),
	//            controller: "MainCtrl"
	//        })

	        //ユーザー登録 1
	        .state("/register",{
	            url:"/register",
	            template: __webpack_require__(31),
	            controller: "RegisterCtrl"
	        })

	        //ユーザーログイン 2
	        .state("/login",{
	            url:"/login",
	            template: __webpack_require__(23),
	            controller: "LoginCtrl"
	        })

	        //ルーム作成 3
	        .state("/room",{
	            url:"/room",
	            template: __webpack_require__(24),
	            controller: "RoomCtrl"
	        })

	        .state("/standby",{
	            url:"/standby/:room_name",
	            template: __webpack_require__(25),
	            controller: "StandbyCtrl"
	        })

	        .state("/palyer",{
	            url:"/player",
	            template: __webpack_require__(26),
	            controller: 'PlayerCtrl'
	        })

	        .state("/role",{
	            url:"/role",
	            template: __webpack_require__(27),
	            controller: 'RoleCtrl'
	        })
	        .state("/ready",{
	            url:"/ready",
	            template: __webpack_require__(28),
	            controller: 'ReadyCtrl'
	        })

	        .state("/discuss",{
	            url:"/discuss",
	            template: __webpack_require__(29),
	            controller: 'DiscussCtrl'
	        })

	        .state("/finish",{
	            url:"/finish",
	            template: __webpack_require__(30),
	            controller: 'ReadyCtrl'
	        })

	        .state("/signin",{
	            url:"/signin",
	            template: __webpack_require__(32),
	            controller: 'SigninCtrl'
	        });
	}]);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	angular.module('controllers').controller('DiscussCtrl', [
	    '$scope',
	    'storage',
	    '$timeout',

	    function ($scope, storage, $timeout) {
	        var ROOM = storage.get('jinroRoom');
	        var H = 0.01;

	        //H分後に投票ボタンを表示
	        $timeout(function() {
	            $scope.enter = 'on';
	        }, 1000 * 60 * H);

	        jinroDS.child(ROOM).get(function(data){
	            $scope.$apply(function(){
	                $scope.num = data.count.num;
	                $scope.roomEx = data.count.ex;
	                $scope.friends = data.users;
	            });
	        });

	        //投票
	        $scope.vote = function(){
	            if(!$scope.target){
	                alert("対象者を選択して下さい");
	                return;
	            }

	            var jinroData = [];
	            jinroDS.child(ROOM).get(function(data){
	                jinroData = data;
	            });

	            $timeout(function() {
	                jinroData.vote.push($scope.target);
	                jinroDS.set(ROOM, {vote: jinroData.vote, type: 'vote'}); //サーバー上に保存
	                $scope.voted = 'on';
	            },1000);
	        };

	        /*
	         * milkcocoaイベント
	         * */
	        jinroDS.on('set', function(data) {
	            //イントロページ
	            if(data.value.type === 'vote') {
	                console.log("投票", data.value.vote.length, $scope.num);
	                if(data.value.vote.length >= $scope.num){//全員が投票
	                    $scope.$apply(function(){
	                        $scope.finish = 'on';
	                    });
	                }
	            }else if(data.value.type === 'init'){
	                init();
	            }
	        });

	    }
	]);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';

	__webpack_require__(15);

	angular.module('controllers').controller('FinishCtrl', [
	    '$scope',
	    'storage',
	    'UserModel',
	    '$location',
	    '$timeout',

	    function ($scope, storage, UserModel, $location, $timeout) {
	        var ROOM = storage.get('jinroRoom');

	        //部屋情報取得
	        var jinroData = {};
	        jinroDS.child(ROOM).get(function(data){
	            jinroData = data;
	        });

	        //投票結果
	        $scope.voteResult = function(){
	            var vote = _.countBy(jinroData.vote, function(num) {
	                return num;
	            });

	            $scope.vote = vote;
	        };

	        //結果発表
	        $scope.finish = function(){
	            $scope.open = 1;
	            var after = jinroData.after, tmp = [], result=[];
	            if(!after[0]) after = jinroData.action;
	            for(var i = 0, len = after.length; i < len; i++){
	                tmp[i] = after[i].split(":");
	                result[i] = {
	                    role: jinroData.role[tmp[i][0]].name,
	                    name: tmp[i][1]
	                };
	            }

	            $scope.friends = result;
	        };

	        //ログインページに移動&部屋削除
	        $scope.cloase = function(){
	            jinroDS.remove(storage.get('jinroRoom'));
	            $location.path('/login');
	        };
	    }
	]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(15);
	__webpack_require__(16);

	angular.module('controllers').controller('LoginCtrl', [
	    '$scope',
	    'UserModel',
	    'AccountModel',
	    'storage',

	    function ($scope, UserModel, AccountModel, storage) {
	        //ログイン中かチェック
	        AccountModel.checkUser(function(err,user){
	            update($scope, user);
	        });

	        //+ユーザーログアウト
	        $scope.logoutUser = function(){
	            AccountModel.logout();
	            $scope.setLogin = false;
	        };

	        //+ユーザーログイン
	        $scope.loginUser = function(){
	            var email = $scope.email;
	            var password = $scope.password;
	            AccountModel.login(email, password, function(data){
	                update($scope, data);
	            });
	        };

	        //+部屋検索
	        $scope.findRoom = function(){
	            var query = jinroDS.query();
	            //このように取得したオブジェクトを用いてデータの取得を行います。
	            query.done(function(data){
	                $scope.$apply(function(){
	                    $scope.roomList = data;
	                });
	            });
	        };
	    }
	]);

	function update($scope, data){
	    if(!data) return;
	    $scope.$apply(function(){
	        $scope.setLogin = 'on';
	        $scope.userName = data.option.userName;
	        $scope.twitter = data.option.twitter;
	    });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';

	__webpack_require__(15);
	__webpack_require__(18);

	angular.module('controllers').controller('MainCtrl',[
	    '$scope',
	    'UserModel',
	    'RoomModel',
	    'storage',
	    'toaster',
	    '$timeout',

	    function ($scope, UserModel, RoomModel, storage, toaster, $timeout) {
	        var ROOM = 'ligroom1';
	        storage.set('jinroRoom', ROOM);

	        //部屋情報取得チェック
	        var jinroData = {};
	        init();
	        function init(){
	            jinroDS.child(ROOM).get(function(data){
	                jinroData = data;
	                $scope.$apply(function(){
	                    $scope.num = jinroData.count.num;
	                    $scope.roomEx = jinroData.count.ex;
	                    //if(jinroData.length != 0) $scope.hideInit = 'on';
	                });
	            });
	        }


	        //部屋初期化
	        $scope.roomInit = function() {
	            $scope.roomEx = RoomModel.init(ROOM, $scope.num);
	        };

	        //ユーザー追加
	        $scope.userInit = function(){
	            jinroDS.child(ROOM).get(function(data){
	                jinroData = data;
	            });

	            if(jinroData.users.length >= $scope.num){
	                alert("定員オーバーです");
	                return;
	            }

	            $scope.init = 1;

	            setTimeout(function(){
	                jinroData.users.push($scope.userName);
	                console.log(jinroData.users);
	                jinroDS.set(ROOM, {users:jinroData.users, type: 'userInit'}); //サーバー上に保存
	                storage.set('jinroUser', $scope.userName); //ローカルに保存
	                storage.set('jinroNumber', jinroData.users.length); //ローカルに保存ユニーク番号
	                $scope.friends = jinroData.users;
	            },1000);
	        };


	        /*
	         * milkcocoaイベント
	         * */
	        jinroDS.on('set', function(data) {
	            //イントロページ
	            if(data.value.type === 'userInit') {
	                if (data.value.users[0]) { //自分以外
	                    console.log('setted! userInit', data.value.users);
	                    _.union($scope.friends, data.value.users);

	                    $scope.$apply(function(){
	                        $scope.friends = data.value.users;
	                        $scope.hideInit = 'on'; //初期化を隠す
	                        if($scope.friends.length === $scope.num) $scope.enter = 1;
	                    });
	                }
	            }else if(data.value.type === 'init'){
	                init();
	            }
	        });

	    }
	]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(15);

	angular.module('controllers').controller('PlayerCtrl', [
	    '$scope',
	    'UserModel',

	    function ($scope, UserModel) {
	        //var ROOM = 'ligroom1';
	        //var roomDS = jinroDS.child(ROOM);
	        //var jinroData = {};
	        //roomDS.get(function(data){
	        //    jinroData = data;
	        //});
	        //$scope.member = [];

	        //$scope.getRole = function(){
	        //    UserModel.role(ROOM, function (role, data) {
	        //        console.log(ROOM, data);
	        //        //LocalModel.set('jinro_all',data);
	        //    });
	        //
	        //    //var jinro = LocalModel.get('jinro_all');
	        //    //jinro.userName = $scope.userName;//ユーザー名
	        //    //
	        //    //if(jinro.name) {
	        //    //    $scope.role = jinro.name;
	        //    //    $scope.ex = jinro.ex;
	        //    //    UserModel.roleUpdate(ROOM, jinro);
	        //    //}else{
	        //    //    alert("定員オーバーです。");
	        //    //}
	        //};



	        $scope.userInit = function(){
	            $scope.init = 1; //確定ボタンを消す

	            UserModel.addUser();
	            //jinroDS.set(ROOM, jinroData); //更新

	            console.log($scope.userName);
	            //jinroData.users.push($scope.userName);
	            //$scope.init = 1; //確定ボタンを消す
	            //
	            //jinroDS.send({user: $scope.userName}); //ユーザー名
	            //
	            //console.log(jinroData.users);


	            //roomDS.child(ROOM).get(function(data){
	            //    //jinroSet(data);
	            //
	            //    jinroDS.push({"aaa": 111},function(data){
	            //        console.log("送信完了!", data);
	            //    });
	            //
	            //});
	            //
	            //function jinroSet(data){
	            //    jinroDS.child(ROOM).set(data);
	            //}
	        };



	        //jinroDS.on('send',function(data) {
	        //
	        //    //console.log("取得", data);
	        //    //data.push(data.value.user);
	        //
	        //    //$scope.list
	        //    console.log("取得", data.value.user);
	        //    //console.log("取得", data.users);
	        //    $scope.member.push(data.value.user);
	        //
	        //    console.log('push',$scope.member);
	        //
	        //});
	        //
	        ////jinroDataStore.on(event, callback)
	        //
	        //
	        //$scope.$watch(function() {
	        //    return $scope.member;
	        //}, function() {
	        //    console.log("監視");
	        //    // $location の path が変わった時
	        //});

	        /*
	         jinroDataStore.on('send',function(data){
	         var friends = $scope.friends;
	         console.log("取得",data);
	         console.log("fりえんd",friends);
	         friends.push(data.value.new_user);
	         console.log(friends);

	         });

	         $scope.$watch('friends', function() {
	         // scope の name が変わった時
	         console.log("監視");
	         $scope.friends = friends;
	         });*/

	    }
	]);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(15);

	angular.module('controllers').controller('ReadyCtrl', [
	    '$scope',
	    'UserModel',
	    'storage',

	    function ($scope, UserModel, storage) {
	        var ROOM = storage.get('jinroRoom');
	        var jinroRole = storage.get('jinroRole');
	        $scope.ex =  jinroRole.ex;
	        $scope.role =  jinroRole.name;
	        $scope.userName =  storage.get('jinroUser');
	        $scope.type =  jinroRole.role;

	        //部屋情報取得
	        var jinroData = {};
	        jinroDS.child(ROOM).get(function(data){
	            jinroData = data;
	            $scope.$broadcast('get', jinroData);
	            $scope.num = jinroData.users.length;
	        });

	        //アクションを完了する
	        $scope.finishAction = function(){
	            jinroDS.child(ROOM).get(function(data){
	                jinroData = data;
	                //$scope.$broadcast('setAction', jinroData);
	            });

	            setTimeout(function(){
	                jinroDS.set(ROOM, {actionCount: jinroData.actionCount + 1, type: 'action'});
	            },1000);

	            $scope.btnHide = 'on';
	        };

	        //アクションを起こす
	        $scope.action = function(){
	            $scope.actionBtn = 1;
	            //$scope.partner = storage.get('partner');

	            //怪盗と魔法使いの時はリスト表示
	            if($scope.type === 'wizard' || $scope.type === 'thief'){
	                $scope.friends = UserModel.getNameList(jinroData.action, 'obj');
	            }
	        };

	        //人狼と狂人の場合
	        if($scope.type === 'wolf' || $scope.type === 'crazy') {
	            $scope.$on('get',function(event, data){
	                $scope.partner = UserModel.getPartner($scope.type, data.action);
	            });
	        }


	        //役職を取得 -> 怪盗or魔法使い
	        $scope.getRole = function(index){
	            var role = $scope.friends[index].role; //役職ID
	            var roleName = jinroData.role[role].name; //役職名
	            var userName = $scope.friends[index].name; //ユーザー名
	            var message = userName + "さんは" + roleName + "です。";

	            if($scope.type === 'wizard') {
	                $scope.message = message;
	            }else if($scope.type === 'thief'){
	                $scope.message = message + userName + 'さんの' + roleName + 'と怪盗を交換しました。';
	                jinroDS.set(ROOM, {after: UserModel.change(jinroData, role)});
	            }
	        };

	        /*
	         * milkcocoaイベント
	         * */
	        jinroDS.on('set', function(data) {
	            if(data.value.type === 'action') {
	                console.log("set action",data.value.actionCount);
	                if(data.value.actionCount === $scope.num){//全員がアクション完了した
	                    console.log("all action done");
	                    $scope.$apply(function(){
	                        $scope.enter = 'on';
	                    });
	                }
	            }else if(data.value.type === 'init'){
	                //   init();
	            }
	        });

	    }
	]);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(19);

	angular.module('controllers').controller('RegisterCtrl', [
	    '$scope',
	    '$location',
	    'AccountModel',
	    'AuthModel',
	    'UserModel',
	    '$http',

	    function ($scope, $location, AccountModel, AuthModel, UserModel, $http) {
	//        AuthModel.register({}, function(res){
	//            console.log(res);
	//        });

	        var headers = {
	            'Access-Control-Allow-Origin' : '*',
	            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
	            'Content-Type': 'application/json',
	            'Accept': 'application/json'
	        };

	        return $http({
	            method: "GET",
	            headers: headers,
	            url: 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040',
	            data: {"email":"my@email.com","password":"secret"}
	        }).success(function(result) {
	            console.log("Auth.signin.success!")
	            console.log(result);
	        }).error(function(data, status, headers, config) {
	            console.log("Auth.signin.error!")
	            console.log(data);
	            console.log(status);
	            console.log(headers);
	            console.log(config);
	        });

	//        var um = new UserModel({hoge:"aaa"});
	//        um.$get(function(){
	//
	//        });
	//        var um = new UserModel({name:11});
	//
	////        um.option = {
	////            user: {
	////                email: 'hoge@hoge.com',
	////                password: 'fadfada',
	////                password_confrism: 'fadfadfa'
	////            }
	////        };
	//
	//        um.$save(function() {
	//            // 新規作成成功時の処理
	////            cb('成功');
	//
	//        });

	        //ユーザー登録
	        $scope.addUser = function(){
	            console.log("addUser!!!", $scope.user);
	            AuthModel.register($scope.user, function(res){
	                console.log(res);
	            });

	//            var email = $scope.email;
	//            var password = $scope.password;
	//            var options = {
	//                userName: $scope.userName,
	//                twitter: $scope.twitter
	//            };
	//            //アカウント作成
	//            AccountModel.register(email, password, options, function(err,user){
	//                if(!err){ //登録に成功したらログインへ。
	//                    $scope.$apply(function(){
	//                        $location.path('/login');
	//                    });
	//                }
	//            });

	        };
	    }
	]);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';

	__webpack_require__(15);

	angular.module('controllers').controller('RoleCtrl', [
	    '$scope',
	    'UserModel',
	    'storage',

	    function ($scope, UserModel, storage) {
	        var ROOM = storage.get('jinroRoom');
	        $scope.friends = [];
	        $scope.userName = storage.get('jinroUser');
	        var jinroNum = storage.get('jinroNumber') - 1;

	        //部屋情報取得
	        var jinroData = {};
	        jinroDS.child(ROOM).get(function(data){
	            jinroData = data;
	            $scope.num = jinroData.count.num;
	        });

	        $scope.getRole = function(){
	            jinroDS.child(ROOM).get(function(data){
	                jinroData = data;
	            });

	            setTimeout(function(){
	                var role = jinroData.current[jinroNum];
	                var action = role+':'+$scope.userName;
	                var member = jinroData.action;
	                member.push(action); //役職を保存
	                jinroDS.set(ROOM, {action:member, type:'role'});
	                storage.set("jinroRole", jinroData.role[role]);
	                $scope.role = jinroData.role[role].name;
	                $scope.ex = jinroData.role[role].ex;
	            },1000);
	        };
	        /*
	        * milkcocoaイベント
	        * */
	        jinroDS.on('set', function(data) {
	            if(data.value.type === 'role') {
	                var new_arr = _.union($scope.friends, data.value.action);
	                var names = UserModel.getNameList(data.value.action, 'obj');

	                console.log("role init", names);

	                $scope.$apply(function(){
	                    $scope.friends = names;
	                    if($scope.friends.length >= $scope.num) $scope.enter = 'on';
	                });
	            }else if(data.value.type === 'init'){
	             //   init();
	            }
	        });
	    }
	]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(18);

	angular.module('controllers').controller('RoomCtrl', [
	    '$scope',
	    '$location',
	    'UserModel',
	    'AccountModel',
	    'storage',
	    'RoomModel',

	    function ($scope, $location, UserModel, AccountModel, storage, RoomModel) {

	        //部屋を作成
	        $scope.create = function(){
	            RoomModel.init($scope.roomName, $scope.num);
	            $scope.enter = 'on';
	        };

	        //セレクトボックスの変更を監視
	        $scope.$watch('num', function(){
	            $scope.roomEx = __webpack_require__(20)($scope.num).mes;
	        });
	    }
	]);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	angular.module('controllers').controller('SigninCtrl', ['$scope', function ($scope) {
	    $scope.auth = function(){

	        alert();
	    }
	}]);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {'use strict';

	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(18);

	angular.module('controllers').controller('StandbyCtrl', [
	    '$scope',
	    '$location',
	    'UserModel',
	    'AccountModel',
	    'storage',
	    'RoomModel',

	    function ($scope, $location, UserModel, AccountModel, storage, RoomModel) {
	        $scope.room_name = $location.path().split('/').pop();
	        var jinroData = [];

	        //初期描画時
	        RoomModel.get($scope.room_name, function(data){
	            if(data){//データ取得時
	                $scope.$apply(function(){
	                    $scope.num = data.count.num;
	                    $scope.roomEx = data.count.ex;
	                    $scope.friends = data.users;
	                    console.log(data.users);
	                    jinroData = data;
	                });
	            }else{//エラー時
	                $scope.$apply(function(){
	                    $scope.error = 'room_empty';
	                });
	            }
	        });

	        //ユーザー情報取得
	        AccountModel.checkUser(function(err, user){
	            console.log('user',user);
	            if(err){
	                $scope.$apply(function(){
	                    $scope.error = 'not_login';
	                });
	                return;
	            }else{
	                //ユーザーログイン時
	                storage.set('jinroRoom', $scope.room_name); //ROOM情報をローカル保存
	                $scope.$apply(function(){
	                    $scope.userName = user.option.userName;
	                    $scope.twitterImg = '//www.paper-glasses.com/api/twipi/'+user.option.twitter;
	                });
	            }
	        });

	        //入室クリック時
	        $scope.userInit = function(){
	            //クリックしたタイミングでデータを最新に
	            RoomModel.get($scope.room_name, function(data){jinroData = data;});

	            if(jinroData.users.length >= $scope.num){
	                alert("定員オーバーです");
	                return;
	            }

	            $scope.init = 1;

	            setTimeout(function(){
	                jinroData.users.push($scope.userName);
	                console.log(jinroData.users);
	                jinroDS.set($scope.room_name, {users:jinroData.users, type: 'userInit'}); //サーバー上に保存
	                storage.set('jinroUser', $scope.userName); //ローカルに保存
	                storage.set('jinroNumber', jinroData.users.length); //ローカルに保存ユニーク番号
	                $scope.friends = jinroData.users;
	            },1000);
	        };

	        /*
	         * milkcocoaイベント
	         * */
	        jinroDS.on('set', function(data) {
	            //イントロページ
	            if(data.value.type && data.value.type === 'userInit') {
	                if (data.value.users[0]) { //自分以外
	                    console.log('setted! userInit', data.value.users);
	                    _.union($scope.friends, data.value.users);

	                    $scope.$apply(function(){
	                        $scope.friends = data.value.users;
	                        $scope.hideInit = 'on'; //初期化を隠す
	                        if($scope.friends.length === $scope.num) $scope.enter = 1;
	                    });
	                }
	            }
	        });
	    }
	]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	angular.module('services').factory('UserModel', [
	    'storage',

	    function (storage) {
	        var portals = {
	            //名前のリストを取得する role:name
	            getNameList: function(data, type){
	                var tmp = [], names = [], obj=[];
	                for(var i = 0, len = data.length; i < len; i++){
	                    tmp[i] = data[i].split(":");
	                    names[i] = tmp[i][1];
	                    obj[i] = {name: tmp[i][1], role:tmp[i][0]};
	                }

	                if(type) {
	                    return obj; //オブジェクトで返す
	                }else{
	                    return names; //配列で返す
	                }
	            },

	            //名前を取得する role:name
	            getParse: function(data){
	                var tmp = data.split(":");
	                return {
	                    role: tmp[0],
	                    name: tmp[1]
	                };
	            },

	            //役職交代 怪盗のみ
	            change: function(jinroData, role){
	                var action = jinroData.action;
	                var after = [];
	                var tmp = [];
	                var thief = "", target = "";

	                for(var i = 0, len = action.length; i < len; i++){
	                    tmp[i] = action[i].split(":");
	                    if(tmp[i][0] === 'thief')thief = tmp[i]; //自分
	                    if(tmp[i][0] === role)target = tmp[i]; //交換対称
	                }
	                for(var i = 0, len = action.length; i < len; i++){
	                    tmp[i] = action[i].split(":");
	                    if(tmp[i][0] === 'thief'){
	                        after[i] = target[0]+":"+thief[1];
	                    }else if(tmp[i][0] === role){
	                        after[i] = thief[0]+":"+target[1];
	                    }else{
	                        after[i] = action[i];
	                    }
	                }

	                return after;
	            },

	            //人狼or狂人
	            getPartner: function (type, data){
	                var target = '';
	                if(type === 'wolf'){
	                    type='crazy';
	                }else if(type === 'crazy'){
	                    type='wolf';
	                }

	                for (var i = 0, len = data.length; i < len; i++) {
	                    if ( data[i].indexOf(type) != -1) {
	                        target = data[i];
	                    }
	                }


	                if(target === ''){
	                    return 'none'; //狂人が居ない場合
	                }else {
	                    var tmp = target.split(':');
	                    return tmp[1];
	                }
	            }

	        };

	        return portals;
	    }
	]);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	angular.module('services').factory('AccountModel', [
	    'storage',

	    function (storage) {
	        return {
	            //アカウント登録
	            register: function(data, cb){
	                //ポイント
	                options.point = {
	                    total: 0,
	                    wp: 0
	                };
	                //プレイ回数
	                options.count = {
	                    total: 0,
	                    role: {
	                        wolf: 0,
	                        general: 0,
	                        crazy: 0,
	                        wizard: 0,
	                        fox: 0,
	                        thief: 0
	                    }
	                };

	                milkcocoa.addAccount(email, password, options, function(err, user) {
	                    switch (err) {
	                        case null:
	                            alert('正常に登録が完了しました。mlkcca.comからメールが来るので承認して下さい。');
	                            break;
	                        case MilkCocoa.Error.AddAccount.FormatError:
	                            alert('無効な書式のメールアドレスです。');
	                            break;
	                        case MilkCocoa.Error.AddAccount.AlreadyExist:
	                            alert('既に追加されているメールアドレスです。');
	                            break;
	                    }

	                    cb(err, user);
	                });
	            },

	            //アカウントログイン処理
	            login: function(email, password, cb){
	//                var userData = [];
	                milkcocoa.login(email, password, function(err, user) {
	                    if(err === MilkCocoa.Error.Login.FormatError) {
	                        alert('Emailの形式が無効です。');
	                    } else if (err === MilkCocoa.Error.Login.LoginError) {
	                        alert('登録されていないEmailか、無効なパスワードです。');
	                    } else if (err === MilkCocoa.Error.Login.EmailNotVerificated) {
	                        alert('まだアカウントは仮登録です');
	                    } else {
	                        //成功時はユーザIDを取得できます。
	                        storage.set('jinroToken', user.id); //アクセストークンをセットする
	                        cb(user);
	                    }
	                });
	            },

	            //アカウントログアウト処理
	            logout: function(){
	                milkcocoa.logout();
	            },

	            //ユーザーのログイン状況
	            checkUser: function(cb){
	                milkcocoa.getCurrentUser(function(err, user) {
	                    cb(err,user);
	                });
	            }

	        };

	    }
	]);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(19);

	angular.module('services').factory('AuthModel', [
	    '$http',
	    'UserModel',

	    function ($http, UserModel){
	        return {
	            //アカウント登録
	            register: function(userData, cb){

	//                var req = {
	//                    method: 'GET',
	//                    url: 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040',
	//                    headers:{
	//                        'Access-Control-Allow-Origin': '*',
	//                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	//                        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
	//                    }
	////
	//// headers: {
	////                        'Content-Type': undefined
	////                    },
	//
	////                    data: { test: 'test' },
	//                };
	//
	//                $http(req)
	//                    .success(function(data) {
	//                        console.log("data:",data);
	//                    })
	//                    .error(function(data, status) {
	//                        console.log("err:", status);
	//                    });
	                var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040';
	//                var url = 'http://otukutun-2.local:3000/users.json';

	                $http.get(url, {})
	                    .success(function(data) {
	                        console.log("data:",data);
	                    })
	                    .error(function(data, status) {
	                        console.log("err:", status);
	                    });
	            },

	            //アカウントログイン処理
	            login: function(userData, cb){

	            },

	            //アカウントログアウト処理
	            logout: function(){
	            },

	            //ユーザーのログイン状況
	            checkUser: function(){
	            }

	        };

	    }
	]);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	angular.module('services').factory('RoomModel', [
	    'storage',

	    function (storage) {
	        return {
	            //部屋の初期化
	            init: function(room_name, num){
	                if(!num){
	                    alert("人数を選択して下さい。");
	                    return;
	                }

	                var config = __webpack_require__(20)(num);
	                var init_data = __webpack_require__(22)(room_name, config.casting, config.mes);
	                shuffle(init_data.current); //シャッフル
	                jinroDS.set(room_name, init_data);

	                console.log("初期化しました",config.mes,room_name,num, init_data);

	                return config.mes;
	            },

	            //部屋情報を取得
	            get: function(room_id, cb){
	                jinroDS.child(room_id).get(function(data){
	                    cb(data);
	                });
	            },

	            set: function(){

	            },

	            getAll: function(){
	                //jinroDataStore.child({}).get(function(data){
	                //    return data;
	                //});
	            }

	        };

	    }
	]);

	//配列のシャッフル
	function shuffle(a){
	    var n = a.length;
	    for(var i = n - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var tmp = a[i];
	        a[i] = a[j];
	        a[j] = tmp;
	    }

	    return a;
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	angular.module('services').factory('UserModel', [
	    '$resource',

	    function($resource) {
	        //http://otukutun-2.local:3000/users/sign_in.json
	        var user = $resource('http://localhost:1337',{
	//       var user = $resource('http://otukutun-2.local:3000/users.json',{
	//        var user = $resource('http://otukutun-2.local:3000/users/sign_in.json',{
	//            id: '@id'
	        }, {
	            'save': {
	                method: 'POST',
	                params: {
	                    user: {
	                        email: 'hoge@hoge.com',
	                        password: 'fadfada',
	                        password_confrism: 'fadfadfa'
	                    }
	                }
	            },
	            'get': {
	                method: 'GET',
	                cache: true
	            },
	            'query': {
	                method: 'GET',
	                cache: true,
	                isArray: true
	            },
	            'update': {
	                method: 'PUT',
	                isArray: false
	            }
	        });

	        return user;
	    }
	]);



/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(num){
	    var mes = '';
	    var casting = [];

	    if(num === 1){//でばっぐ用途
	        casting = ['general'];
	        mes = "村人";
	    }else if(num === 2){//デバッグ用途
	        casting = ['wizard', 'wolf'];
	        mes = "占い師,人狼";
	    }else if(num === 3){
	        casting = ['general', 'wizard', 'wolf'];
	        mes = "村人,占い師,人狼";
	    }else if(num === 4){
	        casting = ['general', 'fox', 'thief', 'wolf'];
	        mes = "人狼,怪盗,妖狐,村人";
	    }else if(num === 5){
	        casting = ['general', 'wizard', 'thief', 'crazy', 'wolf'];
	        mes = "村人,怪盗,占い師,人狼,狂人";
	    }else if(num === 6){
	        casting = ['general', 'general', 'wizard', 'thief', 'crazy', 'wolf'];
	        mes = "村人(2),怪盗,占い師,人狼,狂人";
	    }else if(num === 7){
	        casting = ['general', 'general', 'wizard', 'thief', 'crazy', 'wolf', 'fox'];
	        mes = "村人(2),怪盗,占い師,人狼,狂人,妖狐";
	    }else if(num === 8){
	        casting = ['general', 'general', 'general', 'wizard', 'thief', 'crazy', 'wolf', 'fox'];
	        mes = "村人(3),怪盗,占い師,人狼,狂人,妖狐";
	    }
	    mes = "プレイヤーの役職内訳は"+mes+"です。";

	    return {
	        mes: mes,
	        casting: casting
	    };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.7.0
	//     http://underscorejs.org
	//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    concat           = ArrayProto.concat,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.7.0';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var createCallback = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  _.iteratee = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return createCallback(value, context, argCount);
	    if (_.isObject(value)) return _.matches(value);
	    return _.property(value);
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    if (obj == null) return obj;
	    iteratee = createCallback(iteratee, context);
	    var i, length = obj.length;
	    if (length === +length) {
	      for (i = 0; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    if (obj == null) return [];
	    iteratee = _.iteratee(iteratee, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length),
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  var reduceError = 'Reduce of empty array with no initial value';

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index = 0, currentKey;
	    if (arguments.length < 3) {
	      if (!length) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[index++] : index++];
	    }
	    for (; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== + obj.length && _.keys(obj),
	        index = (keys || obj).length,
	        currentKey;
	    if (arguments.length < 3) {
	      if (!index) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[--index] : --index];
	    }
	    while (index--) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var result;
	    predicate = _.iteratee(predicate, context);
	    _.some(obj, function(value, index, list) {
	      if (predicate(value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    if (obj == null) return results;
	    predicate = _.iteratee(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    if (obj == null) return true;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    if (obj == null) return false;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (obj.length !== +obj.length) obj = _.values(obj);
	    return _.indexOf(obj, target) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      return (isFunc ? method : value[method]).apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matches(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matches(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (obj.length !== +obj.length) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = array.length;
	    while (low < high) {
	      var mid = low + high >>> 1;
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (obj.length === +obj.length) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = _.iteratee(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    if (n < 0) return [];
	    return slice.call(array, 0, n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N. The **guard** check allows it to work with
	  // `_.map`.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return slice.call(array, Math.max(array.length - n, 0));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array. The **guard**
	  // check allows it to work with `_.map`.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, output) {
	    if (shallow && _.every(input, _.isArray)) {
	      return concat.apply(output, input);
	    }
	    for (var i = 0, length = input.length; i < length; i++) {
	      var value = input[i];
	      if (!_.isArray(value) && !_.isArguments(value)) {
	        if (!strict) output.push(value);
	      } else if (shallow) {
	        push.apply(output, value);
	      } else {
	        flatten(value, shallow, strict, output);
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false, []);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (array == null) return [];
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = array.length; i < length; i++) {
	      var value = array[i];
	      if (isSorted) {
	        if (!i || seen !== value) result.push(value);
	        seen = value;
	      } else if (iteratee) {
	        var computed = iteratee(value, i, array);
	        if (_.indexOf(seen, computed) < 0) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (_.indexOf(result, value) < 0) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true, []));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    if (array == null) return [];
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = array.length; i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(slice.call(arguments, 1), true, true, []);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function(array) {
	    if (array == null) return [];
	    var length = _.max(arguments, 'length').length;
	    var results = Array(length);
	    for (var i = 0; i < length; i++) {
	      results[i] = _.pluck(arguments, i);
	    }
	    return results;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    if (list == null) return {};
	    var result = {};
	    for (var i = 0, length = list.length; i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = function(array, item, isSorted) {
	    if (array == null) return -1;
	    var i = 0, length = array.length;
	    if (isSorted) {
	      if (typeof isSorted == 'number') {
	        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
	      } else {
	        i = _.sortedIndex(array, item);
	        return array[i] === item ? i : -1;
	      }
	    }
	    for (; i < length; i++) if (array[i] === item) return i;
	    return -1;
	  };

	  _.lastIndexOf = function(array, item, from) {
	    if (array == null) return -1;
	    var idx = array.length;
	    if (typeof from == 'number') {
	      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
	    }
	    while (--idx >= 0) if (array[idx] === item) return idx;
	    return -1;
	  };

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (arguments.length <= 1) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Reusable constructor function for prototype setting.
	  var Ctor = function(){};

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    var args, bound;
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    args = slice.call(arguments, 2);
	    bound = function() {
	      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
	      Ctor.prototype = func.prototype;
	      var self = new Ctor;
	      Ctor.prototype = null;
	      var result = func.apply(self, args.concat(slice.call(arguments)));
	      if (_.isObject(result)) return result;
	      return self;
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    return function() {
	      var position = 0;
	      var args = boundArgs.slice();
	      for (var i = 0, length = args.length; i < length; i++) {
	        if (args[i] === _) args[i] = arguments[position++];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return func.apply(this, args);
	    };
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = hasher ? hasher.apply(this, arguments) : key;
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last > 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed after being called N times.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed before being called N times.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      } else {
	        func = null;
	      }
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (hasOwnProperty.call(source, prop)) {
	            obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(obj, iteratee, context) {
	    var result = {}, key;
	    if (obj == null) return result;
	    if (_.isFunction(iteratee)) {
	      iteratee = createCallback(iteratee, context);
	      for (key in obj) {
	        var value = obj[key];
	        if (iteratee(value, key, obj)) result[key] = value;
	      }
	    } else {
	      var keys = concat.apply([], slice.call(arguments, 1));
	      obj = new Object(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        key = keys[i];
	        if (key in obj) result[key] = obj[key];
	      }
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      var source = arguments[i];
	      for (var prop in source) {
	        if (obj[prop] === void 0) obj[prop] = source[prop];
	      }
	    }
	    return obj;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (
	      aCtor !== bCtor &&
	      // Handle Object.create(x) cases
	      'constructor' in a && 'constructor' in b &&
	      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	        _.isFunction(bCtor) && bCtor instanceof bCtor)
	    ) {
	      return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size, result;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      size = a.length;
	      result = size === b.length;
	      if (result) {
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (size--) {
	          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	        }
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      size = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      result = _.keys(b).length === size;
	      if (result) {
	        while (size--) {
	          // Deep compare each member
	          key = keys[size];
	          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	        }
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
	    for (var key in obj) if (_.has(obj, key)) return false;
	    return true;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
	  if (true) {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = function(key) {
	    return function(obj) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
	  _.matches = function(attrs) {
	    var pairs = _.pairs(attrs), length = pairs.length;
	    return function(obj) {
	      if (obj == null) return !length;
	      obj = new Object(obj);
	      for (var i = 0; i < length; i++) {
	        var pair = pairs[i], key = pair[0];
	        if (pair[1] !== obj[key] || !(key in obj)) return false;
	      }
	      return true;
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = createCallback(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return _.isFunction(value) ? object[property]() : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(obj) {
	    return this._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result.call(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result.call(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result.call(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(room_name, casting, roomEx){
	  return {
	      room_id : room_name,
	      role : {
	          general: {
	              name: '村人',
	              ex: '特に能力は何も出来ません。画面を操作するフリをしてください。',
	              team: 'human',
	              role: 'general'
	          },
	          wizard:  {
	              name: '占い師',
	              ex: '占いで1人だけ正体を知ることが出来ます。',
	              team: 'human',
	              role: 'wizard'
	          },
	          thief:  {
	              name: '怪盗',
	              ex: '指名した１人と自分の役職を交換します。',
	              team: 'human',
	              role: 'thief'
	          },
	          crazy:  {
	              name: '狂人',
	              ex: '人間ですが、人狼の味方です。人狼と手を組み、人狼が人間側にばれないようにしましょう。',
	              team: 'wolf',
	              role: 'crazy'
	          },
	          wolf: {
	              name: '人狼',
	              ex: '人狼です。狂人と手を組んで人間側にばれないようにしましょう。',
	              team: 'wolf',
	              role: 'wolf'
	          },
	          fox: {
	              name: '妖狐',
	              ex: '妖狐は人狼側でも人間側でも無い第３勢力です。人狼と疑われて処刑対称になれば妖狐の勝ちです。',
	              team: 'fox',
	              role: 'fox'
	          }
	      },
	      users : [],
	      type: 'init',
	      count: {
	          num: casting.length,
	          ex: roomEx
	      },
	      current : casting,
	      action: [],
	      after: [],
	      actionCount: 0,
	      vote: [],
	      created: ''
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"LoginCtrl\">\n\n    <!--ログイン前-->\n    <div ng-hide=\"setLogin\" ng-cloak>\n        <strong>人狼ゲーム: ログイン</strong>\n\n        <label>メールアドレスを入力して下さい。</label>\n        <input type=\"text\" placeholder=\"例:hoge@hoge.com\" ng-model=\"email\" required />\n        <label>パスワードを入力して下さい。</label>\n        <input type=\"password\" placeholder=\"例:password\" ng-model=\"password\" required />\n\n        <p ng-if=\"!email||!password\">\n            入力項目が不完全です。\n        </p>\n        <button ng-click=\"loginUser()\" ng-if=\"email&&password\">\n            ログイン\n        </button>\n\n        <hr>\n        <p>登録がまだの方は...</p>\n        <a href=\"#/register\" class=\"laerge success button\">新規登録</a>\n\n    </div>\n\n    <!--ログイン後-->\n    <div ng-show=\"setLogin\" ng-cloak>\n        <strong>ログイン中です。</strong>\n        <p>こんにちは、{{userName}}さん</p>\n        <img src=\"//www.paper-glasses.com/api/twipi/{{twitter}}\" alt=\"twitter画像\"/>\n        <hr>\n        <a href=\"#/room\" class=\"large success button\">\n            部屋作成\n        </a>\n\n        <button ng-click=\"findRoom()\" class=\"large success button\">\n            部屋を探す\n        </button>\n\n        <ul ng-show=\"roomList\" ng-show=\"roomList[0]\">\n            <li ng-repeat=\"room in roomList\" ><a href=\"#/standby/{{room.room_id}}\">{{room.room_id}}</a></li>\n        </ul>\n        <p ng-show=\"roomList && !roomList[0]\">登録されている部屋がありません。</p>\n\n        <hr>\n        <br/>\n\n        <button ng-click=\"logoutUser()\" class=\"small alert button\">\n            ログアウト\n        </button>\n    </div>\n</div>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"RoomCtrl\">\n    <!--1st step-->\n    <div ng-hide=\"enter\">\n        <strong>人狼部屋を作ります (※全て必須項目)</strong>\n        <label>部屋の表示名を入力してください。</label>\n        <input type=\"text\" placeholder=\"例:のびすけ部屋\" ng-model=\"roomName\" required />\n        <label>人数を選択して下さい。</label>\n\n        <div ng-init=\"num = 4\"></div>\n        <div ng-init=\"hoge = [1,2,3,4,5,6,7,8]\"></div>\n        <select ng-model=\"num\" ng-options=\"c for c in hoge\">\n        </select><br/>\n\n        <p>{{num}}人部屋を作ります。</p>\n        <p>{{roomEx}}</p>\n\n        <button class=\"laerge round button\" ng-click=\"create()\">\n            部屋を作る\n        </button>\n    </div>\n\n    <!--2nd step-->\n    <div ng-show=\"enter\">\n        <div class=\"callout panel\">\n            <p>部屋名: {{roomName}}</p>\n            <p>人数: {{num}}人</p>\n            <p>内訳: <strong>{{roomEx}}</strong></p>\n        </div>\n\n        <a href=\"#/standby/{{roomName}}\" class=\"laerge round button\">\n            {{roomName}}へ\n        </a>\n\n    </div>\n</div>";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div ng-controller=\"StandbyCtrl\">\n\n    <!--エラー時-->\n    <div ng-if=\"error === 'room_empty'\">\n        <p>{{room_name}}は存在しません。</p>\n        <a href=\"#/login\" class=\"laerge round button\">\n            戻る\n        </a>\n    </div>\n\n    <!--通常時-->\n    <div ng-show=\"roomEx\">\n        <!--部屋情報-->\n\n        <div>\n            <p>部屋名: {{room_name}}</p>\n            <p>人数: {{num}}人</p>\n            <p>{{roomEx}}</p>\n        </div>\n\n        <hr/>\n\n        <!--参加者-->\n        <div>\n            <!--ログインしていない場合-->\n            <div ng-if=\"error === 'not_login'\">\n                <p>ログインしていません。ログインして下さい。</p>\n                <a href=\"#/login\" class=\"large success button\">\n                    ログイン\n                </a>\n            </div>\n\n            <!--ログイン済み-->\n            <div ng-if=\"error !== 'not_login'\" ng-cloak>\n                <p>\"{{userName}}\"でログイン済です。\n                <img src=\"{{twitterImg}}\" alt=\"twitter画像\"/>\n                </p>\n                <button ng-click=\"userInit()\" ng-hide=\"init\">入室する</button>\n            </div>\n\n            <div class=\"callout panel\">\n                <p>参加者が{{num}}人になったら開始します。</p>\n                <p>現在の参加者は<strong>{{friends.length}}</strong>名です。</p>\n                <p class=\"secondary round label\" ng-repeat=\"friend in friends\" >{{friend}}</p>\n            </div>\n            <a href=\"#/role\" class=\"laerge success button\" ng-show=\"enter\">ゲームスタート</a>\n\n        </div>\n    </div>\n\n\n\n\n</div>";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"PlayerCtrl\">\n\n    <div ng-hide=\"init\">\n        <label>プレイヤー名を入力してください。</label>\n        <input type=\"text\" placeholder=\"例:のびすけ\" ng-model=\"userName\" required>\n    </div>\n\n    <!--ユーザー名入力後-->\n    <div class=\"callout panel\" ng-show=\"userName\">\n        <p>ユーザー名は{{userName}}になります。</p>\n        <button ng-click=\"userInit()\" ng-hide=\"init\">確定</button>\n    </div>\n\n    <ul>\n        <li ng-repeat=\"friend in member\">{{friend}}</li>\n    </ul>\n\n</div>";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"RoleCtrl\">\n\n    <!--ユーザー名入力後-->\n    <div class=\"callout panel\">\n        <p>{{userName}}さんの役職は...\n            <strong>{{role}}</strong>\n            です。\n        </p>\n    </div>\n\n    <div ng-hide=\"role\">\n        <button class=\"laerge round button\" ng-click=\"getRole()\" ng-show=\"userName\">\n            役職を決める\n        </button>\n    </div>\n\n    <!--配役後-->\n    <div class=\"panel\" ng-show=\"role\">\n        <h3>役職解説</h3>\n        <p>{{ex}}</p>\n    </div>\n\n    <a href=\"#/ready\" class=\"laerge round button\" ng-show=\"enter\">\n        ゲームを始める\n    </a>\n\n    <hr>\n    <p>{{num}}人の役職が決まるまでお待ちください。</p>\n    <p class=\"secondary round label\" ng-repeat=\"friend in friends\" >{{friend.name}}さんの役職が決まりました。</p>\n\n</div>\n\n";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"ReadyCtrl\">\n    <div>\n        <div class=\"callout panel\">\n            <p>夜が来ました。役職毎にアクションをしてください。</p>\n        </div>\n\n        <div class=\"panel\">\n            <h3>役職解説: <strong>{{role}}</strong>{{userName}}</h3>\n            <p>{{ex}}</p>\n        </div>\n\n        <div ng-show=\"actionBtn\">\n\n            <div ng-if=\"type === 'thief'\">\n                交換する相手を選んでください。\n                <hr/>\n                <span ng-repeat=\"friend in friends\" ng-hide=\"message\">\n                    <button class=\"laerge round button\" ng-if=\"friend.name !== userName\" ng-click=\"getRole($index)\">{{friend.name}}</button>\n                </span>\n\n                <hr/>\n                <p>{{message}}</p>\n            </div>\n\n            <div ng-if=\"type === 'general'\">特にアクションはありません。</div>\n            <div ng-if=\"type === 'fox'\">特にアクションはありません。</div>\n\n            <div ng-if=\"type === 'wizard'\">\n                見る相手を選んでください。\n                <hr/>\n                <span ng-repeat=\"friend in friends\" ng-click=\"getRole($index)\" ng-hide=\"message\">\n                    <button class=\"laerge round button\" ng-if=\"friend.name !== userName\">{{friend.name}}</button>\n                </span>\n                <hr/>\n                <p>{{message}}</p>\n            </div>\n\n            <div ng-if=\"type === 'crazy'\">\n                人狼は{{partner}}さんです。\n            </div>\n\n            <div ng-if=\"type === 'wolf'\">\n                <p ng-if=\"partner !== 'none'\">狂人は{{partner}}さんです。</p>\n                <p ng-if=\"partner === 'none'\">このゲームでは狂人はいません。</p>\n            </div>\n\n        </div>\n\n        <br/>\n\n        <button class=\"laerge success button\" ng-hide=\"actionBtn\" ng-click=\"action()\">\n            アクションを起こす。\n        </button>\n\n        <button class=\"laerge alert button\" ng-if=\"actionBtn === 1\" ng-click=\"finishAction()\" ng-hide=\"btnHide\">\n            アクションを完了する。\n        </button>\n\n        <p ng-show=\"btnHide\">全員のアクションが完了するまで少々お待ちください。</p>\n\n        <a href=\"#/discuss\" class=\"laerge alert button\" ng-show=\"enter\">\n            ディスカッションへ\n        </a>\n\n    </div>\n\n</div>\n\n";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"DiscussCtrl\">\n\n    <div class=\"callout panel\">\n        <strong>ディスカッションをしてください。</strong>\n    </div>\n\n    <div class=\"panel\">\n        <p>{{num}}人ゲームで、</p>\n        <p>{{roomEx}}</p>\n    </div>\n\n    <div ng-show=\"enter\" ng-hide=\"voted\">\n        <select ng-model=\"target\" ng-options=\"c for c in friends\">\n        </select>\n        <br/>\n        <button ng-click=\"vote()\">{{target}}の処刑に投票する</button>\n    </div>\n\n    <div ng-show=\"voted\" ng-cloak>\n        <p>{{target}}に投票しました。</p>\n        <p>全員の投票が終わるまでお待ち下さい。</p>\n    </div>\n\n    <hr/>\n\n    <a href=\"#/finish\" class=\"laerge alert button\" ng-show=\"finish\">\n        結果へ。。。\n    </a>\n\n</div>\n\n";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"FinishCtrl\">\n\n    <!--1st step Open Vote-->\n    <button ng-click=\"voteResult()\" ng-hide=\"vote\">投票結果</button>\n    <ul ng-show=\"vote\">\n        <li ng-repeat=\"(key,item) in vote\" >{{key}}の投票数は{{item}}です。</li>\n    </ul>\n\n    <hr/>\n\n    <!--2nd step Open Result-->\n    <button ng-click=\"finish()\" ng-show=\"vote\" ng-hide=\"open\">答えあわせ</button>\n    <ul ng-show=\"open\">\n        <li ng-repeat=\"friend in friends\" >{{friend.name}} : {{friend.role}}</li>\n    </ul>\n\n    <button class=\"laerge success button\" ng-show=\"open\" ng-click=\"cloase()\">topにもどる</button>\n\n</div>";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"large-12 columns\" ng-controller=\"RegisterCtrl\">\n    <strong>ユーザー登録 (※全て必須項目)</strong>\n\n    <label>表示名を入力してください。</label>\n    <input type=\"text\" placeholder=\"例:のびすけ\" ng-model=\"user.userName\" required />\n    <!--<label>twitterのIDを入力して下さい。(@以下)</label>-->\n    <!--<input type=\"text\" placeholder=\"例:n0bisuke\" ng-model=\"twitter\" required />-->\n    <label>メールアドレスを入力して下さい。(確認メールが届きます。)</label>\n    <input type=\"text\" placeholder=\"例:hoge@hoge.com\" ng-model=\"user.email\" required />\n    <label>パスワードを入力して下さい。</label>\n    <input type=\"password\" placeholder=\"例:password\" ng-model=\"user.password\" required />\n    <label>確認用でパスワードを再入力して下さい。</label>\n    <input type=\"password\" placeholder=\"例:password\" ng-model=\"user.passwordCheck\" required />\n\n    <p ng-if=\"(!user.userName||!user.email||!user.password)||user.password!==user.passwordCheck\">\n        入力項目が不完全です。\n    </p>\n    <button ng-click=\"addUser()\" ng-if=\"(user.userName&&user.email&&user.password)&&user.password===user.passwordCheck\">\n        新規ユーザー登録\n    </button>\n\n    <a href=\"#/login\" class=\"tiny secondary button\">ログインへ</a>\n</div>";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div ng-controller=\"SigninCtrl\">\n    <input type=\"text\"/>\n    <button ng-click=\"auth()\">そうしんsss</button>\n    ほげほげほげ<br />\n    あああああああ<br />\n    ほげほげ<br />\n    ほげほげ\n</div>";

/***/ }
/******/ ])