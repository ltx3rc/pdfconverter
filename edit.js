// ===============================
// Prince PDF Tools - edit.js
// Part 1
// ===============================

const pdfInput = document.getElementById("pdfInput");
const chooseBtn = document.getElementById("chooseBtn");
const pdfName = document.getElementById("pdfName");
const previewBox = document.getElementById("previewBox");
const removeBtn = document.getElementById("removeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const loadingModal = document.getElementById("loadingModal");
const dropArea = document.getElementById("dropArea");

let selectedPDF = null;

// Choose PDF

chooseBtn.addEventListener("click", () => {

    pdfInput.click();

});

// File Selection

pdfInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {

        alert("Please select a PDF file.");

        return;

    }

    selectedPDF = file;

    showPDF();

});

// Show PDF Info

function showPDF() {

    pdfName.innerText = selectedPDF.name;

    previewBox.innerHTML = `

        <i class="fa-solid fa-file-pdf preview-icon"></i>

        <h3>${selectedPDF.name}</h3>

        <p>Size : ${(selectedPDF.size / 1024 / 1024).toFixed(2)} MB</p>

        <p>Ready to Edit</p>

    `;

}

// Drag Enter

["dragenter","dragover"].forEach(eventName=>{

    dropArea.addEventListener(eventName,(e)=>{

        e.preventDefault();

        dropArea.style.borderColor="#22c55e";

        dropArea.style.background="rgba(34,197,94,.10)";

    });

});

// Drag Leave

["dragleave","drop"].forEach(eventName=>{

    dropArea.addEventListener(eventName,(e)=>{

        e.preventDefault();

        dropArea.style.borderColor="#ef4444";

        dropArea.style.background="transparent";

    });

});

// Drop PDF

dropArea.addEventListener("drop",(e)=>{

    const file=e.dataTransfer.files[0];

    if(!file) return;

    if(file.type!=="application/pdf"){

        alert("Only PDF files are allowed.");

        return;

    }

    selectedPDF=file;

    showPDF();

});
// ===============================
// edit.js - Part 2
// ===============================

// Remove PDF

removeBtn.addEventListener("click",()=>{

    if(!selectedPDF){

        alert("No PDF Selected.");

        return;

    }

    if(confirm("Remove selected PDF?")){

        selectedPDF=null;

        pdfInput.value="";

        pdfName.innerText="No PDF Selected";

        previewBox.innerHTML=`

            <i class="fa-solid fa-file-pdf preview-icon"></i>

            <h3>Your PDF Preview</h3>

            <p>Upload a PDF to see its details here.</p>

        `;

    }

});

// Loading

function showLoading(){

    loadingModal.style.display="flex";

}

function hideLoading(){

    loadingModal.style.display="none";

}

// Tool Buttons

document.getElementById("mergeTool").addEventListener("click",()=>{

    alert("Merge PDF feature will be available soon.");

});

document.getElementById("splitTool").addEventListener("click",()=>{

    alert("Split PDF feature will be available soon.");

});

document.getElementById("rotateTool").addEventListener("click",()=>{

    alert("Rotate PDF feature will be available soon.");

});

document.getElementById("compressTool").addEventListener("click",()=>{

    alert("Compress PDF feature will be available soon.");

});

// Download Button

downloadBtn.addEventListener("click",()=>{

    if(!selectedPDF){

        alert("Please upload a PDF first.");

        return;

    }

    showLoading();

    setTimeout(()=>{

        hideLoading();

        alert("PDF editing features are under development.");

    },1500);

});
// ===============================
// edit.js - Part 3
// ===============================

// Future PDF Functions

async function mergePDFs(){

    alert("Merge PDF Coming Soon.");

}

async function splitPDF(){

    alert("Split PDF Coming Soon.");

}

async function rotatePDF(){

    alert("Rotate PDF Coming Soon.");

}

async function compressPDF(){

    alert("Compress PDF Coming Soon.");

}

// Keyboard Shortcuts

document.addEventListener("keydown",(e)=>{

    // Ctrl + O
    if(e.ctrlKey && e.key.toLowerCase()=="o"){

        e.preventDefault();

        pdfInput.click();

    }

    // Delete Key
    if(e.key==="Delete"){

        if(selectedPDF){

            removeBtn.click();

        }

    }

});

// Startup

window.addEventListener("load",()=>{

    console.log("Prince PDF Tools Loaded Successfully.");

});
