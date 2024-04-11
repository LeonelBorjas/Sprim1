let url = new URLSearchParams(location.search);
let id = url.get("id");

let targedCard = (array, key) => array.filter(object => object.id == key); //array (el array en el que se buscará) y key (el valor de identificación que se está buscando)
let targedMovie = targedCard(movies, id)[0]; // Aca se contiene el objeto de la pelicula selecionada 
let asideContent = (object) => 
`<img class="w-[90%] lg:w-full" src="${object.image}" alt="Imagen de Pelicula ${object.title}">
    <h4 class="w-full font-bold text-center text-lg mt-4 mb-5 md:mt-9">Movie Details</h4>
    <div class=" ">
        <table class="w-[100%] md:mt-2">        
            <tbody class="text-md " >
                <tr>
                    <th class="text-end px-2 py-1 w-1/2 border ">Original Language</th>
                    <td class="border px-2 py-1">${object.original_language}</td>
                </tr>
                <tr>
                    <th class="text-end px-2 py-1 w-1/2 border">Release Date</th>
                    <td class="border px-2 py-1">${object.release_date}</td>
                </tr>
                <tr>
                    <th class="text-end px-2 py-1 w-1/2 border">Runtime</th>
                    <td class="border px-2 py-1">${object.runtime}</td>
                </tr>
                <tr>
                    <th class="text-end px-2 py-1 w-1/2 border">Status</th>
                    <td class="border px-2 py-1">${object.status}</td>
                </tr>
            </tbody>
        </table>
    </div>`

let createAside = object => {
    let aside = document.createElement("aside");
    aside.className = "flex flex-wrap justify-center lg:w-[45%]";
    aside.innerHTML = asideContent(object); 
    return aside;
}

let asideElement = createAside(targedMovie)   // aside contenido 

let insertarContenidoAside = nodo => {    // insertar contenido a un div capturado 
    let main = document.getElementById("mainContainer");
    main.classList.add("flex", "flex-wrap", "justify-center");
    main.appendChild(nodo); 
    return main;
}

let main = insertarContenidoAside(asideElement)

let generos = targedMovie.genres
let createGenresNodes = array => array.map(genre => {
    let createH5 = document.createElement("h5");
    createH5.innerText = genre;
    createH5.className = "";
    return createH5;
});

let h5Element = createGenresNodes(generos)
// console.log(h5Element)

let divGeneros = array => {
    let newDiv = document.createElement("div");
    newDiv.className = ""
    array.forEach(nodo => {  //Solo ejecuta, no retorna
        newDiv.appendChild(nodo);
    });
    return newDiv // Me devuelve el div con los h5 element
}

let newDiv = divGeneros(h5Element).outerHTML //Nodo HTML Contenedor de los generos de la pelicula selecionada
console.log(newDiv)

let sectionContent =(nodo, object) => `
<h2 class="font-bold text-3xl mt-10 md:mb-5 ">${object.title}</h2>
<h4 class="my-4 w-full font-bold text-center">${object.tagline}</h4>
<hr>
<div class="flex flex-wrap w-full justify-center">
    <h4 class="font-bold text-lg mb-10 ">Genres:</h4>
    ${nodo}
</div>
<p class="">${object.overview}</p>
<h4 class="font-bold my-6 lg:w-full text-center">More movie details</h4>
<div class="">
    <table class="w-[100%]">
        <tbody class="text-md">
            <tr>
                <th class="text-end px-2 py-1 w-1/2 border">Vote average</th>
                <td class="border px-2 py-1">${object.vote_average}</td>
            </tr>
            <tr class="">
                <th class="text-end px-2 py-1 w-1/2 border">Budget</th>
                <td class="border px-2 py-1">usd ${object.budget}</td>
            </tr>
            <tr class="">
                <th class="text-end px-2 py-1 w-1/2 border">Revenue</th>
                <td class="border px-2 py-1">usd ${object.revenue}</td>
            </tr        
        </tbody>
    </table>
</div> `

let crearSection = (nodo, object) => {  //array (el array en el que se buscará) y object (el objeto de identificación que se está buscando)
    let sectionElement = document.createElement("section");
    sectionElement.className = "flex flex-wrap justify-center w-full text-lg p-2 lg:w-[45%]";
    sectionElement.innerHTML = sectionContent(nodo, object);
    main.appendChild(sectionElement)
    return sectionElement
}

let sectionElement = crearSection(newDiv, targedMovie)  //el contendor de los generos de la pelicula selecionada, targed es el objeto que contiene la informacion de la pelicula selecionada