const connectionIndicator = document.querySelector(".connection-status");
const connected = document.querySelector(".connected");
const notConnected = document.querySelector(".not-connected");

//Add an offline event to the window
window.addEventListener("offline", () => {

    connectionIndicator.classList.add("offline");
    connectionIndicator.classList.remove("online");
    notConnected.style.display = "flex";
    connected.style.display = "none";
});

//Add an online event to the window
window.addEventListener("online", () => {

    connectionIndicator.classList.add("online");
    connectionIndicator.classList.remove("offline");
    notConnected.style.display = "none";
    connected.style.display = "flex";
});