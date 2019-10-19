// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyATbmCERD6MJd8jZOcJy_qTTXYGkPQRPrQ",
  authDomain: "apayton-baaf4.firebaseapp.com",
  databaseURL: "https://apayton-baaf4.firebaseio.com",
  projectId: "apayton-baaf4",
  storageBucket: "",
  messagingSenderId: "204631347713",
  appId: "1:204631347713:web:6adeaec970c21b1f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




$("#submit").on("click", function () {

  var trainName = $("#trainNameText").val();
  var destination = $("#destinationText").val();
  var firstTrain = $("#firstTrainText").val();
  var frequency = $("#frequencyText").val();

  console.log('Name: ' + trainName);
  console.log('Destination: ' + destination);
  console.log('First Train: ' + firstTrain);
  console.log('Frequency: ' + frequency);

  firebase.database().ref().push({
    name: trainName,
    destination: destination,
    frequency: frequency,
    firstTrainTime: firstTrain
  });

  /// Clear text elements.
  $("#trainNameText").val("");
  $("#destinationText").val("");
  $("#firstTrainText").val("");
  $("#frequencyText").val("");
})



firebase.database().ref().on('child_added', function (snapshot) {
  /// Get the current item.
  var current = snapshot.val();

  /// Display the values from the current item as a row in the train schedules' table.
  var trainName = current.name;
  var destination = current.destination;
  var firstTrain = current.firstTrainTime;
  var frequency = current.frequency;

  var firstTrainTimeArray = firstTrain.split( ':' );
  var firstTrainTime = moment().hours( firstTrainTimeArray[ 0 ] ).minutes( firstTrainTimeArray[ 1 ] );

  var trainMinutes;
  var trainArrival;
  var maxTrainTime = moment.max( moment(), firstTrainTime );

  if ( maxTrainTime === firstTrainTime ) {
    trainArrival = firstTrainTime.format( "hh:mm A" );
    trainMinutes = firstTrainTime.diff( moment(), "minutes" );
  } else {
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var differenceTimes = moment().diff( firstTrainTime, "minutes");
    var trainRemainder = differenceTimes % frequency;
    trainMinutes = frequency - trainRemainder;

    // To calculate the arrival time, add the tMinutes to the current time
    trainArrival = moment()
      .add( trainMinutes, "m" )
      .format( "hh:mm A" );
  }

  console.log( "Train Minutes: ", trainMinutes );
  console.log( "Train Arrival: ", trainArrival );


  $("#trainSchedulesTable").append(
    '<tr>' + 
      '<td>' + trainName + '</td>' + 
      '<td>' + destination + '</td>' + 
      '<td>' + frequency + '</td>' + 
      '<td>' + trainArrival + '</td>' + 
      '<td>' + trainMinutes + '</td>' + 
    '</tr>'
  );

  /// Display current item in the console.
  console.log(current);
});
