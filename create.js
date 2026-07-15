const imageInput = document.getElementById("imageInput");
const previewContainer = document.getElementById("previewContainer");
const createBtn = document.getElementById("createBtn");

const pageSize = document.getElementById("pageSize");
const orientation = document.getElementById("orientation");
const quality = document.getElementById("quality");

const loadingModal = document.getElementById("loadingModal");
const loadingProgress = document.getElementById("loadingProgress");

let selectedImages = [];

imageInput.addEventListener("change", () => {

    selectedImages = Array.from(imageInput.files);

    previewContainer.innerHTML = "";

    if(selectedImages.length === 0){

        previewContainer.innerHTML =
        "<p class='empty-text'>No images selected.</p>";

        return;

    }

    selectedImages.forEach((file,index)=>{

        const reader = new FileReader();

        reader.onload = e=>{

            const card = document.createElement("div");

            card.className = "preview-item";

            card.innerHTML = `
                <img src="${e.target.result}">
                <span>${index+1}</span>
            `;

            previewContainer.appendChild(card);

        };

        reader.readAsDataURL(file);

    });

});

createBtn.addEventListener("click", async()=>{

    if(selectedImages.length===0){

        alert("Please select images first.");

        return;

    }

    loadingModal.style.display="flex";
    loadingProgress.style.width="0%";

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({

        orientation:orientation.value,

        unit:"mm",

        format:pageSize.value

    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgQuality = parseFloat(quality.value);
