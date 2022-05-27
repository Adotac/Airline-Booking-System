import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.scss'],
})
export class AdminFlightsComponent implements OnInit {
  // constructor() {}
  // @ViewChild('picker') picker: any;

  date!: Date;
  ngOnInit(): void {
    this.date = new Date(2021, 9, 4, 5, 6, 7);
  }
  //   (function () {
  //     var dateTimeController = function ($scope:any, $rootScope :any) {
  //         $scope.vm = {
  //             message: "Bootstrap DateTimePicker Directive",
  //             dateTime: {}
  //         };

  //         $scope.$watch('change', function(){
  //             console.log($scope.vm.dateTime);
  //         });

  //         /*
  //            $scope.$on('emit:dateTimePicker', function (e, value) {
  //            $scope.vm.dateTime = value.dateTime;
  //            console.log(value);
  //            })
  //         */
  //     };
  //     var dateTimePicker = function ($rootScope :any) {

  //         return {
  //             require: '?ngModel',
  //             restrict: 'AE',
  //             scope: {
  //                 pick12HourFormat: '@',
  //                 language: '@',
  //                 useCurrent: '@',
  //                 location: '@'
  //             },
  //             link: function (scope :any, elem:any, attrs:any) {
  //                 elem.datetimepicker({
  //                     pick12HourFormat: scope.pick12HourFormat,
  //                     language: scope.language,
  //                     useCurrent: scope.useCurrent
  //                 })

  //                 //Local event change
  //                 elem.on('blur', function () {

  //                     console.info('this', this);
  //                     console.info('scope', scope);
  //                     console.info('attrs', attrs);

  //                     /*// returns moments.js format object
  //                     scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
  //                     // Global change propagation

  //                     $rootScope.$broadcast("emit:dateTimePicker", {
  //                         location: scope.location,
  //                         action: 'changed',
  //                         dateTime: scope.dateTime,
  //                         example: scope.useCurrent
  //                     });
  //                     scope.$apply();*/
  //                 })
  //             }
  //         };
  //     }

  //     angular.module('dateTimeSandbox', []).run(['$rootScope', function ($rootScope:any) {
  //     }]).controller('dateTimeController', ['$scope', '$http', dateTimeController
  //     ]).directive('dateTimePicker', dateTimePicker);
  // })();
}
