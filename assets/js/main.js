$(document).ready(function()
{
// Firebase Baby
var config = {
    apiKey: "AIzaSyADHZ-RijiCpv2lJGWu4Aa1_fiWSwZnHi0",
    authDomain: "train-8254a.firebaseapp.com",
    databaseURL: "https://train-8254a.firebaseio.com",
    projectId: "train-8254a",
    storageBucket: "train-8254a.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// Adding Train BTN

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var trainFreq = $("#req-input").val().trim();

    //local temp holding data object
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq,
    };

    //upload train data to the database
    database.ref().push(newTrain);

    //Alert
        alert("Train successfully added");

        //clear the text boxes
        $("#train-name-input").val("");
        $("#dest-inut").val("");
        $("#firstTrain-input").val("");
        $("#freq-input").val("");
});

        database.ref().on("child_added", function(childSnapshot, prevChildKey){
            console.log(childSnapshot.val());

            var trainName = childSnapshot.val().name;
            var trainDest = childSnapshot.val().destination;
            var firstTrain = childSnapshot.val().start;
            var trainFreq = childSnapshot.val().frequency;

            // Declare var
            var trainFreq;

            // time entered on form
            var firstTime = 0;

        var firstTimeConverted = moment(firstTime,"HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH.mm"));

        //diff between times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        //Time apart
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    //Mins until train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log ("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));

    // add each train's data into the table
    $("train-table > tbody").append("<tr><td>" + tMinutesTillTrain + "</td><td>" + trainFreq + 
"</td><td>" + moment(nextTrain).format("HH:MM") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

        });
    });