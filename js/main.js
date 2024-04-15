// Obtener favoritos del almacenamiento local
let arrayFavoritos = JSON.parse(localStorage.getItem("Favoritos")) || [];

// Capturar Elemento
const moviesHtml = document.querySelector("#container");
let mainSection = document.getElementById("generarGeneros");

// Funciones 
import {createCards} from './function.js';   // funcion importada de crear las cartas
import {crearSelect} from './function.js';   // funcion importada de crear el contenedor de option y select
import {generosFiltro} from './function.js'; // funcion importada Filtro de generos 
import {titulos} from './function.js';       // Funcion importada filtro titulos 14 
import {filterMovieGenero} from './function.js';  // Funcion Importada Filtro 30 
// import {filtroCruzado} from './function.js';  // Funcion importada filtro cruzado

let peliculas;
let genres;

fetch ("https://moviestack.onrender.com/api/movies",{
    headers: {"x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"}
})
.then(info => info.json())
.then (peliculas => { 
    peliculas.movies;
    let movies = peliculas.movies

    const fragment = new DocumentFragment();

    movies.forEach((element) => {
        let divCont = document.createElement("div");
        divCont.className ="bg-[#414141] w-[86%] rounded-2xl flex flex-col gap-2 border-solid border p-2 lg:w-1/5 lg:mt-5 justify-between";
        divCont.innerHTML = createCards(element);
        fragment.appendChild(divCont);
    });

    moviesHtml.appendChild(fragment);

    // filtros genero #1
    let generos = movies.filter(movie => movie.genres); // array con generos, todos los objetos del array movies tienen generos

    let generoFiltro = generosFiltro(generos) // Contiene los 14 generos unicos de las peliculas utilizando un flat para eliminarlos
    console.log(generoFiltro);

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
        if (selectGenero == "All"){
            createCardsFilter(movies)
        } else {
            let filterMovieGenero = array => array.filter(movie => movie.genres.includes(selectGenero)); // array que me genera las cards con las peliculas con el genero selecionado
            let filteredMovie = filterMovieGenero(generos);
            let rendFilterCard = createCardsFilter(filteredMovie); // Se contiene el nodo recien creado
        }
        let renderFiltroCard = createCardsFilter(filtroCruzado(movies, inputValue, selectGenero) ) 
        updateFavoritesIcons(); // Llama a la función para actualizar los íconos de favoritos
    })



    // filtro 2 buscar por nombre 
    let buscarImput = document.getElementById("buscador");
    buscarImput.addEventListener("keyup", event => {
        inputValue = buscarImput.value.toLowerCase().trim();
        let filtroMovies = titulos(movies, inputValue);  //Filtrar las películas según el título coincida con el inputValue

        if (filtroMovies.length === 0) { // Si el filtro esta vacio, ejecute la codicion
            let h4 = document.createElement("h4");
            h4.className = "text-2xl text-bold";
            h4.innerText = "No existe el titulo seleccionado, por favor selecciona otro.";
            remplazaMainContent(h4);
            return h4;
        }
        let renderFiltroCard = createCardsFilter(filtroCruzado(movies, inputValue, selectGenero) );
        updateFavoritesIcons(); // Llama a la función para actualizar los íconos de favoritos
    })

    function filtroCruzado(movies, inputValue, selectGenero) {
        let filtradoPorMovie = titulos(movies, inputValue)
        let filtrarPorSearchYSelect = filterMovieGenero(filtradoPorMovie, selectGenero)
        return filtrarPorSearchYSelect
    }

    // Función para actualizar los íconos de favoritos
    function updateFavoritesIcons() {
        // Cargar estado de favoritos después de renderizar las tarjetas filtradas o de búsqueda
        arrayFavoritos.forEach(id => {
            const button = document.querySelector(`button[data-favid="${id}"]`);
            if (button) {
                const heartIcon = button.querySelector('img');
                heartIcon.src = '../assets/img/corazonlleno.png';
            }
        });
    }

    // Cargar estado de favoritos al cargar la página
    arrayFavoritos.forEach(id => {
        const button = document.querySelector(`button[data-favid="${id}"]`);
        if (button) {
            const heartIcon = button.querySelector('img');
            heartIcon.src = '../assets/img/corazonlleno.png';
        }
    });

    // Evento de clic en los botones de favoritos
    moviesHtml.addEventListener("click", (event) => {
        let datasetFavid = event.target.dataset.favid;
        if (datasetFavid) {
            console.log("Es un boton");
            const button = event.target.closest('button');
            const heartIcon = button.querySelector('img');

            if (!arrayFavoritos.includes(datasetFavid)) {
                arrayFavoritos.push(datasetFavid);
                heartIcon.src = '../assets/img/corazonlleno.png';
            } else {
                arrayFavoritos = arrayFavoritos.filter(id => id != datasetFavid);
                heartIcon.src = '../assets/img/heart.png';
            }
            localStorage.setItem("Favoritos", JSON.stringify(arrayFavoritos));
        }

        console.log(arrayFavoritos);
    });

});
