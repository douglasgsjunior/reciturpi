document.addEventListener('DOMContentLoaded', function() {
  fetch('https://reciturbackend.onrender.com/')
    .then(response => response.json())
    .then(data => {
      const guideInfo = document.getElementById('guide-info');
      
      // Iterar sobre os dados do guia e criar elementos para exibir as informações
      data.forEach(guide => {
        const guideElement = document.createElement('div');
        guideElement.classList.add('guide');
        
        const nameElement = document.createElement('h3');
        nameElement.textContent = guide.guide_name;
        guideElement.appendChild(nameElement);
        
        const photoElement = document.createElement('img');
        photoElement.src = guide.guide_photo;
        guideElement.appendChild(photoElement);
        
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = guide.guide_description;
        guideElement.appendChild(descriptionElement);
        
        const locationElement = document.createElement('p');
        locationElement.textContent = guide.guide_location;
        guideElement.appendChild(locationElement);
        
        const whatsappElement = document.createElement('p');
        whatsappElement.textContent = guide.guide_whatsapp_number;
        guideElement.appendChild(whatsappElement);
        
        guideInfo.appendChild(guideElement);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar informações do guia:', error);
    });
});
