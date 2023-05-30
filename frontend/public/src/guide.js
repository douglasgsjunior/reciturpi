const infoPage = document.getElementById("page3");

// Função para criar um botão com base nos dados retornados do banco de dados
function createButton(point) {
  const newButton = document.createElement("button");
  newButton.className = "page2-point";
  newButton.id = point.guide_name.replace(/\s+/g, "-").toLowerCase() + "-button";

  const leftContainer = document.createElement("div");
  leftContainer.className = "left";

  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  const image = document.createElement("img");
  image.src = point.guide_photo;
  image.alt = "ReciTur Logo";

  imageContainer.appendChild(image);
  leftContainer.appendChild(imageContainer);

  const rightContainer = document.createElement("div");
  rightContainer.className = "right";

  const nameContainer = document.createElement("div");
  nameContainer.className = "name-container";
  nameContainer.textContent = point.guide_name;

  const infoContainer = document.createElement("div");
  infoContainer.className = "info-container";
  infoContainer.textContent = point.guide_location;

  const descContainer = document.createElement("div");
  descContainer.className = "desc-container";
  descContainer.textContent = point.guide_description;

  rightContainer.appendChild(nameContainer);
  rightContainer.appendChild(infoContainer);
  rightContainer.appendChild(descContainer);

  newButton.appendChild(leftContainer);
  newButton.appendChild(rightContainer);

  // Redirecionar para o WhatsApp ao clicar no botão
  newButton.addEventListener('click', () => {
    window.location.href = `https://api.whatsapp.com/send?phone=${point.guide_whatsapp_number}`;
  });

  return newButton;
}

// Função para buscar os dados do backend e criar os botões na página
function fetchDataAndCreateButtons() {
  fetch('/dados')
    .then(response => response.json())
    .then(data => {
      data.forEach(point => {
        const button = createButton(point);
        infoPage.appendChild(button);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar os dados do servidor:', error);
    });
}

// Chamar a função para buscar os dados e criar os botões
fetchDataAndCreateButtons();
