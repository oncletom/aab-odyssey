"use strict";
var Utils = {};

/*
 * Date Functions
 */
Utils.date = {};

Utils.date.shiftDay = function shiftDay(date, days){
  return new Date(date.getTime() + ((parseInt(days, 10)*24) * 60*60*1000));
};

Utils.date.previousDay = function previousDay(date){
  return this.shiftDay(date, -1);
};

Utils.date.nextDay = function nextDay(date){
  return this.shiftDay(date, 1);
};