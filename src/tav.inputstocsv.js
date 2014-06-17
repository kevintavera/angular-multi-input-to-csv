'use strict';

angular.module('Tavera.InputsToCSV', [])
    .directive('tavInputsToCsv', function () {
        return {
            restrict: 'A',
            replace: false,
            scope: {label: '=', list: '=ngModel', range: '='},
            require: ["ngModel"],
            link: function (scope, element, attrs) {
                scope.$watch('range', function (value) {
                    scope.valueList = scope.list.split(',');
                    scope.items = [];
                    for (var i = 0; i < value; i++) {
                        scope.items.push({key: i, val: scope.valueList[i] != undefined ? scope.valueList[i] : ""});
                    }
                });
                scope.$watch('items', function (items) {
                    if (items == undefined || items.length == 0) return;
                    var arr = [];
                    angular.forEach(items, function (item) {if(item.val) arr.push(item.val); });
                    scope.list = arr.join();
                }, true);
            },
            template: '<div ng-if="range > 0" ng-repeat="item in items"> \
			<label>{{label}} {{$index+1}}</label> \
			<input ng-model="item.val" type="text" /> \
		    </div>'
        };
    });