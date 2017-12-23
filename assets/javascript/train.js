  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAW8xKrK-lKVYL0XVU-aSDCXlervD2AyJ0",
    authDomain: "train-homework-86c81.firebaseapp.com",
    databaseURL: "https://train-homework-86c81.firebaseio.com",
    projectId: "train-homework-86c81",
    storageBucket: "",
    messagingSenderId: "245814889598"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "hh:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Prettify the train start
  var trainTimePretty = moment.unix(trainTime).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMin = moment().diff(moment.unix(trainTime, "HH:mm"), "minuetes");
  console.log(trainMin);

  // Calculate the total billed rate
  var minAway = trainTime - trainMin;
  console.log(minAway);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainTimePretty + "</td><td>" + trainMin + "</td><td>" + trainFreq + "</td><td>" + minAway + "</td></tr>");
});

var whistle


