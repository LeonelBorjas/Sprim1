export const createCards = objeto =>   // Funcion de Crear Cartas
`  
    <img class="mb-3" src="${objeto.image}" alt="Imagen de Pelicula ${objeto.title}">
    <h3 class="font-bold">${objeto.title}</h3>
    <h5 class="font-bold">${objeto.tagline}</h5>
    <p class="italic line-clamp-5">${objeto.overview}</p> 
    <a href="./details.html?id=${objeto.id}" id="button" class="border border-white" target="_blank">See more</a>`;


export let crearSelect = array => {   // Conteneder de creacion de select y Option 
    const selectContainer = document.createElement("div");  
    let select = document.createElement("select");
    let filtros = document.querySelector("#filtros")
    selectContainer.className = "bg-black w-[45%] rounded-md text-center h-8 z-10"
    select.innerHTML = `<option selected>All</option>`;
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
    filtros.appendChild(selectContainer); // select
    // console.log(mainSection);
    return select;
}


export let generosFiltro = array => Array.from(new Set(array.map(element => element.genres).flat())); // Filtro de generos 14(unicos)


export let filterMovieGenero = (array, genero) =>{   // Filtro de Array de generos 
    if (genero){
    return array.filter(movie => movie.genres.includes(genero));
    } else { return array
    }
} 


export let titulos = (array, input) =>{
    if (input){
    return  array.filter(element => element.title.toLowerCase().trim().includes(input)); // Filtro de titulos de peliculas
    } else { return array
    }
} 

export function filtroCruzado(movies, inputValue, selectGenero) {
    let filtradoPorMovie = titulos(movies, inputValue)
    let filtrarPorSearchYSelect = filterMovieGenero(filtradoPorMovie, selectGenero)
    return filtrarPorSearchYSelect
}