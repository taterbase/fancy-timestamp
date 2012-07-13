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
  var dateString = "" + date.getDate();

  if(date.getDate() % 10 > 3 || date.getDate() % 10 === 0)
    dateString += "th";
  else if(date.getDate() === 3)
    dateString += "rd";
  else if(date.getDate() === 2)
    dateString += "nd";
  else if(date.getDate() === 1)
    dateString += "st";

  return dateString;
}

function getHourAndMeridiem(date, callback){
  var hour = "";
  var meridiem = "";

  if(date.getHours() < 13){
    meridiem = "am";

    if(date.getHours() !== 0){
      hour+= date.getHours();
    }
    else{
      hour = "12";
    }
  }
  else{
    meridiem = "pm";
    hour+= (date.getHours() - 12);
  }

  callback(hour, meridiem);
}

function getFancyTimestamp(timestamp, milliseconds){
  if(!milliseconds)
    timestamp = (timestamp * 1000);

  var date = new Date();
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
  else if(diff < 172800){ //Less than 2 days
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