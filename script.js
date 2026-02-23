// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamselect = document.getElementById("teamSelect");

//Load saved data
let count = parseInt(localStorage.getItem("totalCount")) || 0;
const maxCount = 50;

// Update the overall count and progress bar on load
document.getElementById("attendeeCount").textContent = count;
document.getElementById("progressBar").style.width = (count / maxCount) * 100 + "%";

// Update the team counts from memory on load
["water", "zero", "power"].forEach(t => {
  const savedTeamCount = localStorage.getItem(t + "Count") || 0;
  if (document.getElementById(t + "Count")) {
      document.getElementById(t + "Count").textContent = savedTeamCount;
  }
});

//Setup Attendee List
let attendeeListArray = JSON.parse(localStorage.getItem("attendeeList")) || [];

// Create the list HTML dynamically and add it to the page
const listContainer = document.createElement("div");
listContainer.className = "team-stats"; 
listContainer.innerHTML = "<h3>Recent Check-Ins</h3><ul id='attendeeUl' style='list-style: none; text-align: left; padding: 0;'></ul>";
document.querySelector(".container").appendChild(listContainer);

const attendeeUl = document.getElementById("attendeeUl");

// Render any saved attendees to the list on load
attendeeListArray.forEach(person => {
  const li = document.createElement("li");
  li.textContent = `👤 ${person.name} - ${person.team}`;
  li.style.padding = "8px 0";
  li.style.borderBottom = "1px solid #e2e8f0";
  attendeeUl.appendChild(li);
});

// Handle form submission
form.addEventListener("submit", function (event) { 
  event.preventDefault();
  if (count >= maxCount) return;

  // Get form values
  const name = nameInput.value;
  const team = teamselect.value;
  const teamName = teamselect.selectedOptions[0].text;
  
  console.log(name, teamName);

  // Increment count
  count++;
  console.log("Total check-ins:", count);
  
  //Save to locaL Storage
  localStorage.setItem("totalCount", count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);
  document.getElementById("progressBar").style.width = percentage;

  // Show the updated total count on page
  document.getElementById("attendeeCount").textContent = count;

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Save team count to local storage
  localStorage.setItem(team + "Count", teamCounter.textContent);

  // Update Attendee List
  attendeeListArray.push({ name: name, team: teamName });
  localStorage.setItem("attendeeList", JSON.stringify(attendeeListArray));

  const li = document.createElement("li");
  li.textContent = `👤 ${name} - ${teamName}`;
  li.style.padding = "8px 0";
  li.style.borderBottom = "1px solid #e2e8f0";
  attendeeUl.prepend(li); 
  
  // Show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}`;  
  console.log(message);

  const greetingElement = document.getElementById("greeting");
  greetingElement.textContent = message;
  greetingElement.style.display = "block";
  greetingElement.classList.add("success-message");
  
  //clear the form for the next attendee
  form.reset();
});