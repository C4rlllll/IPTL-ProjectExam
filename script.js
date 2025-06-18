document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullname").value.trim();
  const password = document.getElementById("password").value.trim();

  const url =
    "https://script.google.com/macros/s/AKfycbyzxrP8omJ0bsuvh0lzGzITvvuHcEReDZXrxvCCgTS6LxwKv1EYKac8HZ0RXZ8rG6gZ/exec" +
    "?name=" +
    encodeURIComponent(name) +
    "&password=" +
    encodeURIComponent(password);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        localStorage.setItem("fullName", name);

        window.location.href = "mainTab.html";
      } else {
        document.getElementById("loginMessage").textContent =
          "Invalid credentials.";
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("loginMessage").textContent =
        "Error connecting to server.";
    });
});
