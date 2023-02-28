function fixTimeToTwelve(time){
    if(time <= 1130){
        var timeStr = time.toString();
        timeStr = timeStr.substring(0,timeStr.length-2) + ":" + timeStr.substring(timeStr.length-2) + " AM";
    }
    else if(time >= 1200 && time < 1300){
        var timeStr = time.toString();
        timeStr = timeStr.substring(0,timeStr.length-2) + ":" + timeStr.substring(timeStr.length-2) + " PM";
    }
    else{
        var timeStr = time.toString()
        var hour = timeStr.substring(0,timeStr.length-2);
        hour = parseInt(hour)-12;
        timeStr = hour.toString() + ":" + timeStr.substring(timeStr.length-2) + " PM";
    }
    return timeStr
}
function fixTimeToTwentyFour(time){
    if(time.includes("AM")){
        var timeStr = time.toString();
        timeStr = timeStr.replace(":","").replace(" AM","");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }
    else if(time.includes("12")){
        var timeStr = time.toString();
        timeStr = timeStr.replace(":","").replace(" AM","");
    }
    else{
        var timeStr = time.toString()
        timeStr = timeStr.replace(":","").replace(" PM","");
        var hour = timeStr.substring(0,timeStr.length-2);
        hour = 12 + parseInt(hour);
        timeStr = hour.toString() + timeStr.substring(timeStr.length-2);
    }
    return parseInt(timeStr)
}

console.log(fixTimeToTwelve(1530));
console.log(fixTimeToTwelve(1930));
console.log(fixTimeToTwelve(800));
console.log(fixTimeToTwelve(1200));
console.log(fixTimeToTwelve(1230));


console.log(fixTimeToTwentyFour("3:30 PM"));
console.log(fixTimeToTwentyFour("7:30 PM"));
console.log(fixTimeToTwentyFour("8:00 AM"));
console.log(fixTimeToTwentyFour("12:00 PM"));
console.log(fixTimeToTwentyFour("12:30 PM"));

