const moviesHtml = document.querySelector("#container");
const createCards = (objeto) => {
    return `  
    <img class=mb-3  src="${objeto.image}" alt="Imagen de Pelicula ${objeto.title}">
    <h3 class=font-bold  >${objeto.title}</h3>
    <h5 class=font-bold >${objeto.tagline}</h5>
    <p class=italic >${objeto.overview}</p> `;
};
const fragment = new DocumentFragment();

movies.forEach((element) => {
    let divCont = document.createElement("div");
    divCont.className = "bg-[#414141] w-[86%]  flex flex-col gap-2 border-solid border  p-2 lg:w-1/5 lg:mt-5 " ;
    divCont.innerHTML = createCards(element);
    fragment.appendChild(divCont);
});

moviesHtml.appendChild(fragment);

