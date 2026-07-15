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
        for(let i=0;i<selectedImages.length;i++){

        const file = selectedImages[i];

        const dataURL = await new Promise(resolve=>{

            const reader = new FileReader();

            reader.onload = e=>resolve(e.target.result);

            reader.readAsDataURL(file);

        });

        const img = new Image();

        await new Promise(resolve=>{

            img.onload = resolve;

            img.src = dataURL;

        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img,0,0);

        const compressedImage = canvas.toDataURL(
            "image/jpeg",
            imgQuality
        );

        if(i>0){
            pdf.addPage();
        }

        const ratio = Math.min(
            pdfWidth / img.width,
            pdfHeight / img.height
        );

        const w = img.width * ratio;
        const h = img.height * ratio;

        const x = (pdfWidth - w) / 2;
        const y = (pdfHeight - h) / 2;

        pdf.addImage(
            compressedImage,
            "JPEG",
            x,
            y,
            w,
            h
        );

        loadingProgress.style.width =
            ((i + 1) / selectedImages.length) * 100 + "%";

    }

    setTimeout(()=>{

        loadingModal.style.display="none";

        pdf.save("PDF-Tools.pdf");

    },400);

});
