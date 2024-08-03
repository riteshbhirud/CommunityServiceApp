document.addEventListener("DOMContentLoaded", () => {
  //retreiveTextBox Values 
  retrieveTextBoxVals();
  function navigate(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = "none";
    });

    // Show the requested view
    document.getElementById(viewId).style.display = "block";
  }
  // Initialize with the home view by default
  navigate("homeView");

  
  const profileInputs = document.querySelectorAll(".ProfileUpdate");
  const submitBtn = document.getElementById("ProfileSetButton");

//Submit button enabled/disabled
  profileInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      let anyFilled = false;
      profileInputs.forEach((input) => {
        if (input.value.trim() !== "") {
          anyFilled = true;
        }
      });
      submitBtn.disabled = !anyFilled;
    });
  });
  //using local storage for user details and getting all field details here
  document.getElementById("ProfileSetButton").addEventListener("click", setLcl);
  function setLcl(){
    const TextField = {
       Fname: document.getElementById("Fname").value,
        Lname: document.getElementById("Lname").value,
        EmailID: document.getElementById("EmailID").value,
        PhNum: document.getElementById("PhoneNum").value,
        ZipCode: document.getElementById("zipcodeText").value,
        Age: document.getElementById("AgeText").value,

    };
    window.localStorage.setItem("ProfileDetails",JSON.stringify(TextField));
  }
//function to retrieve the local storage values 
  function retrieveTextBoxVals(){
    const retrievedInfo = JSON.parse(window.localStorage.getItem("ProfileDetails"));
    document.getElementById("Fname").value = retrievedInfo.Fname;
    document.getElementById("Lname").value = retrievedInfo.Lname;
    document.getElementById("EmailID").value = retrievedInfo.EmailID;
    document.getElementById("PhoneNum").value = retrievedInfo.PhNum;
    document.getElementById("zipcodeText").value = retrievedInfo.ZipCode;
    document.getElementById("AgeText").value = retrievedInfo.Age;
    
  }

  // Navigation button event listeners
  document.getElementById("home").addEventListener("click", () => navigate("homeView"));
  document.getElementById("currentListings").addEventListener("click", () => navigate("currentListingsView"));
  document.getElementById("about").addEventListener("click", () => navigate("aboutView"));
  document.getElementById("myPage").addEventListener("click", () => navigate("myPageView"));
  document.getElementById("findListingsButton").addEventListener("click", () => navigate("currentListingsView"));

  

  // Image click handling for moving the clicked image to the beginning
  document.querySelectorAll(".image-container img").forEach((img) => {
    img.addEventListener("click", function () {
      const parent = this.parentNode;
      parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
    });
  });
});