//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamselect = document.getElementById("teamSelect");

// Handle form submission
form.addEventListener("submit", function (event) { 
  event.preventDefault();

  //get form values
  const name = nameInput.value;
  const team = teamselect.value;

  console.log(name, team);
});