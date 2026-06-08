function sendFeedback() {
    let text = document.getElementById("feedbackText").value;

    if(text.trim() === "") {
        alert("Please write feedback first");
        return;
    }

    alert("Thanks for your feedback!");
    console.log(text);
}