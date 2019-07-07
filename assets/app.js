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
  var currentTime = moment();
  console.log(moment());
  var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
  var difference = currentTime.diff(moment(firstTrain));
  var minutesAway =



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
  $("#firstText").val("");
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
  //var minutesAway = 


  $("#trainSchedulesTable").append("<tr><td>" + trainName + '</td><td>' + destination + '</td><td>' + firstTrain + '</td><td>' + frequency + "</td><td></td>")

  /// Display current item in the console.
  console.log(current);
});
