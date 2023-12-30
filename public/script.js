document.addEventListener("click", function (event) {
  // Check if the clicked element is a button
  if (event.target.tagName === "BUTTON") {
    const buttonId = event.target.id;

    switch (buttonId) {
      case "btn-login":
        window.location.href = "/login";
        break;
      case "btn-logout":
        window.location.href = "/logout";
        console.log("clicked");
        break;
    }
  }
});
