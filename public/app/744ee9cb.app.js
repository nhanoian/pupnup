"use strict";angular.module("pupnupApp",["ngCookies","ngResource","ngSanitize","btford.socket-io","ui.router","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(a,b,c,d){b.otherwise("/"),c.html5Mode(!0),d.interceptors.push("authInterceptor")}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},c.get("token")&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status?(d.path("/login"),c.remove("token"),b.reject(a)):b.reject(a)}}}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$stateChangeStart",function(a,d){c.isLoggedInAsync(function(a){d.authenticate&&!a&&b.path("/login")})})}]),angular.module("pupnupApp").config(["$stateProvider",function(a){a.state("login",{url:"/login",templateUrl:"app/account/login/login.html",controller:"LoginCtrl"}).state("signup",{url:"/signup",templateUrl:"app/account/signup/signup.html",controller:"SignupCtrl"}).state("settings",{url:"/settings",templateUrl:"app/account/settings/settings.html",controller:"SettingsCtrl",authenticate:!0})}]),angular.module("pupnupApp").controller("LoginCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){a.errors.other=b.message})}}]),angular.module("pupnupApp").controller("SettingsCtrl",["$scope","User","Auth",function(a,b,c){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."})["catch"](function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password",a.message=""})}}]),angular.module("pupnupApp").controller("SignupCtrl",["$scope","Auth","$location",function(a,b,c){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.message})})}}]),angular.module("pupnupApp").controller("AdminCtrl",["$scope","$http","Auth","User",function(a,b,c,d){a.users=d.query(),a["delete"]=function(b){d.remove({id:b._id}),angular.forEach(a.users,function(c,d){c===b&&a.users.splice(d,1)})}}]),angular.module("pupnupApp").config(["$stateProvider",function(a){a.state("admin",{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminCtrl"})}]),angular.module("pupnupApp").controller("MainCtrl",["$scope","$http","socket",function(a,b,c){a.awesomeThings=[],c.syncUpdates("thing",a.awesomeThings),a.addThing=function(){""!==a.newThing&&(a.awesomeThings.push(a.newThing),a.awesomeThings.length>2?(a.awesomeThings=[],$(".twoPeople").show()):$(".twoPeople").hide(),a.newThing="")},a.deleteThing=function(b){a.awesomeThings.pop(b)},a.$on("$destroy",function(){c.unsyncUpdates("thing")}),a.awesomeDog=[],c.syncUpdates("dog",a.awesomeDog),a.addDog=function(){""!==a.newDog&&(a.awesomeDog.push(a.newDog),a.newDog="",a.awesomeDog.length>1&&(a.awesomeDog=[]))},a.deleteDog=function(b){a.awesomeDog.pop(b)},a.$on("$destroy",function(){c.unsyncUpdates("dog")}),a.percent1=function(){console.log($(".percent1").val()),a.percentOne=$(".percent1").val()},a.percent2=function(){a.percentTwo=$(".percent2").val()},a.percentCheck=function(){var b=parseInt(a.percentTwo)+parseInt(a.percentOne);console.log(b),100!=b&&alert("Ownership must equal 100%")},a.decision=function(){var a=[];console.log(this.thing),$(".drop").html(this.thing),a.push(this.thing),console.log(a)},a.breakup=function(){var a=[];console.log(this.thing),$(".adjustBreakUpButton").html(this.thing),a.push(this.thing),console.log(a)},a.majority=function(){a.decisionChoice=$(".majority").html(),console.log(a.decisionChoice),$(".majority").css("text-decoration","none"),$(".vote").css("text-decoration","line-through","green"),$(".ultimate").css("text-decoration","line-through"),$(".uni").css("text-decoration","line-through")},a.vote=function(){a.decisionChoice=$(".vote").html(),console.log(a.decisionChoice),$(".majority").css("text-decoration","line-through"),$(".vote").css("text-decoration","none"),$(".ultimate").css("text-decoration","line-through"),$(".uni").css("text-decoration","line-through")},a.ultimate=function(){a.decisionChoice=$(".drop").html(),console.log(a.decisionChoice),$(".majority").css("text-decoration","line-through"),$(".vote").css("text-decoration","line-through"),$(".ultimate").css("text-decoration","none"),$(".uni").css("text-decoration","line-through")},a.uni=function(){a.decisionChoice=$(".uni").html(),$(".majority").css("text-decoration","line-through"),$(".vote").css("text-decoration","line-through"),$(".ultimate").css("text-decoration","line-through"),$(".uni").css("text-decoration","none")},a.one=function(){a.breakupChoice=$(".adjustBreakUpButton").html()+" "+$(".getsEverything").html(),console.log(a.breakupChoice),$(".one").css("text-decoration","none"),$(".two").css("text-decoration","line-through"),$(".three").css("text-decoration","line-through")},a.two=function(){a.breakupChoice=$(".two").html(),$(".one").css("text-decoration","line-through"),$(".two").css("text-decoration","none"),$(".three").css("text-decoration","line-through")},a.three=function(){a.breakupChoice=$(".three").html(),$(".one").css("text-decoration","line-through"),$(".two").css("text-decoration","line-through"),$(".three").css("text-decoration","none")},a.pdf=function(b){var c=a.awesomeThings[0],d=a.awesomeThings[1],e=a.awesomeDog[0],f=(a.percentOne,a.percentTwo,{content:[{text:"PUP NUP AGREEMENT",style:"header"},{text:"PARTIES:",style:"titler"},{text:"1. "+c,style:"subbody"},{text:"2. "+d+" (together, the Family)",style:"subbody"},{text:"Background:",style:"titler"},{text:"We have agreed to work together to raise "+e+" (our Pet), and this sets out the basis on which we will work together raising our pet.",style:"body"},{text:"TERMS OF THIS AGREEMENT:",style:"titler"},{text:"1. Responsibility Share:",style:"titler"},{text:"1.1 We agree that the responsibility for caring for our pet will be divided among the Family as follows:",style:"body"},{text:"a. "+c+": "+a.percentOne+"%",style:"subbody"},{text:"b. "+d+": "+a.percentTwo+"%",style:"subbody"},{text:"2. Decision Making: ",style:"titler"},{text:"2.1. We agree that any decisions in relation to our pet will be made "+a.decisionChoice+".",style:"subbody"},{text:"3. Termination ",style:"titler"},{text:"3.1 If we cannot reach an agreement, or we decide we should not longer own "+e+", we agree that"+a.breakupChoice,style:"subbody"},{text:"4. Other ",style:"titler"},{text:"4.1 No infringing or unauthorized changes: Each Family Member must make sure that any property that they purchase is owned by them or a related party that they own and control.",style:"subbody"},{text:"4.2 No assignment: No Family Member is allowed to transfer their interest in the Project to someone else unless we all agree",style:"subbody"},{text:"DATED: "+new Date,style:"date"},{text:c,style:"signature"},{text:"_______________________________________________________",style:"signature"},{text:d,style:"signature"},{text:"_______________________________________________________",style:"signature"}],styles:{header:{fontSize:22,bold:!0,alignment:"center",margin:10},date:{margin:[5,20,0,0]},title:{fontSize:18,bold:!0,margin:10},titler:{fontSize:14,bold:!0,margin:10},body:{margin:[20,0,0,0]},subbody:{margin:[25,0,0,0]},signature:{margin:10}}});pdfMake.createPdf(f).open()}}]),angular.module("pupnupApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("pupnupApp").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q",function(a,b,c,d,e,f){var g={};return e.get("token")&&(g=d.get()),{login:function(a,b){var h=b||angular.noop,i=f.defer();return c.post("/auth/local",{email:a.email,password:a.password}).success(function(a){return e.put("token",a.token),g=d.get(),i.resolve(a),h()}).error(function(a){return this.logout(),i.reject(a),h(a)}.bind(this)),i.promise},logout:function(){e.remove("token"),g={}},createUser:function(a,b){var c=b||angular.noop;return d.save(a,function(b){return e.put("token",b.token),g=d.get(),c(a)},function(a){return this.logout(),c(a)}.bind(this)).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.changePassword({id:g._id},{oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},getCurrentUser:function(){return g},isLoggedIn:function(){return g.hasOwnProperty("role")},isLoggedInAsync:function(a){g.hasOwnProperty("$promise")?g.$promise.then(function(){a(!0)})["catch"](function(){a(!1)}):a(g.hasOwnProperty("role")?!0:!1)},isAdmin:function(){return"admin"===g.role},getToken:function(){return e.get("token")}}}]),angular.module("pupnupApp").factory("User",["$resource",function(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("pupnupApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("pupnupApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}}),angular.module("pupnupApp").controller("NavbarCtrl",["$scope","$location","Auth",function(a,b,c){a.menu=[{title:"Home",link:"/"}],a.isCollapsed=!0,a.isLoggedIn=c.isLoggedIn,a.isAdmin=c.isAdmin,a.getCurrentUser=c.getCurrentUser,a.logout=function(){c.logout(),b.path("/login")},a.isActive=function(a){return a===b.path()}}]),angular.module("pupnupApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]),angular.module("pupnupApp").run(["$templateCache",function(a){a.put("app/account/login/login.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@test.com</code> / <code>test</code></p><p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=user.password required></div><div class="form-group has-error"><p class=help-block ng-show="form.email.$error.required && form.password.$error.required && submitted">Please enter your email and password.</p><p class=help-block ng-show="form.email.$error.email && submitted">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Login</button> <a class="btn btn-default btn-lg btn-register" href=/signup>Register</a></div></form></div></div><hr></div>'),a.put("app/account/settings/settings.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class="btn btn-lg btn-primary" type=submit>Save changes</button></form></div></div></div>'),a.put("app/account/signup/signup.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class="{ \'has-success\': form.name.$valid && submitted,\n                                            \'has-error\': form.name.$invalid && submitted }"><label>Name</label><input name=name class=form-control ng-model=user.name required><p class=help-block ng-show="form.name.$error.required && submitted">A name is required</p></div><div class=form-group ng-class="{ \'has-success\': form.email.$valid && submitted,\n                                            \'has-error\': form.email.$invalid && submitted }"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show="form.email.$error.email && submitted">Doesn\'t look like a valid email.</p><p class=help-block ng-show="form.email.$error.required && submitted">What\'s your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class="{ \'has-success\': form.password.$valid && submitted,\n                                            \'has-error\': form.password.$invalid && submitted }"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show="(form.password.$error.minlength || form.password.$error.required) && submitted">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Sign up</button> <a class="btn btn-default btn-lg btn-register" href=/login>Login</a></div></form></div></div><hr></div>'),a.put("app/admin/admin.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p><ul class=list-group><li class=list-group-item ng-repeat="user in users"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class="glyphicon glyphicon-trash pull-right"></span></a></li></ul></div>'),a.put("app/main/main.html",'<!-- <div ng-include="\'components/navbar/navbar.html\'"></div> --><header class=hero-unit id=banner><div class=container><h1>Welcome to PuppyNup.com</h1><p class=lead>Owning a pet is one of the most exciting parts of a relationship.<br>Answer these 5 questions so you can focus on loving those little puppy dog eyes.</p><!-- <img src="assets/images/d535427a.yeoman.png" alt="I\'m Yeoman"> --></div><!-- Standard button --><button type=button class="btn btn-default start">Get Started Now</button></header><div class=container><!-- Who is involved in the relationship --><div class=row id=who><div class="col-md-8 col-md-offset-2"><h1 class="page-header who">In the relationship between?</h1><ul class="col-md-12 col-lg-12 col-sm-12" ng-repeat="thing in awesomeThings"><li><p href=# tooltip={{thing.info}}>{{thing}}<button type=button class=close ng-click=deleteThing(thing)>&times;</button></p></li></ul><form class=thing-form><p class=input-group><input class=form-control placeholder="Add a name here" ng-model=newThing> <span class=input-group-btn ng-click=addThing()><button type=submit class="btn btn-primary" ng-click=addThing()></button></span><hr></p><p>(Please press \'enter\' after typing each name)</p></form><button type=button class="whor btn btn-default btn-lg next">Next</button></div></div><!-- The Dog Section Begins Here --><div class="row dog" id=dog><div class="col-md-8 col-md-offset-2"><h1 class="page-header dog">We have named our puppy...</h1><ul class="col-md-12 col-lg-12 col-sm-12" ng-repeat="dog in awesomeDog"><li><a href=# tooltip={{dog.info}}>{{dog}}<button type=button class=close ng-click=deleteDog(dog)>&times;</button></a></li></ul><form class=thing-form><p class=input-group><input class=form-control placeholder="Add a name here" ng-model=newDog> <span class=input-group-btn><button type=submit class="btn btn-primary" ng-click=addDog()></button></span></p><p class=twoPeople>We currently allow only 2 owners</p><hr><p>(Please press \'enter\' after typing each name)</p></form><button type=button class="dogr btn btn-default btn-lg next">Next</button></div></div><!-- The percentage of ownership responsibility --><div class=row id=owner><div class="col-md-8 col-md-offset-2"><h1 class="page-header owner" tooltip={{dog.info}}>We will split responsibilites... <span ng-repeat="dog in awesomeDog"><span tooltip={{dog.info}}>{{dog.name}}</span></span></h1><ul class="col-md-12 col-lg-12 col-sm-6"><li class=percentage><span href=# tooltip={{thing.info}}>{{awesomeThings[0]}}<input type=number class="percent percent1 form-control" placeholder=% ng-change=percent1() ng-model=newPercentage1>%</span></li><li class=percentage><span href=# tooltip={{thing.info}}>{{awesomeThings[1]}}<input type=number class="percent percent2 form-control" placeholder=% ng-change=percent2() ng-model=newPercentage2>%</span></li></ul><!-- <h4>Edit your team members</h4> --><button type=button ng-click=percentCheck() class="ownerr btn btn-default btn-lg next">Next</button></div></div><!-- How will you make decisions --><div class=row id=how><div class="col-md-8 col-md-offset-2"><h1 class=how tooltip="">...and make decisions by...</h1><hr class=title><h4 class="majority decision" ng-click=majority()>by majority of family</h4><h4 class="vote decision" ng-click=vote()>by majority of voting percentage</h4><h4 class="ultimate decision" ng-click=ultimate()><span><div class="dropdown whoDrop"><button class="btn drop btn-default dropdown-toggle" type=button id=dropdownMenu1 data-toggle=dropdown aria-expanded=true>__________________</button><ul aria-labelledby=dropdownMenu1 role=menu class="dropdown-menu col-md-12 col-lg-12 col-sm-12"><li ng-repeat="thing in awesomeThings" ng-click=decision()>{{thing}}</li></ul></div><span class=theboss>, is the boss and will ultimately make the decisions.</span></span></h4><h4 class="uni decision" ng-click=uni()>Unanimously</h4><!-- <h4>Other</h4> --><button type=button class="howr btn btn-default btn-lg next">Next</button></div></div><!-- What happens in event of a breakup --><div class=row id=breakup><div class="col-md-8 col-md-offset-2"><h1 class=breakup tooltip="">We hope this never happens.</h1><p>(But in the event of a breakup...)</p><hr class=title><h4 class="one decision" ng-click=one()><div class="dropdown whoDrop"><button class="btn adjustBreakUpButton btn-default dropdown-toggle" type=button id=dropdownMenu1 data-toggle=dropdown aria-expanded=true>__________________</button><ul aria-labelledby=dropdownMenu1 role=menu class="dropdown-menu col-md-12 col-lg-12 col-sm-12"><li ng-repeat="thing in awesomeThings" ng-click=breakup()>{{thing}}</li></ul></div><span class=getsEverything>gets everything</span></h4><h4 class="two decision" ng-click=two()>each of us will get the chance to offer to take care of our pet.</h4><h4 class="three decision" ng-click=three()>we will share our pet based on the percentage of ownership.</h4><button type=button class="btn btn-default btn-lg next breakupr">Next</button></div></div><!-- Final Page --></div><div class=row id=final><div class="col-md-6 col-md-offset-1"><h1 class=final tooltip="">That was easy, click below to view your customized PupNup</h1><p>(Although Pup Nup is 100% free. We ask you to share!)</p><button type=button ng-click=pdf() class="btn btn-default btn-lg start">Get Your Pup Nup</button></div></div><footer class=footer><div class=container><p>PupNup 2015</p></div></footer><script>$(\'.start\').click(function(){\n    $(\'#who\').goTo();\n  });\n  $(\'.whor\').click(function(){\n    console.log(\'success\');\n    $(\'#dog\').goTo();\n  });\n  $(\'.dogr\').click(function(){\n    console.log(\'success\');\n    $(\'#owner\').goTo();\n  });\n  $(\'.ownerr\').click(function(){\n    console.log(\'success\');\n    $(\'#how\').goTo();\n  });\n  $(\'.howr\').click(function(){\n    console.log(\'success\');\n    $(\'#breakup\').goTo();\n  });\n  $(\'.breakupr\').click(function(){\n    console.log(\'success\');\n    $(\'#final\').goTo();\n  });\n  \n  (function($) {\n      $.fn.goTo = function() {\n          $(\'html, body\').animate({\n              scrollTop: $(this).offset().top + \'px\'\n          }, \'slow\');\n          return this; // for chaining...\n      }\n  })(jQuery);\n   (function($) {\n      $.fn.goUp = function() {\n          $(\'html, body\').animate({\n              scrollTop: $(this).offset().bottom + \'px\'\n          }, \'slow\');\n          return this; // for chaining...\n      }\n  })(jQuery);</script>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>pupnup</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li><li ng-show=isAdmin() ng-class="{active: isActive(\'/admin\')}"><a href=/admin>Admin</a></li></ul><ul class="nav navbar-nav navbar-right"><li ng-hide=isLoggedIn() ng-class="{active: isActive(\'/signup\')}"><a href=/signup>Sign up</a></li><li ng-hide=isLoggedIn() ng-class="{active: isActive(\'/login\')}"><a href=/login>Login</a></li><li ng-show=isLoggedIn()><p class=navbar-text>Hello {{ getCurrentUser().name }}</p></li><li ng-show=isLoggedIn() ng-class="{active: isActive(\'/settings\')}"><a href=/settings><span class="glyphicon glyphicon-cog"></span></a></li><li ng-show=isLoggedIn() ng-class="{active: isActive(\'/logout\')}"><a href="" ng-click=logout()>Logout</a></li></ul></div></div></div>')}]);