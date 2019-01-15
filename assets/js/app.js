// Instructions

// Make sure that your app suits this basic spec:

// When adding trains, administrators should be able to submit the following:
// Train Name
// Destination 
// First Train Time -- in military time
// Frequency -- in minutes
// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
// Styling and theme are completely up to you. Get Creative!


//set time

$(document).ready(function() {
    // firebase setup
    var config = {
        apiKey: "AIzaSyADHZ-RijiCpv2lJGWu4Aa1_fiWSwZnHi0",
        authDomain: "train-8254a.firebaseapp.com",
        databaseURL: "https://train-8254a.firebaseio.com",
        projectId: "train-8254a",
        storageBucket: "train-8254a.appspot.com"
        // messagingSenderId: "515446258222"
    
          };
          firebase.initializeApp(config);
    
    // variable to reference database
    var database = firebase.database();

    function calculateNextTrain(firstTrainTime, frequency){
        // First Time (push back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(rRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log(tRemainder);

    //Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    return {
        time: moment(nextTrain).format("HH:mm"),
        minutesAway: tMinutesTillTrain,
    }

    };
    // At the page load and subsequent value changes, get a snapshot of the local data.
    // This function allows you to update your page in real-time when the values within the firebase 
    // database.ref().on("value", function (snapshot) {});

    // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (childSnapshot) {
    database.ref().on("child_added", function(childSnapshot) {
        const firstTrainTime = childSnapshot.val().firstTrainTime;
        const frequency = childSnapshot.val().frequency

        const nextTrainInfo = calculateNextTrain(firstTrainTime, frequency);
        $("#tBody").append(`
        <tr>
        <td>${childSnapshot.val().trainName}</td>
        <td>${childSnapshot.val().destination}</td>
        <td>${frequency}</td>
        <td>${nextTrainInfo.time}</td>
        <td>${nextTrainInfo.minutesAway}</td>
        </tr>
        `)
        $(".form-control").val('');
    })

    //on click submit event handler do this when submit is clicked
    $("#train-form").on("submit", function (event) {

        // Prevent form from submitting
        event.preventDefault();

        // variables
        let trainName = $('#train-name').val().trim();
        let destination = $('#destination').val().trim();
        let frequency = $('#frequency').val().trim();
        let firstTrainTime = $('#first-train-time').val().trim();

        //calculate what time train arrives
        // let nextArrival =
        // calculate how many minutes away
        // let minutesAway =

        // append to firebase data
        database.ref().push({
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrainTime,
        });
    });
});
