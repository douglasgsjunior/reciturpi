function initMap() {
  const center = { lat: -8.059500, lng: -34.8713000 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: center,
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      }
    ],
    fullscreenControl: false,
    zoomControl: false
  });
  
  const carousel = [
    'Todos',
    'Arte & Arquitetura',
    'Centros de Compras',
    'Eventos Culturais & Festivais',
    'Fortes',
    'História & Cultura',
    'Mercados & Feiras',
    'Parques & Áreas Verdes',
    'Pontes',
    'Praias',
    'Turismo Religioso'
  ];
  let currentCategoryIndex = 0;
  
  const cardText = document.querySelector("#categories-text");
  const arrowNextButton = document.querySelector("#next-arrow");
  const arrowBackButton = document.querySelector("#back-arrow");
  
  arrowNextButton.addEventListener('click', () => {
    changeCategory(1);
  });
  
  arrowBackButton.addEventListener('click', () => {
    changeCategory(-1);
  });
  
  function changeCategory(step) {
    currentCategoryIndex = (currentCategoryIndex + step + carousel.length) % carousel.length;
    cardText.textContent = carousel[currentCategoryIndex];
    const page2Points = document.querySelectorAll('.page2-point');
  
    page2Points.forEach(button => {
      const buttonCategory = button.getAttribute('category');
      const isMatch = (carousel[currentCategoryIndex] === 'Todos') || (buttonCategory === carousel[currentCategoryIndex]);
  
      button.style.display = isMatch ? 'flex' : 'none';
    });
  }
  
  points.forEach((point) => {
    const newMarker = new google.maps.Marker({
      position: point.position,
      map: map,
      icon: {
        url: "images/red-dot.png",
      },
    });
  
    const bottomSection = document.getElementById("board");
    const infoPage = document.getElementById("page2");
  
    const newButton = document.createElement("button");
    newButton.className = "page2-point";
    newButton.setAttribute("category", point.category);
    newButton.id = point.name.replace(/\s+/g, "-").toLowerCase() + "-button";
  
    const leftContainer = document.createElement("div");
    leftContainer.className = "left";
  
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
  
    const image = document.createElement("img");
    image.src = point.image;
    image.alt = "ReciTur Logo";
  
    imageContainer.appendChild(image);
    leftContainer.appendChild(imageContainer);
  
    const rightContainer = document.createElement("div");
    rightContainer.className = "right";
  
    const nameContainer = document.createElement("div");
    nameContainer.className = "name-container";
    nameContainer.textContent = point.name;
  
    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";
    infoContainer.textContent = point.info;
  
    const descContainer = document.createElement("div");
    descContainer.className = "desc-container";
    descContainer.textContent = point.description;
  
    rightContainer.appendChild(nameContainer);
    rightContainer.appendChild(infoContainer);
    rightContainer.appendChild(descContainer);
  
    newButton.appendChild(leftContainer);
    newButton.appendChild(rightContainer);
  
    newButton.addEventListener("click", () => {
      if (bottomSection.style.display === "block") {
        bottomSection.style.display = "none";
      }
      if (pages["page2"].style.display === "block") {
        pages["page2"].style.display = "none";
        pages["page1"].style.display = "block";
        document.getElementById("navbar-button1").classList.add("active");
        document
          .querySelectorAll(".navbar-button:not(#navbar-button1)")
          .forEach((button) => {
            button.classList.remove("active");
          });
  
        map.setCenter(point.position);
        map.setZoom(20);
  
        if (bottomSection.innerHTML.trim() === "") {
          const markerInfo = document.createElement("div");
          markerInfo.innerHTML = `
            <h2>${point.name}</h2>
            <p>${point.info}</p>
            <br></br>
            <p>${point.description}</p>
          `;
  
          bottomSection.innerHTML = "";
          bottomSection.appendChild(markerInfo);
  
          bottomSection.style.display = "block";
        } else {
          const markerInfo = document.createElement("div");
          markerInfo.innerHTML = `
            <h2>${point.name}</h2>
            <p>${point.info}</p>
            <br></br>
            <p>${point.description}</p>
          `;
  
          bottomSection.innerHTML = "";
          bottomSection.appendChild(markerInfo);
  
          bottomSection.style.display = "block";
        }
      }
    });
  
    infoPage.appendChild(newButton);
  
    newMarker.addListener("click", () => {
      if (bottomSection.innerHTML.trim() === "") {
        const markerInfo = document.createElement("div");
        markerInfo.innerHTML = `
          <h2>${point.name}</h2>
          <p>${point.info}</p>
          <br></br>
          <p>${point.description}</p>
        `;
  
        bottomSection.innerHTML = "";
        bottomSection.appendChild(markerInfo);
  
        bottomSection.style.display = "block";
      } else {
        bottomSection.innerHTML = "";
        bottomSection.style.display = "none";
      }
    });
  });

  const routeButton = document.querySelector("#route-button");
  const container4 = document.querySelector("#container4");

  routeButton.addEventListener('click', () => {
    container4.classList.toggle('open');
    routeButton.classList.toggle('open');
  });

  const carousel2 = [
    'Rota das Praias',
    'Rota dos Centros de Compras',
    'Rota dos Fortes',
    'Rota História & Cultura',
    'Rota dos Museus',
    'Rota Chico Science e Luiz Gonzaga',
    'Rota Recife Antigo',
    'Rota dos Centros Culturais',
    'Rota dos Pontos Históricos',
    'Rota do Patrimônio Cultural'
  ];
  let currentCategoryIndex2 = 0;
  let directionsRenderer;
  
  const cardText2 = document.querySelector("#categories-text2");
  const arrowNextButton2 = document.querySelector("#next-arrow2");
  const arrowBackButton2 = document.querySelector("#back-arrow2");
  
  arrowNextButton2.addEventListener('click', () => {
    changeCategory2(1);
  });
  
  arrowBackButton2.addEventListener('click', () => {
    changeCategory2(-1);
  });
  
  function changeCategory2(direction) {
    currentCategoryIndex2 += direction;
    if (currentCategoryIndex2 < 0) {
      currentCategoryIndex2 = carousel2.length - 1;
    } else if (currentCategoryIndex2 >= carousel2.length) {
      currentCategoryIndex2 = 0;
    }
  
    const category = carousel2[currentCategoryIndex2];
    cardText2.textContent = category; // Atualiza o texto da categoria no carrossel
    updateRoute(category);
  }
  
  function updateRoute(category) {
    let startPoint, endPoint, waypoints;
  
    switch (category) {
      case 'Rota das Praias':
        startPoint = points[0].position;
        endPoint = points[3].position;
        waypoints = [
          { location: points[1].position },
          { location: points[2].position },
        ];
        break;
      case 'Rota dos Centros de Compras':
        startPoint = points[4].position;
        endPoint = points[7].position;
        waypoints = [
          { location: points[5].position },
          { location: points[6].position },
          { location: points[8].position },
        ];
        break;
      case 'Rota dos Fortes':
        startPoint = points[10].position;
        endPoint = points[11].position;
        waypoints = [];
        break;
      case 'Rota História & Cultura':
        startPoint = points[12].position;
        endPoint = points[16].position;
        waypoints = [
          { location: points[13].position },
          { location: points[14].position },
          { location: points[15].position },
        ];
        break;
      case 'Rota dos Museus':
        startPoint = points[17].position;
        endPoint = points[21].position;
        waypoints = [
          { location: points[18].position },
          { location: points[19].position },
          { location: points[20].position },
        ];
        break;
      case 'Rota Chico Science e Luiz Gonzaga':
        startPoint = points[22].position;
        endPoint = points[23].position;
        waypoints = [];
        break;
      case 'Rota Recife Antigo':
        startPoint = points[12].position;
        endPoint = points[15].position;
        waypoints = [
          { location: points[10].position },
          { location: points[13].position },
        ];
        break;
      case 'Rota dos Centros Culturais':
        startPoint = points[6].position;
        endPoint = points[21].position;
        waypoints = [
          { location: points[17].position },
          { location: points[18].position },
          { location: points[20].position },
        ];
        break;
      case 'Rota dos Pontos Históricos':
        startPoint = points[12].position;
        endPoint = points[14].position;
        waypoints = [
          { location: points[10].position },
          { location: points[11].position },
          { location: points[13].position },
        ];
        break;
      case 'Rota do Patrimônio Cultural':
        startPoint = points[15].position;
        endPoint = points[21].position;
        waypoints = [
          { location: points[14].position },
          { location: points[13].position },
          { location: points[20].position },
        ];
        break;
      default:
        startPoint = null;
        endPoint = null;
        waypoints = [];
        break;
    }
  
    if (startPoint && endPoint) {
      clearRoute(); // Limpa a rota anterior antes de exibir a nova rota
      calculateAndDisplayRoute(startPoint, endPoint, waypoints);
    }
  }
  
  function calculateAndDisplayRoute(startPoint, endPoint, waypoints) {
    const directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true // Oculta os marcadores A, B, C, ...
    });
  
    const request = {
      origin: startPoint,
      destination: endPoint,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Error calculating route:", status);
      }
    });
  }
  
  function clearRoute() {
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }

    routeButton.addEventListener('click', () => {
      clearRoute(); // Limpa a rota anterior antes de esconder o container4
      container4.classList.toggle('open');
      routeButton.classList.toggle('open');
    });  
  }
  
  let watcherId = null;
  const locationButton = document.getElementById("location-button");
  const locationSvg = document.getElementById("location");
  
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000
    };
    const userMarker = new google.maps.Marker({
      map: map,
      icon: {
        url: "images/blue-dot.png"
      }
    });
  
    locationButton.addEventListener("click", () => {
      const isActive = locationButton.getAttribute("data-active") === "true";
  
      if (isActive) {
        locationButton.setAttribute("data-active", "false");
        locationButton.classList.remove("red");
        locationButton.classList.add("green");
        userMarker.setPosition(null);
        map.setCenter(center);
        navigator.geolocation.clearWatch(watcherId);
      } else {
        locationButton.setAttribute("data-active", "true");
        locationButton.classList.remove("green");
        locationButton.classList.add("red");
  
        watcherId = navigator.geolocation.watchPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            userMarker.setPosition(userLocation);
            map.setCenter(userLocation);
          },
          (error) => {
            console.log("Error getting location:", error);
          },
          options
        );
      }
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
}

window.onload = () => {
  initMap();
};