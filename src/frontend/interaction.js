document.addEventListener("DOMContentLoaded", () => {
  function navigate(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = "none";
    });

    // Show the requested view
    document.getElementById(viewId).style.display = "block";
  }

  document.getElementById("home").addEventListener("click", () => navigate("homeView"));
  document.getElementById("Current Listings").addEventListener("click", () => navigate("CurrentListingsView"));
  document.getElementById("about").addEventListener("click", () => navigate("aboutView"));
  document.getElementById("myPage").addEventListener("click", () => navigate("myPageView"));

  // Initialize with the home view
  navigate("homeView");

  // Assuming your images are within a container with the class
  // 'image-container'
  document.querySelectorAll(".image-container img").forEach((img) => {
    img.addEventListener("click", function () {
      const parent = this.parentNode;
      parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
    });
  });
});