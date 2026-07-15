// ============================
// PDF Tools - Premium Loader
// Part 1
// ============================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");
const mainContent = document.getElementById("mainContent");

const progressBar = document.getElementById("progressBar");
const percent = document.getElementById("percent");

const loadingText = document.getElementById("loadingText");
const status = document.getElementById("status");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

let progress = 0;

const timer = setInterval(() => {

progress++;

progressBar.style.width = progress + "%";
percent.innerText = progress + "%";

if(progress >= 15){

loadingText.innerText = "Initializing Engine...";
status.innerText = "⚡ Starting PDF Engine";

step1.innerHTML = "✅ Initializing Engine";

}

if(progress >= 45){

loadingText.innerText = "Loading Modules...";
status.innerText = "📦 Loading Required Modules";

step2.innerHTML = "✅ Loading Modules";

}

if(progress >= 75){

loadingText.innerText = "Preparing Tools...";
status.innerText = "🛠 Preparing PDF Workspace";

step3.innerHTML = "✅ Preparing Tools";

}
  // ============================
// PDF Tools - Premium Loader
// Part 2
// ============================

if (progress >= 100) {

    clearInterval(timer);

    loadingText.innerText = "Welcome!";
    status.innerText = "🚀 Launching PDF Tools...";

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.transform = "scale(1.05)";

        setTimeout(() => {

            loader.style.display = "none";

            mainContent.style.display = "block";

            mainContent.style.opacity = "0";

            mainContent.style.transform = "translateY(30px)";

            setTimeout(() => {

                mainContent.style.transition =
                "all .8s ease";

                mainContent.style.opacity = "1";

                mainContent.style.transform =
                "translateY(0)";

            },100);

        },700);

    },500);

}

},35);

});
// ============================
// PDF Tools - Extra Effects
// Part 3
// ============================

// Smooth Card Hover Animation

const cards = document.querySelectorAll(".tool-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,.18),
        rgba(255,255,255,.08) 60%)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background =
        "rgba(255,255,255,.08)";

    });

});

// Logo Animation

const logo = document.querySelector(".main-logo");

if (logo) {

    setInterval(() => {

        logo.animate([

            {
                transform:"translateY(0px)"
            },

            {
                transform:"translateY(-8px)"
            },

            {
                transform:"translateY(0px)"
            }

        ],{

            duration:2500,

            iterations:1

        });

    },2500);

}

// Console Message

console.log("%cPDF Tools","font-size:26px;color:#ff3b30;font-weight:bold;");
console.log("%cWebsite Made By Prince ❤️","font-size:14px;color:#ffffff;");
