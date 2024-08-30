let statusOptions = "closed";

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

// abre ou fecha as opções de escala
const menuOptionsButton = document.querySelector("#menu-options img");
menuOptionsButton.onclick = () => {
    openCloseOptions();
}

// altera o formato da janela
function alterWindowFormat() {
    const valuesScale = getWindowScale();
    const windowContainer = document.querySelector("#window-simulator-container");
    
    windowContainer.style.width = `${valuesScale.width}px`;
    windowContainer.style.height = `${valuesScale.height}px`;
};

// dimensões de acordo com o dispositivo
function getDimensions(device) {
    const dimensions = {
        "mobile": {
            "width": "412",
            "height": "915"
        },
        "ipad": {
            "width": "834",
            "height": "1194"
        },
        "computer": {
            "width": "2560",
            "height": "1440"
        }
    };
    
    resp = dimensions[device];
    return resp;
};

// altera a escala do simulador de janela (celular e ipad)
function alterScale(width) {
    const windowWidth = window.innerWidth;
    const windowContainer = document.querySelector("#window-simulator-container");
    
    if(windowWidth < 615) {
        if(width < 615) {
            windowContainer.style.scale = "100%";
        }
        else if(width > 630 && width < 188) {
            windowContainer.style.scale = "50%";
        }
        else {
            windowContainer.style.scale = "20%";
        };
    }
    else if(windowWidth > 616 && windowWidth < 1800){
        if(width < 615) {
            windowContainer.style.scale = "100%";
        }
        else if(width > 630 && width < 2000) {
            windowContainer.style.scale = "80%";
        }
        else {
            windowContainer.style.scale = "20%";
        };
    }
    else {
        windowContainer.style.scale = "100%";
    };
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
        if(selected !== "custom") {
            values = getDimensions(selected);
        }
        else{
            const customValues = getCustomValues();
            values["width"] = customValues.width;
            values["height"] = customValues.height;
        };
        
        alterScale(parseInt(values.width));
        
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

// abre ou fecha o menu com opções de escala
function openCloseOptions() {
    const menuOptions = document.querySelector("nav");
    
    if(statusOptions === "closed") {
        statusOptions = "opened";
        animation(menuOptions, "entry");
    }
    else {
        statusOptions = "closed";
        animation(menuOptions, "exit");
    };
};

// animação do menu de opções
function animation(menuOptions, status) {
    setTimeout(() => {
        menuOptionsButton.classList.add("rotate");
    }, 0);
    setTimeout(() => {
        menuOptionsButton.classList.remove("rotate");
    }, 500);
    
    if(status === "exit") {
        menuOptionsButton.src="../static/img/open-options.svg";
        menuOptions.style.opacity = "0%";
        menuOptions.style.transform = "translateX(-100px)";
        menuOptions.style.visibility = "hidden";
    }
    else {
        menuOptionsButton.src="../static/img/close-options.svg";
        menuOptions.style.visibility = "visible";
        menuOptions.style.opacity = "100%";
        menuOptions.style.transform = "translateX(100px)";
    };
};