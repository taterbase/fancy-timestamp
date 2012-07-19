"use strict";

var Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function getMinutes(date){
  if(date.getMinutes() < 10)
    return "0" + date.getMinutes();
  else
    return "" + date.getMinutes();
}

function getDate(date){
  switch (date.getDate()) {
    case 1: case 21: case 31: return date.getDate() + "st";
    case 2: case 22: return date.getDate() + "nd";
    case 3: case 23: return date.getDate() + "rd";
  }
  
  return date.getDate() + "th";
}

function getHourAndMeridiem(date, callback){
  var hour = date.getHours() % 12;
  var meridiem = (date.getHours() < 12) ? "am" : "pm";
  callback((hour?hour:12) + "", meridiem);
}

function getFancyTimestamp(timestamp, milliseconds){
  if(!milliseconds)
    timestamp = (timestamp * 1000);

  var date = new Date();
  var yesterday = new Date(date - 86400000);
  var sDate = new Date(timestamp);
  var diff = Math.floor(((date - sDate) / 1000));

  var minutes;
  var d;
  var timeString = "";

  if(diff < 30){
    timeString = "Just now";
  }
  else if(diff < 60){
    timeString = diff.toString() + " seconds ago";
  }
  else if(diff < 3600){
    timeString = (Math.floor(diff /60)).toString() + " minutes ago";
  }
  else if(diff < 21600){
    var plural = "";
    if((diff/ 3600) >= 2 )
      plural = "s";
    timeString = "About "+(Math.floor(diff/3600))+ " hour" + plural + " ago";
  }
  else if(diff < 86400 && Days[sDate.getDay()] === Days[date.getDay()]){ //Less than 24 hours
    
    getHourAndMeridiem(sDate, function(hour, meridiem){
      minutes = getMinutes(sDate);

      timeString = hour + ":" + minutes + meridiem;
    });
  }
  else if(diff < 172800 && sDate.getDate() == yesterday.getDate()){ //Less than 2 days
    getHourAndMeridiem(sDate, function(hour, meridiem){
      minutes = getMinutes(sDate);

      timeString = hour + ":" + minutes + meridiem + " yesterday";
    });
  }
  else if( diff < 604800){ //Less than a week
    getHourAndMeridiem(sDate, function(hour, meridiem){
      minutes = getMinutes(sDate);

      timeString = hour + ":" + minutes + meridiem + " on " + Days[sDate.getDay()];
    });
  }
  else if(sDate.getFullYear() === date.getFullYear()){
    minutes = getMinutes(sDate);
    d = getDate(sDate);
    
    timeString = Months[sDate.getMonth()] + " " + d;
  }
  else{
    minutes = getMinutes(sDate);
    d = getDate(sDate);
    
    timeString = Months[sDate.getMonth()] + " " + d + " " + sDate.getFullYear();
  }

  return timeString;
}

module.exports = getFancyTimestamp;
