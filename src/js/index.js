import App from './app.js';

const app = new App();
const iBtnSearch = document.getElementById("iBtnSearch");
let loadFilePopup = `<div class="">
        						<label id="label-upload-input" class="btn-input waves-effect waves-teal btn2-unify">
        							Select file<input id="csv-file" type="file" name="csv-file" class="modal-action modal-close">
        						</label>
        						<span id="sFiles" class="upload-input-message">Ningun archivo seleccionado</span>
    						</div>`;



const showModal = ( htmlContent ) =>{
    let newDiv = document.createElement("div");
    let divContainer = document.createElement("div");
    newDiv.setAttribute("id","modalPopup"); 
    newDiv.setAttribute("class","modal-overlay"); 
    divContainer.setAttribute("id","modalContainer");
    divContainer.setAttribute("class","modal-container");
    newDiv.appendChild(divContainer);
    divContainer.innerHTML = htmlContent;
    // añade el elemento creado y su contenido al DOM 
    document.body.appendChild(newDiv); 
    newDiv.addEventListener("click",(e)=>{
        e.preventDefault();
        let element = document. getElementById("modalPopup");
        element.parentNode.removeChild(element);
    },false);
   
}                             

iBtnSearch.addEventListener("click",(e)=>{
    e.preventDefault();
    showModal(loadFilePopup);
},false);