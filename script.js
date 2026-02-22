//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamselect = document.getElementById("teamSelect");

 //Track attendance
let count = 0;
const maxCOunt =50;

 // Handle form submission
form.addEventListener("submit", function (event) { 
  event.preventDefault();

  //get form values
  const name = nameInput.value;
  const team = teamselect.value;
  const teamName = teamselect.selectedOptions[0].text;
  
  console.log(name, teamName);

//Incement count
  count++;
  console.log("Total check-ins:", count);

 //Update progress bar
  const percentage = Math.round((count / maxCOunt) * 100) + "%";
  console.log('Progress: ${percentage}');

 //Update team counter
  const teamCounter = document.getElementById(team + "count");
  console.log(teamCounter);
  const current = parseInt(teamCounter.textContent);
});