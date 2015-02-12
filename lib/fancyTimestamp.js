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
  date = date.getDate();
  var suffix;

  if(date == 3 || date == 23)
    suffix = "rd";
  else if(date == 2 || date == 22)
    suffix = "nd";
  else if(date == 1 || date == 21 || date == 31)
    suffix = "st";
  else
    suffix = "th";

  return date + suffix;
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

  var timeString = "";

  var future = false;
  if(diff < 0){
    future = true;
    diff = diff * -1;
  }

  if(diff < 30){
    timeString = "Just now";
  }
  else if(diff < 60){
    timeString = diff.toString() + " seconds " + (future ? "away" : "ago");
  }
  else if(diff < 3600){
    timeString = (Math.floor(diff /60)).toString() + " minutes " + (future ? "away" : "ago");
  }
  else if(diff < 10800){
    var plural = "";
    if((diff/ 3600) >= 2 )
      plural = "s";
    timeString = "About "+(Math.floor(diff/3600))+ " hour" + plural + " " + (future ? "away" : "ago");
  }
  else if(diff < 86400 && Days[sDate.getDay()] === Days[date.getDay()]){ //Less than 24 hours

    getHourAndMeridiem(sDate, function(hour, meridiem){
      var minutes = getMinutes(sDate);

      timeString = hour + ":" + minutes + meridiem;
    });
  }
  else if(diff < 172800){ //Less than 2 days
    getHourAndMeridiem(sDate, function(hour, meridiem){
      var minutes = getMinutes(sDate);

      timeString = hour + ":" + minutes + meridiem + " " + (future ? "tomorrow" : "yesterday");
    });
  }
  else if( diff < 604800){ //Less than a week
    getHourAndMeridiem(sDate, function(hour, meridiem){
      var minutes = getMinutes(sDate);

      timeString = hour + ":" + minutes + meridiem + " on " + Days[sDate.getDay()];
    });
  }
  else if(Months[sDate.getMonth()] === Months[date.getMonth()]){ //More than a week but in the same month
    getHourAndMeridiem(sDate, function(hour, meridiem){
      var minutes = getMinutes(sDate);
      var date = getDate(sDate);

      timeString = hour + ":" + minutes + meridiem + " on " + Days[sDate.getDay()] + " the " + date;
    });
  }
  else if(sDate.getFullYear() === date.getFullYear()){
    getHourAndMeridiem(sDate, function(hour, meridiem){
      var minutes = getMinutes(sDate);
      var date = getDate(sDate);

      timeString = hour + ":" + minutes + meridiem + " on " + Days[sDate.getDay()] + ", " + Months[sDate.getMonth()] + " " + date;
    });
  }
  else{
    getHourAndMeridiem(sDate, function(hour, meridiem){
      var minutes = getMinutes(sDate);
      var date = getDate(sDate);

      timeString = hour + ":" + minutes + meridiem + " on " + Days[sDate.getDay()] + " the " + date + " of " + Months[sDate.getMonth()] + ", " + sDate.getFullYear();
    });
  }

  return timeString;
}

module.exports = getFancyTimestamp;
