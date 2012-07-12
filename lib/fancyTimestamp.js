"use strict";

var Days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  abbr: {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat"
  }
};

var Months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
  abbr: {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec"
  }
};

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

  var timeString = "";

  if(diff < 30){
    timeString = "Just Now!";
  }
  else if(diff < 60){
    timeString = diff.toString() + " seconds ago";
  }
  else if(diff < 3600){
    timeString = (Math.floor(diff /60)).toString() + " minutes ago";
  }
  else if(diff < 10800){
    var plural = "";
    if((diff/ 3600) >= 2 )
      plural = "s";
    return console.log("About "+(Math.floor(diff/3600))+ " hour" + plural + " ago");
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

      timeString = hour + ":" + minutes + meridiem + " yesterday";
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