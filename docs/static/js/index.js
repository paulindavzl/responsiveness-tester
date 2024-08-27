window.onload = () => {
    alterWindowFormat();
};

// quando o botão BUSCAR for clicado exibe o site do usuário
const searchButton = document.querySelector(".search-url");
searchButton.onclick = async () => {
    await searchURL();
}

// muda a escala quando o botão APLICAR é clicado
const applyButton = document.querySelector("#apply");
applyButton.onclick = () => {
    alterWindowFormat();
    alterCustomValues();
};

// altera o formato da janela
function alterWindowFormat() {
    const valuesScale = getWindowScale();
    let windowContainer = document.querySelector("#window-simulator-container");
    
    windowContainer.style.width = `${valuesScale.width}px`;
    windowContainer.style.height = `${valuesScale.height}px`;
};

// obtém o formato da janela
function getWindowScale() {
    const option = document.querySelector(".option-window-format:checked");
    if(option) {
        let values = {
            "width": "412",
            "height": "915"
        }
        const selected = option.value;
        if(selected === "mobile") {
            // resolução do Samsung Galaxy S21
            values["width"] = "412";
            values["height"] = "915";
        }
        else if(selected === "ipad") {
            // resolução do IPad Pro 11 (1° e 2° Gen.)
            values["width"] = "834";
            values["height"] = "1194";
        }
        else if(selected === "computer") {
            // resolução de um monitor Quad HD
            values["width"] = "2560";
            values["height"] = "1440";
        }
        else{
            const customValues = getCustomValues();
            values["width"] = customValues.width;
            values["height"] = customValues.height;
        };
        
        return values;
    };
};

// obtém os valores customizados do formato da janela
function getCustomValues(){
    let inputWidth = parseInt(document.querySelector("#custom-width").value, 10);
    let inputHeight = parseInt(document.querySelector("#custom-height").value, 10);
    
    // não permite que o tamanho da janela supera 3500px
    if(inputWidth > 3200) {
        inputWidth = 3200;
    };
    if(inputHeight > 3200) {
        inputHeight = 3200;
    };
    
    const values = {
        "width": inputWidth,
        "height": inputHeight
    };
    
    return values;
};

// altera o valor dos input para o escolhido
function alterCustomValues() {
    const scaleValues = getWindowScale();
    let inputWidth = document.querySelector("#custom-width");
    let inputHeight = document.querySelector("#custom-height");
    
    inputWidth.value = scaleValues.width;
    inputHeight.value = scaleValues.height;
};

// busca o site informado
async function searchURL() {
    const url = getURL();
    const window = document.querySelector("#window-simulator");
    
    window.src = url;
}

// obtém a URL informada
function getURL() {
    const url = document.querySelector("#url-site").value;
    
    return url;
}