const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 40
const limit = 20
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <div class="bodyCard hide-card" id="fatherCard" data-pokemon=${JSON.stringify(pokemon)}>
            <div class="favoriteButton">
                <i class="material-icons ${pokemon.type} IdFavorited" onclick="addFavorite(this.closest('.bodyCard'))">favorite</i>
            </div>
                <div class="flip" id="card">
                    <div class="face" id="front">   
                        <ol id="pokemonList" class="pokemonsOl">
                        <div class="rotate ${pokemon.type}">   
                            <li class="pokemon"  id="openModalBtn">
                                <div class="cardTopContent">
                                    <span class="number">#${pokemon.number}</span>
                                </div>
                                <span class="name">${pokemon.name}</span>
                                <div class="detail">
                                    <ol class="types">
                                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                                    </ol>
                                    <div class="divDeOpacity">
                                        <div class="opacity"></div>
                                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                                    </div>
                                </div>
                            </li>
                        </div> 
                        </ol>
                    </div>
                    <div class="face" id="back">
                        <ol id="pokemonList" class="pokemonsOl">    
                            <li class="pokemon ${pokemon.type}"  id="openModalBtn">
                                <span class="number">#${pokemon.number}</span>
                                <span class="name">${pokemon.name}</span>
                                <div class="detail">
                                <div class="divDeOpacity">
                                    <span class="opacity"></span>
                                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                                </div>
                                    <ol class="types">
                                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                                    </ol>
                                </div>
                            </li>
                            <section class="details ${pokemon.type}">
                                <div class="about">
                                    <div class="indexs">
                                        <a href="#" class="aboutTitle">About</a>
                                        <a href="#" class="aboutTitle">Base stats</a>
                                        <a href="#" class="aboutTitle">Evoluti</a>
                                    </div>
                                    <div class="specificDetails">
                                        <table>
                                            <tr>
                                                <th>Species:</th>
                                                <td>-Seed</td>
                                            </tr>
                                            <tr>
                                                <th>Height</th>
                                                <td>${pokemon.height} m</td>
                                            </tr>
                                            <tr>
                                                <th>Weight:</th>
                                                <td>${pokemon.weight} Kg</td>
                                            </tr>
                                            <tr>
                                                <th>Abilities:</th>
                                                <td>-Overgrow, Chlorophyl</td>
                                            </tr>
                                        </table>
                                        <h4>Breending</h4>
                                        <table>                                        
                                            <tr>
                                                <th>Gender:</th>
                                                <td>-Bináre</td>
                                            </tr>
                                            <tr>
                                                <th>Egg Groups:</th>
                                                <td>${pokemon.eggGroups.join(', ')}</td>
                                            </tr>
                                            <tr>
                                                <th>Egg Cycle:</th>
                                                <td>-Grass</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>                 
                        </section>
                    
                        </ol>
                    </div>
                </div>
            </div>
        `).join('');

        pokemonList.innerHTML += newHtml;

        const cards = document.querySelectorAll("#card");
        cards.forEach((card) => {
            card.addEventListener("click", function () {
                setTimeout(function () {
                    card.classList.toggle("flip")
                    const father = card.parentNode;
                    father.classList.toggle("bottomAjust")
                }, 1);
            });
        });
    });
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit


    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.classList.remove('hoverClass');
        loadMoreButton.classList.add('desabilitar');

    } else {
        loadPokemonItens(offset, limit)
    }

})
