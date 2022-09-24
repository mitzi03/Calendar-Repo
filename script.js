const currentDate = moment().format('dddd MMMM Do, YYYY');
const currentTime = moment().format('hh:mm:ss a');
const currentHour = moment().format('HH');
let amPM = "AM";
let finalHour = "";
let timeMap = new Map();

$('#currentDay').text(currentDate);


// store local storage 

if (localStorage.getItem("mymap")) {
    timeMap = new Map(JSON.parse(localStorage.mymap));

} else {
    let timemap = new Map();
}


// shows time blocks 
for (let hour = 9; hour < 18; hour++) {

    // shows time, decsription and save button
    let timeBlock = $('<div>');

    // the hour column 
 if (hour < 12) {
        amPM = "AM";
    } else {
        amPM = "PM";
    }

    let timeDiv = $('<div>');
    if (hour > 12) {
        finalHour = hour - 12;
    } else {
        finalHour = hour;
    }

    if (finalHour < 10) {
    
        finalHour = "  " + finalHour;
    }

    timeDiv.text(finalHour + amPM);
    timeDiv.addClass('time-div');

    // description column
    let descriptionDiv = $("<div>");
    let textAreaForDiv = $("<textarea>");
    textAreaForDiv.attr('id', 'textarea' + hour);

    descriptionDiv.append(textAreaForDiv);
    descriptionDiv.addClass("description");
    descriptionDiv.css("width", "90%");

    // 3rd column
    let saveDiv = $("<div>");
    saveDiv.addClass("saveBtn ");
    saveDiv.attr('id', hour);


    // save button
    let saveIcon = $('<i>');
    saveIcon.addClass("fa fa-save");


    saveDiv.append(saveIcon);

    // append to timeblock div 
    timeBlock.append(timeDiv, descriptionDiv, saveDiv);

    timeBlock.addClass("time-block row");

    if (currentHour > hour) {

        // past = background grey
        timeBlock.addClass("past");

    } else if (currentHour < hour) {

        // future = the background green
        timeBlock.addClass("future");

    } else {

        // present = the background red
        timeBlock.addClass("present");
        
    }

    // add to the main container 
    $("#main-contain").append(timeBlock);



}



timeMap.forEach(function (text, key) {


    let textAreaVar = "#textarea" + key;
    document.querySelector(textAreaVar).value = text;

});




$(".saveBtn").on('click', function () {

    let textAreaVar = "#textarea" + (this.id);

    timeMap.set((this.id), document.querySelector(textAreaVar).value);

    localStorage.myMap = JSON.stringify(Array.from(timeMap.entries()));


});
