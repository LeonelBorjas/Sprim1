//Capturar Elemento
const moviesHtml = document.querySelector("#container");
let mainSection = document.getElementById("generarGeneros");

// Funciones 
import {createCards} from './function.js';   // funcion importada de crear las cartas
import {crearSelect} from './function.js';   // funcion importada de crear el contenedor de option y select
import {generosFiltro} from './function.js'; // funcion importada Filtro de generos 
import {titulos} from './function.js';       // Funcion importada filtro titulos 14 
import {filterMovieGenero} from './function.js';  // Funcion Importada Filtro 30 
// import {filtroCruzado} from './function.js';  // Funcion importada filtro cruzado
const fragment = new DocumentFragment();

movies.forEach((element) => {
  let divCont = document.createElement("div");
  divCont.className ="bg-[#414141] w-[86%] rounded-2xl flex flex-col gap-2 border-solid border  p-2 lg:w-1/5 lg:mt-5  ";
  divCont.innerHTML = createCards(element);
  fragment.appendChild(divCont);
});

moviesHtml.appendChild(fragment);


// filtros genero #1
let generos = movies.filter(movie => movie.genres); // array con generos, todos los objetos del array movies tienen generos

// let generosFiltro = array => Array.from(new Set(array.map(element => element.genres).flat())); // toma un array de películas,los aplan a un solo array, elimina cualquier género duplicado y devuelve un array único que contiene todos los géneros presentes en el array original de películas.
let generoFiltro = generosFiltro(generos)
console.log(generoFiltro); // Un Array con inicialmente 30 arrays, contanto sub generos, el .Flat sirve para eliminar los sub arrrays y extrar su contenido unicamente, usandolo luego del .map obtengo 14 generos unicos

    
    let selectElement = crearSelect(generoFiltro);

    let remplazaMainContent = nodo => {
      if (moviesHtml.hasChildNodes) {
        moviesHtml.replaceChildren(nodo); // Si encuentra Hijos en el main, lo remplaza por el nuevo contenedor
      }
    }
    
    let createCardsFilter = array => {
      let filteredCardsContainer = document.createElement("div") // Crear un Contenedor para las nuevas cards filtradas
      filteredCardsContainer.className = "card-container flex flex-wrap gap-4 justify-center"
      array.forEach(element => {
        let divFilteredCard = document.createElement("div"); // crear un div por cada iteracion para contener cada tarjeta
        divFilteredCard.className = "card flex flex-col gap-2 bg-[#414141] border-solid border rounded-2xl p-4 w-[300px] justify-center  md:justify-between lg:justify-evenly ";
        divFilteredCard.innerHTML = createCards(element);
        filteredCardsContainer.appendChild(divFilteredCard); // Inserta las Cards en el nuevo contenedor
      })
      remplazaMainContent(filteredCardsContainer);
    }
    
    let inputValue = ""
    let selectGenero = ""
    selectElement.addEventListener("change", event =>{
      selectGenero = event.target.value;  // target hace una referencia al objeto particular en el que se esta ejecutando el evento
      if (selectGenero == ""){
    createCardsFilter(movies)
} else {
    let filterMovieGenero = array => array.filter(movie => movie.genres.includes(selectGenero)); // array que me genera las cards con las peliculas con el genero selecionado
    let filteredMovie = filterMovieGenero(generos);
    // console.log(filteredMovie); // imprime array filtrado con los objetos que contengan el genero selecionado
    let rendFilterCard = createCardsFilter(filteredMovie); // Se contiene el nodo recien creado
}
let renderFiltroCard = createCardsFilter(filtroCruzado(movies, inputValue, selectGenero) )
console.log(renderFiltroCard)
} )

// filtro 2 Buscar por nombre
let buscarImput = document.getElementById("buscador");
buscarImput.addEventListener("keyup", event => {
// console.log(event.target.value);
inputValue = buscarImput.value.toLowerCase().trim();
// console.log(inputValue);
  // let titulos = (array, input) => array.filter(element => element.title.toLowerCase().trim().includes(input)); // array con sus generos, todos los objetos del array movies tienen generos.
let filtroMovies = titulos(movies, inputValue); //Filtrar las películas según el título coincida con el inputValue
   console.log(filtroMovies); // array con los objetos que presentan similitudes entre el input y el titulo.

  if (filtroMovies.length === 0) { // Si el filtro esta vacio, ejecute la codicion
    let h4 = document.createElement("h4");
    h4.className = "text-2xl text-bold";
    h4.innerText = "No existe el titulo selecionado, por favor seleciona otro.";
    remplazaMainContent(h4);
    return h4;
  }
  let renderFiltroCard = createCardsFilter(filtroCruzado(movies, inputValue, selectGenero) )
})

function filtroCruzado(movies, inputValue, selectGenero) {
  let filtradoPorMovie = titulos(movies, inputValue)
  let filtrarPorSearchYSelect = filterMovieGenero(filtradoPorMovie, selectGenero)
  return filtrarPorSearchYSelect
}

filtroCruzado(movies, inputValue, selectGenero) 
