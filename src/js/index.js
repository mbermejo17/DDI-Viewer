import App from './app.js';

const app = new App();

const iBtnSearch = document.getElementById("iBtnSearch");
const txtSearch = document.getElementById("searchText");
const btnHome = document.getElementById("home");
const btnDns = document.getElementById("dns");
const btnDhcp = document.getElementById("dhcp");
const btnTools = document.getElementById("tools");


const loadFileHtml = `<label id="label-upload-input" class="btn-input waves-effect waves-teal btn2-unify">
                          <input id="csv-file" type="file" name="csv-file" class="modal-action modal-close">
                      </label>
                      <span id="sFiles" class="upload-input-message">
                          
                      </span>`;

const loadFile = (f) => { console.log("load file" + n) };

const closeMe = () => {
    let element = document.getElementById("modalPopup");
    document.getElementById("modalPopup").parentNode.removeChild(element);
};
const showModal = (title, mainContent, footer, btn, type) => {
    if (document.getElementById('modalPopup')) {
        document.getElementById("modalPopup").parentNode.removeChild(element);
    }
    let newDiv = document.createElement("div");
    let divContainer = document.createElement("div");
    let htmlContent = `<div class="modal-header">
								<span id="close-modal" class="close">&times;</span>
								<h2 class="modal-title">${title}</h2>
							</div>
							<div class="modal-body">
								${mainContent}
							</div>
							<div class="modal-footer">
                                    <a href="#" id="btnModalOK">${btn.btnOKLabel ? btn.btnOKLabel : 'Accept'}</a>
                                    <a href="#" id="btnModalCancel">${btn.btnCancelLabel}</a>
                            </div>`;

    newDiv.setAttribute("id", "modalPopup");
    newDiv.setAttribute("class", "modal-overlay");
    divContainer.setAttribute("id", "modalContainer");
    divContainer.setAttribute("class", "modal-container");
    newDiv.appendChild(divContainer);
    divContainer.innerHTML = htmlContent;
    // añade el elemento creado y su contenido al DOM 
    document.body.appendChild(newDiv);
    document.getElementById('close-modal').addEventListener("click", (e) => {
        e.preventDefault();
        let element = document.getElementById("modalPopup");
        element.parentNode.removeChild(element);
    }, false);

    if (btn.btnCancelLabel) {
        document.getElementById("btnModalCancel").addEventListener("click", (e) => {
            e.preventDefault();
            if (!btn.btnCancelCallback) {
                closeMe();
            } else {
                btn.btnCancelCallback();
            }
        }, false);
    } else {
        let element = document.getElementById("btnModalCancel");
        document.getElementById("btnModalCancel").parentNode.removeChild(element);
    }

    document.getElementById("btnModalOK").addEventListener("click", (e) => {
        e.preventDefault();
        if (!btn.btnOKCallback) {
            closeMe();
        } else {
            btn.btnOKCallback();
        }
    }, false);


}

// Events

btnHome.addEventListener("click", (e) => {
    e.preventDefault();
    showModal("Windows modal", "HOME", "", "");
}, false);

btnDns.addEventListener("click", (e) => {
    e.preventDefault();
    showModal("Load DNS File", loadFileHtml, "", { "btnOKLabel": "Load", "btnOKCallback": loadFile, "btnCancelLabel": "Cancelar", "btnCancelCallback": null }, "");
}, false);

btnDhcp.addEventListener("click", (e) => {
    e.preventDefault();
    showModal("Load DHCP File", loadFileHtml, "", "");
}, false);

btnTools.addEventListener("click", (e) => {
    e.preventDefault();
    showModal("Windows modal", "Tools", "", "");
}, false);

iBtnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    showModal("Windows modal", "Search " + txtSearch.value, "", "");
}, false);
