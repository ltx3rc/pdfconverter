const imageInput = document.getElementById("imageInput");
const previewContainer = document.getElementById("previewContainer");
const createBtn = document.getElementById("createBtn");
const loadingModal = document.getElementById("loadingModal");
const loadingProgress = document.getElementById("loadingProgress");

let selectedImages = [];

imageInput.addEventListener("change", function () {

    selectedImages = [...this.files];

    previewContainer.innerHTML = "";

    if(selectedImages.length === 0){
        previewContainer.innerHTML =
        "<p class='empty-text'>No images selected.</p>";
        return;
    }

    selectedImages.forEach(file => {

        const reader = new FileReader();

        reader.onload = function(e){

            const img = document.createElement("img");

            img.src = e.target.result;

            previewContainer.appendChild(img);

        }

        reader.readAsDataURL(file);

    });

});
createBtn.addEventListener("click", async () => {

if(selectedImages.length===0){

alert("Please select at least one image.");

return;

}

loadingModal.style.display="flex";

loadingProgress.style.width="0%";

const { jsPDF } = window.jspdf;

const pdf = new jsPDF();

for(let i=0;i<selectedImages.length;i++){

loadingProgress.style.width=
((i+1)/selectedImages.length)*100+"%";

const file=selectedImages[i];

const imgData=await new Promise(resolve=>{

const reader=new FileReader();

reader.onload=e=>resolve(e.target.result);

reader.readAsDataURL(file);

});

if(i>0){

pdf.addPage();

}

const img=new Image();

await new Promise(resolve=>{

img.onload=resolve;

img.src=imgData;

});

const pageWidth=pdf.internal.pageSize.getWidth();

const pageHeight=pdf.internal.pageSize.getHeight();

pdf.addImage(

img,

"JPEG",

0,

0,

pageWidth,

pageHeight

);

}

setTimeout(()=>{

loadingModal.style.display="none";

pdf.save("PDF-Tools.pdf");

},500);

});
