export const createCards = objeto =>   // Funcion de Crear Cartas
`  
    <img class="mb-3" src="https://moviestack.onrender.com/static/${objeto.image}" alt="Imagen de Pelicula ${objeto.title}">
    <h3 class="font-bold">${objeto.title}</h3>
    <h5 class="font-bold">${objeto.tagline}</h5>
    <p class="italic line-clamp-5">${objeto.overview}</p>
    <div>
    <button class="" data-favid="${objeto.id}">
    <img src="../assets/img/heart.png" class="w-6 h-6" data-favid="${objeto.id}"/>
    </button>
    </div> 
    <a href="./details.html?id=${objeto.id}" id="button" class="border border-white" target="_blank">See more</a>`;
    

export let crearSelect = array => {   // Conteneder de creacion de select y Option 
    const selectContainer = document.createElement("div");  
    let select = document.createElement("select");
    let filtros = document.querySelector("#filtros")
    selectContainer.className = "bg-black w-[45%] rounded-md text-center h-8"
    select.innerHTML = `<option value="" selected>All</option>`;
    select.className = "bg-black w-full  rounded-md text-center  border ";
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


export let generosFiltro = array => Array.from(new Set(array.map(element => element.genres).flat())); // el .Flat sirve para eliminar los sub arrrays y extrar su contenido unicamente


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