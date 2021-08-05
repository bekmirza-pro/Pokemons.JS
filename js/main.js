const elPokemonList = makeElament('.pokemon_list');
const elPokemonTemplate = makeElament('.pokemon_template').content;

// *******************modal***********************
const elModalInfo = makeElament('.modal');
const elModalDesciription = makeElament('.modal_desciription');
const elCloseModalBtn = makeElament('.modal_close-btn')
const elTypesList = makeElament('.type_list');
const elWeaknessesList = makeElament('.weaknesses_list');
const elEgg = makeElament('.egg');
const elTime = makeElament('.time');

elCloseModalBtn.addEventListener('click', (evt)=>{
    elModalInfo.classList.remove('modal_active');
})

//***************/ Form Elements*******************

const elForm = makeElament('.form');
const elInputSearch = makeElament('.pokemon_input', elForm);
const elSelectSort = makeElament('.pokemon_sort', elForm);
const elHeight = makeElament('.height');
const elWidth = makeElament('.width');

function renderPokemon(pokemonArr, element){

        element.innerHTML = null;

        pokemonArr.forEach(pokemon => {
        const pokemonTemplate = elPokemonTemplate.cloneNode(true);
        makeElament('.pokemon_img', pokemonTemplate).setAttribute('src', pokemon.img);
        makeElament('.pokemon_img', pokemonTemplate).setAttribute('alt', pokemon.name);

        
        makeElament('.id', pokemonTemplate).textContent = pokemon.id;
        makeElament('.number', pokemonTemplate).textContent = pokemon.num;
        makeElament('.pokemon_heading', pokemonTemplate).textContent = pokemon.name;
        makeElament('.candy', pokemonTemplate).textContent = pokemon.candy;

        const elMoreBtn = makeElament('.pokemon_more-button', pokemonTemplate);
        elMoreBtn.dataset.pokemon_id = pokemon.id;

        elMoreBtn.addEventListener('click', (evt) => {
             elModalInfo.classList.add('modal_active');
             const pokemonId = evt.target.dataset.pokemon_id;

             elTypesList.innerHTML = null;
             elWeaknessesList.innerHTML = null;
             const foundPokemon = pokemonArr.find((item) => item.id == pokemonId);
             foundPokemon.type.forEach(types => {
                const newLi = createDOM('li');
                newLi.textContent = types;
    
                elTypesList.appendChild(newLi);
            });
            
               
        foundPokemon.weaknesses.forEach(weaknes => {
            const newLi = createDOM('li');
            newLi.textContent = weaknes;

            elWeaknessesList.appendChild(newLi);
        });

            elHeight.textContent = foundPokemon.height;
            elWidth.textContent = foundPokemon.weight;
            elEgg.textContent = foundPokemon.egg;
            elTime.textContent = foundPokemon.spawn_time;
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

    const sortedAlph = pokemonArr.sort((a, b) => {
        if(a.name > b.name){
            return 1;
        } else if(a.name < b.name){
            return -1;
        } else{
            return 0;
        }
    }); 
      
    const sortedDate = pokemonArr.sort((a, b) => {
        if(a.spawn_time > b.spawn_time){
            return 1;
        } else if(a.spawn_time < b.spawn_time){
            return -1;
        } else{
            return 0;
        }
    });

    if(format === 'a_z'){
       return sortedAlph;
    } else if(format === 'z_a'){
        return sortedAlph.reverse();
    } else if(format === 'old_new'){
        return sortedDate;
    } else if(format === 'new_old'){
        return sortedDate.reverse();
    } 
}