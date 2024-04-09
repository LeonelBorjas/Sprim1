const moviesHtml = document.querySelector("#container");

const createCards = (objeto) => {
return `  
    <img class=mb-3  src="${objeto.image}" alt="Imagen de Pelicula ${objeto.title}">
    <h3 class=font-bold  >${objeto.title}</h3>
    <h5 class=font-bold >${objeto.tagline}</h5>
    <p class="italic line-clamp-5">${objeto.overview}</p> 
    <a href="./details.html?id=${objeto.id}" id="button" class="border border white" target="_blank" class="">See more</a>`;
};

const fragment = new DocumentFragment();

movies.forEach((element) => {
let divCont = document.createElement("div");
divCont.className =
    "bg-[#414141] w-[86%] rounded-2xl flex flex-col gap-2 border-solid border  p-2 lg:w-1/5 lg:mt-5  ";
divCont.innerHTML = createCards(element);
fragment.appendChild(divCont);
});

moviesHtml.appendChild(fragment);

// filtros genero #1
let mainSection = document.getElementById("generarGeneros");
console.log(mainSection);
let generos = movies.filter(movie => movie.genres); // array con generos, todos los objetos del array movies tienen generos

let generosFiltro = array => Array.from(new Set(array.map(element => element.genres).flat()));
let generoFiltro = generosFiltro(generos)
console.log(generoFiltro); // Un Array con inicialmente 30 arrays, contanto sub generos, el .Flat sirve para eliminar los sub arrrays y extrar su contenido unicamente, usandolo luego del .map obtengo 14 generos unicos


let crearSelect = array => {
const selectContainer = document.createElement("div");
let select = document.createElement("select");
let filtros = document.querySelector("#filtros")
selectContainer.className = "bg-black w-[45%] rounded-md text-center h-8 z-10"
select.innerHTML = `<option  selected>All</option>`;
select.className = "bg-black w-full  rounded-md text-center  border z-10 overflow-y-scroll";
select.name = "Generos";
select.id = "generarGeneros";
array.forEach(element => {
    let option = document.createElement("option");
    option.value = element;
    option.innerHTML = element;
    select.appendChild(option);
})
selectContainer.appendChild(select)
filtros.appendChild(selectContainer);
console.log(mainSection);
return select;
}

let selectElement = crearSelect(generoFiltro);

let remplazaMainContent = nodo => {
if (moviesHtml.hasChildNodes) {
      moviesHtml.replaceChildren(nodo); // Si encuentra Hijos en el maun, lo remplaza por el nuevo contenedor
}
}

let createCardsFilter = array => {
  let filteredCardsContainer = document.createElement("div") // Crear un Contenedor para las nuevas cards filtradas
filteredCardsContainer.className = "card-container flex flex-wrap gap-4 justify-center"
array.forEach(element => {
    let divFilteredCard = document.createElement("div");
    divFilteredCard.className = "card flex flex-col gap-2 bg-[#414141] border-solid border rounded-2xl p-4 w-[300px] justify-center  md:justify-between lg:justify-evenly ";
    divFilteredCard.style = "";
    divFilteredCard.style = "";
    divFilteredCard.innerHTML = createCards(element);
    filteredCardsContainer.appendChild(divFilteredCard); // Inserta las Cards en el nuevo contenedor
})
remplazaMainContent(filteredCardsContainer);
}

selectElement.addEventListener("change", event =>{
  console.log(event); // objeto con el evento
  console.log(event.target.value); // Objeto con el evento
let selectGenero = event.target.value;
if (selectGenero == "All"){
    console.log(movies)
    createCardsFilter(movies)
} else {
    let filterMovieGenero = array => array.filter(movie => movie.genres.includes(selectGenero)); // array que me genera las cards con las peliculas con el genero selecionado
    let filteredMovie = filterMovieGenero(generos);
    console.log(filteredMovie); // imprime array filtrado con los objetos que contengan el genero selecionado
    let rendFilterCard = createCardsFilter(filteredMovie); // Se contiene el nodo recien creado
}
} )

// filtro 2 Buscar por nombre
let buscarImput = document.getElementById("buscador");

buscarImput.addEventListener("keyup", event => {
console.log(event.target.value);
let inputValue = buscarImput.value.toLowerCase().trim();
console.log(inputValue);
  let titulos = (array, input) => array.filter(element => element.title.toLowerCase().trim().includes(input)); // array con sus generos, todos los objetos del array movies tienen generos.
  console.log(titulos); // debe imprimir las peliculas on simitudes al input

let filtroMovies = titulos(movies, inputValue);
  console.log(filtroMovies); // array con los objetos que presentan similitudes entre el input y el titulo.

  if (filtroMovies.length === 0) { // Si el filtro esta vacio, ejecute la codicion
    let h4 = document.createElement("h4");
    h4.className = "text-2xl text-bold";
    h4.innerText = "No existe el titulo selecionado, por favor seleciona otro.";
    remplazaMainContent(h4);
    return h4;
}

  // crear cards con el arreglo filtrado.
let renderFiltroCard = createCardsFilter (filtroMovies);
console.log(renderFiltroCard);

})

