const imageInput = document.getElementById("imageInput");
const chooseBtn = document.getElementById("chooseBtn");
const previewContainer = document.getElementById("previewContainer");
const imageCount = document.getElementById("imageCount");
const clearBtn = document.getElementById("clearBtn");
const convertBtn = document.getElementById("convertBtn");
const loadingModal = document.getElementById("loadingModal");
const dropArea = document.getElementById("dropArea");

let images = [];

// Choose Images
chooseBtn.addEventListener("click", () => {
    imageInput.click();
});

// Image Selection
imageInput.addEventListener("change", (e) => {

    const files = [...e.target.files];

    files.forEach(file => {

        if(file.type.startsWith("image/")){
            images.push(file);
        }

    });

    showImages();

});

// Preview Images
function showImages(){

    previewContainer.innerHTML = "";

    imageCount.innerText = images.length + " Images";

    images.forEach((file,index)=>{

        const reader = new FileReader();

        reader.onload = function(e){

            const card = document.createElement("div");
            card.className = "image-card";

            card.innerHTML = `
            <img src="${e.target.result}">
            <div class="image-name">${file.name}</div>

            <button class="delete-btn"
            onclick="deleteImage(${index})">

            <i class="fa-solid fa-xmark"></i>

            </button>
            `;

            previewContainer.appendChild(card);

        };

        reader.readAsDataURL(file);

    });

}
// =========================
// Delete Image
// =========================

function deleteImage(index){

    images.splice(index,1);

    showImages();

}

// =========================
// Clear All Images
// =========================

clearBtn.addEventListener("click",()=>{

    if(images.length===0){

        alert("No Images Selected");

        return;

    }

    if(confirm("Remove all selected images?")){

        images=[];

        previewContainer.innerHTML="";

        imageCount.innerText="0 Images";

        imageInput.value="";

    }

});

// =========================
// Drag & Drop Upload
// =========================

["dragenter","dragover"].forEach(eventName=>{

    dropArea.addEventListener(eventName,(e)=>{

        e.preventDefault();

        dropArea.style.borderColor="#22c55e";

        dropArea.style.background="rgba(34,197,94,.10)";

    });

});

["dragleave","drop"].forEach(eventName=>{

    dropArea.addEventListener(eventName,(e)=>{

        e.preventDefault();

        dropArea.style.borderColor="#3b82f6";

        dropArea.style.background="transparent";

    });

});

dropArea.addEventListener("drop",(e)=>{

    const files=[...e.dataTransfer.files];

    files.forEach(file=>{

        if(file.type.startsWith("image/")){

            images.push(file);

        }

    });

    showImages();

});

// =========================
// Loading Functions
// =========================

function showLoading(){

    loadingModal.style.display="flex";

}

function hideLoading(){

    loadingModal.style.display="none";

}
// =========================
// Convert Images to PDF
// =========================

convertBtn.addEventListener("click", async () => {

    if(images.length === 0){
        alert("Please select at least one image.");
        return;
    }

    showLoading();

    try{

        const { jsPDF } = window.jspdf;

        const orientation =
            document.getElementById("orientation").value === "landscape"
            ? "l"
            : "p";

        const pageSize = document.getElementById("pageSize").value;
        const quality = parseFloat(document.getElementById("quality").value);

        const format = pageSize === "letter" ? "letter" : "a4";

        const pdf = new jsPDF({
            orientation: orientation,
            unit: "mm",
            format: format
        });

        for(let i = 0; i < images.length; i++){

            const file = images[i];

            const dataUrl = await new Promise((resolve)=>{
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.readAsDataURL(file);
            });

            const img = new Image();

            await new Promise((resolve)=>{
                img.onload = resolve;
                img.src = dataUrl;
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const ratio = Math.min(
                pageWidth / img.width,
                pageHeight / img.height
            );

            const width = img.width * ratio;
            const height = img.height * ratio;

            const x = (pageWidth - width) / 2;
            const y = (pageHeight - height) / 2;

            if(i > 0){
                pdf.addPage();
            }

            pdf.addImage(
                dataUrl,
                "JPEG",
                x,
                y,
                width,
                height,
                "",
                "FAST"
            );
        }

        pdf.save("Prince-PDF.pdf");

    }catch(error){

        console.error(error);
        alert("Failed to create PDF.");

    }finally{

        hideLoading();

    }

});
