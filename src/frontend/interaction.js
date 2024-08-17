document.addEventListener("DOMContentLoaded", () => {
  retrieveTextBoxVals();

  function navigate(viewId) {
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = "none";
    });
    document.getElementById(viewId).style.display = "block";
  }

  navigate("homeView");

  const profileInputs = document.querySelectorAll(".ProfileUpdate");
  const submitBtn = document.getElementById("ProfileSetButton");

  profileInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      let allFilled = true;
      profileInputs.forEach((input) => {
        if (input.value.trim() === "") {
          allFilled = false;
        }
      });
      submitBtn.disabled = !allFilled;
    });
  });

  document.getElementById("ProfileSetButton").addEventListener("click", async () => {
    const TextField = {
      Fname: document.getElementById("Fname").value,
      Lname: document.getElementById("Lname").value,
      EmailID: document.getElementById("EmailID").value,
      PhNum: document.getElementById("PhoneNum").value,
      ZipCode: document.getElementById("zipcodeText").value,
      Age: document.getElementById("AgeText").value,
    };

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TextField),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  });

  async function retrieveTextBoxVals() {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const retrievedInfo = await response.json();
        document.getElementById("Fname").value = retrievedInfo.Fname || "";
        document.getElementById("Lname").value = retrievedInfo.Lname || "";
        document.getElementById("EmailID").value = retrievedInfo.EmailID || "";
        document.getElementById("PhoneNum").value = retrievedInfo.PhNum || "";
        document.getElementById("zipcodeText").value = retrievedInfo.ZipCode || "";
        document.getElementById("AgeText").value = retrievedInfo.Age || "";
      } else {
        console.error("Error retrieving profile data");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  document.getElementById("home").addEventListener("click", () => navigate("homeView"));
  document.getElementById("currentListings").addEventListener("click", () => navigate("currentListingsView"));
  document.getElementById("about").addEventListener("click", () => navigate("aboutView"));
  document.getElementById("myPage").addEventListener("click", () => navigate("myPageView"));
  document.getElementById("findListingsButton").addEventListener("click", () => navigate("currentListingsView"));
});