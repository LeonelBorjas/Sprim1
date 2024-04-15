import { createCards } from "./function.js";
let arrayFavoritos = JSON.parse(localStorage.getItem("Favoritos")) || [];
let favsCards = objeto =>  `  
    <img class="mb-3" src="https://moviestack.onrender.com/static/${objeto.image}" alt="Imagen de Pelicula ${objeto.title}">
    <h3 class="font-bold">${objeto.title}</h3>
    <h5 class="font-bold">${objeto.tagline}</h5>
    <p class="italic line-clamp-5">${objeto.overview}</p>
    <div>
    <button class="" data-favid="${objeto.id}">
    <img src="../assets/img/corazonlleno.png" class="w-6 h-6" data-favid="${objeto.id}"/>
    </button>
    </div> 
    <a href="./details.html?id=${objeto.id}" id="button" class="border border-white" target="_blank">See more</a>
`;

const moviesHtml = document.querySelector("#container");

let remplazaMainContent = (nodo, container) => {
    if (container.hasChildNodes) {
        container.replaceChildren(nodo);
    }
}

let favCardContainer = (array, container) => {
    let filteredCardsContainer = document.createElement("div")
    filteredCardsContainer.className = "card-container flex flex-wrap gap-4 justify-center"
    array.forEach(element => {
        let divFilteredCard = document.createElement("div");
        divFilteredCard.className = "card flex flex-col gap-2 bg-[#414141] border-solid border rounded-2xl p-4 w-[300px] justify-center  md:justify-between lg:justify-evenly ";
        divFilteredCard.innerHTML = favsCards(element);
        filteredCardsContainer.appendChild(divFilteredCard);
    })
    remplazaMainContent(filteredCardsContainer, container);
}


let listaArrayFavoritos = JSON.parse(localStorage.getItem("Favoritos")) || [];
console.log(listaArrayFavoritos)

fetch("https://moviestack.onrender.com/api/movies", {
    headers: { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" }
})
.then(info => info.json())
.then(peliculas => { 
    let movies = peliculas.movies;

    // Filtrar las películas según los IDs de favoritos
    const peliculasFavoritas = movies.filter(pelicula => listaArrayFavoritos.includes(pelicula.id));

    
    if (peliculasFavoritas.length === 0) { // Si el filtro esta vacio, ejecute la codicion
        let h4 = document.createElement("h4");
        h4.className = "text-2xl text-bold";
        h4.innerText = "No existe la pelicula seleccionada, por favor selecciona una.";
        remplazaMainContent(h4, moviesHtml);
        return h4;
    }
    
    // Mostrar las películas favoritas
    favCardContainer(peliculasFavoritas, moviesHtml)

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


















