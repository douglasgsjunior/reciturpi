// variáveis
const navItems = document.querySelectorAll(".navbar-button");
const pages = {};

// atribui os elementos das páginas ao objeto 'pages' automaticamente
navItems.forEach((item, index) => {
  const pageId = `page${index + 1}`;
  pages[pageId] = document.getElementById(pageId);
});

// esconde as páginas não selecionadas
Object.values(pages).forEach((page) => (page.style.display = "none"));
pages.page1.style.display = "block";

// evento de clique para cada botão da barra de navegação
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    // remove a classe "active" de todos os botões da barra de navegação
    navItems.forEach((navItem) => navItem.classList.remove("active"));
    // adiciona a classe "active" apenas ao botão clicado
    e.currentTarget.classList.add("active");
    // esconde todas as páginas
    Object.values(pages).forEach((page) => (page.style.display = "none"));
    // mostra a página correspondente ao botão clicado
    const pageToShow = e.currentTarget.dataset.page;
    pages[pageToShow].style.display = "block";
  });
});
