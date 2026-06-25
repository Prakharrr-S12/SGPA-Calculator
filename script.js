(function(){
  const slides = document.querySelectorAll('.quote-slide');
  const dotsEl = document.getElementById('quoteDots');
  if(!slides.length || !dotsEl) return;

  let cur = 0, timer = null;
  const total = slides.length;

  // Build dots
  slides.forEach((_,i) => {
    const d = document.createElement('div');
    d.className = 'qdot' + (i===0?' on':'');
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  });

  function goTo(n) {
    slides[cur].classList.remove('active');
    dotsEl.children[cur].classList.remove('on');
    cur = (n + total) % total;
    slides[cur].classList.add('active');
    dotsEl.children[cur].classList.add('on');
    resetTimer();
  }

  function resetTimer() {
    if(timer) clearInterval(timer);
    timer = setInterval(() => goTo(cur + 1), 5500);
  }

  resetTimer();
})();


history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
});

function showFeedback() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("feedbackPage").style.display = "block";
    document.getElementById("review").style.display = "none";
    document.getElementById("instruction").style.display = "none";
}

function showHome() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    document.getElementById("feedbackPage").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("review").style.display = "block";
    document.getElementById("instruction").style.display = "block";
}

function showInstructions() {
    showHome();

    document.getElementById("instruction").scrollIntoView({
        behavior: "smooth"
    });
}

function showReviews() {
    showHome();

    document.getElementById("review").scrollIntoView({
        behavior: "smooth"
    });
}

// function printResult() {
//     const printContent = document.getElementById("resultSection").innerHTML;
//     const originalContent = document.body.innerHTML;

//     document.body.innerHTML = printContent;
//     window.print();
//     document.body.innerHTML = originalContent;

//     location.reload();
// }

function downloadResult() {
    html2canvas(document.getElementById("resultSection"), {
        ignoreElements: (element) =>
            element.classList.contains("button-container")
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "SGPA-Result.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

function toggleMenu(){
document
.getElementById("navMenu")
.classList.toggle("active");
}