var config = {
    apiKey: "AIzaSyDRij7ROGJYoTM7RYiqPLC-M1c1tWlybyI",
    authDomain: "train-schedule-dbe43.firebaseapp.com",
    databaseURL: "https://train-schedule-dbe43.firebaseio.com",
    projectId: "train-schedule-dbe43",
    storageBucket: "train-schedule-dbe43.appspot.com",
    messagingSenderId: "512083413661"
};
firebase.initializeApp(config);

var database = firebase.database();

// Global Variables
var name;
var destination;
var frequency;
var firstTime;
var nextArrival;
var minAway;

//On click to store user variables
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    name = $("#name").val();
    destination = $("#destination").val();
    frequency = $("#frequency").val();
    firstTime = $("#first-time").val();

    // calculate();

    //FireBase Variables
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
    })

    $("#name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");

})

// function calculate() {

// }

//Function to calculate and get remaining time until next arrival
database.ref().on("child_added", function (snapshot) {

    // $("#name").val("");
    // $("#destination").val("");
    // $("#first-time").val("");
    // $("#frequency").val("");
    var firstTime = snapshot.val().firstTime;
    var frequency = snapshot.val().frequency;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % frequency;

    var tMinutesTillTrain = frequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    nextTrain = moment(nextTrain).format("hh:mm");

    console.log(snapshot.val());

    // console.log(name);

    var newRow = $("<tr>");

    //Create new table value for each added element

    var newName = $("<td>");
    var newDestination = $("<td>");
    var newFrequency = $("<td>");
    var newNextArival = $("<td>");
    var newMinAway = $("<td>");

    newName.text(snapshot.val().name);
    newDestination.text(snapshot.val().destination);
    newFrequency.text(snapshot.val().frequency);
    newNextArival.text(nextTrain);
    newMinAway.text(tMinutesTillTrain);

    newRow.append(newName);
    newRow.append(newDestination);
    newRow.append(newFrequency);
    newRow.append(newNextArival);
    newRow.append(newMinAway);

    $("#train-stats").append(newRow);


})

