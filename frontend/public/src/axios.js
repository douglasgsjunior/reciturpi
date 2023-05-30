axios.get('https://reciturbackend.onrender.com/')
  .then(response => {
    // Manipule os dados da resposta aqui
    console.log(response.data);
  })
  .catch(error => {
    // Manipule os erros aqui
    console.error(error);
  });