const elPokemonList = makeElament('.pokemon_list');
const elPokemonTemplate = makeElament('.pokemon_template').content;

const elForm = makeElament('.form');
const elInputSearch = makeElament('.pokemon_input', elForm);
const elSelectSort = makeElament('.pokemon_sort', elForm);

// console.log(elInputSearch, elSelectSort);

function renderPokemon(pokemonArr, element){

        element.innerHTML = null;

        pokemonArr.forEach(pokemon => {
        const pokemonTemplate = elPokemonTemplate.cloneNode(true);
        makeElament('.pokemon_img', pokemonTemplate).setAttribute('src', pokemon.img);
        makeElament('.pokemon_img', pokemonTemplate).setAttribute('alt', pokemon.name);
        
        makeElament('.id', pokemonTemplate).textContent = pokemon.id;
        makeElament('.number', pokemonTemplate).textContent = pokemon.num;
        makeElament('.pokemon_heading', pokemonTemplate).textContent = pokemon.name;
        makeElament('.height', pokemonTemplate).textContent = pokemon.height;
        makeElament('.width', pokemonTemplate).textContent = pokemon.weight;
        makeElament('.candy', pokemonTemplate).textContent = pokemon.candy;
        makeElament('.time', pokemonTemplate).textContent = pokemon.spawn_time;
        makeElament('.egg', pokemonTemplate).textContent = pokemon.egg;
        
        const elTypesList = makeElament('.type_list', pokemonTemplate);
        elTypesList.innerHTML = null;

        pokemon.type.forEach(types => {
            const newLi = createDOM('li');
            newLi.textContent = types;

            elTypesList.appendChild(newLi);
        });

        const elWeaknessesList = makeElament('.weaknesses_list', pokemonTemplate);
        elWeaknessesList.innerHTML = null;

        pokemon.weaknesses.forEach(weaknes => {
            const newLi = createDOM('li');
            newLi.textContent = weaknes;

            elWeaknessesList.appendChild(newLi);
        });



        element.appendChild(pokemonTemplate);
    });
}

renderPokemon(pokemons, elPokemonList);


elForm.addEventListener('submit', (evt) =>{
    evt.preventDefault();

    const inputSearchValue = elInputSearch.value.trim();
    const selectSort = elSelectSort.value.trim();

    const regex = new RegExp(inputSearchValue, 'gi');
    const searchedPokemon = pokemons.filter(pokemon => pokemon.name.match(regex));

    const sortedPokemon = sortPokemon(searchedPokemon, selectSort);


    renderPokemon(sortedPokemon, elPokemonList);
    
})

function sortPokemon(pokemonArr, format){
    if(format === 'a_z'){
        return pokemonArr.sort((a, b) => {
            if(a.name > b.name){
                return 1;
            } else if(a.name < b.name){
                return -1;
            } else{
                return 0;
            }
        });
    } else if(format === 'z_a'){
        return pokemonArr.sort((a, b) => {
            if(a.name > b.name){
                return -1;
            } else if(a.name < b.name){
                return 1;
            } else{
                return 0;
            }
        });
    } else if(format === 'old_new'){
        return pokemonArr.sort((a, b) => {
            if(a.spawn_time > b.spawn_time){
                return 1;
            } else if(a.spawn_time < b.spawn_time){
                return -1;
            } else{
                return 0;
            }
        });
    } else if(format === 'new_old'){
        return pokemonArr.sort((a, b) => {
            if(a.spawn_time > b.spawn_time){
                return -1;
            } else if(a.spawn_time < b.spawn_time){
                return 1;
            } else{
                return 0;
            }
        });
    } 
}