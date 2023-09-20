const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 15
const limit = 5
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <div class="body hide-card" id="fatherCard">
                <div class="flip" id="card">
                    <div class="face" id="front">
                        <ol id="pokemonList" class="pokemonsOl">    
                            <li class="pokemon ${pokemon.type}"  id="openModalBtn">
                                <div class="cardTopContent">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="m480-190-17-16.5q-98.401-89.805-162.736-154.209-64.335-64.405-102.084-112.75-37.749-48.344-51.964-87.081Q132-599.276 132-637q0-69.718 47.5-117.359Q227-802 297-802q53.466 0 99.983 30T480-684q38-58.5 83.292-88.25Q608.583-802 663.129-802q69.876 0 117.373 47.531Q828-706.938 828-637.383q0 38.077-14.216 76.829-14.215 38.751-51.814 86.823-37.599 48.073-102.267 112.805Q595.034-296.193 497-206.5L480-190Zm0-30q97.204-88.739 160.273-151.698t100.148-110.13Q777.5-529 791.75-565.245 806-601.49 806-636.717q0-60.783-41.358-102.033Q723.283-780 663.471-780q-51.77 0-92.621 29Q530-722 490-658.5h-20Q429-722 387.812-751q-41.187-29-91.122-29-58.973 0-100.832 41.093Q154-697.814 154-635.962q0 35.08 14.73 71.135 14.73 36.055 50.934 83.01 36.203 46.955 99.52 110.136Q382.5-308.5 480-220Zm0-280.5Z"/></svg></a>
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
                                                <td>${pokemon.eggGroups}</td>
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

        // Adicione a lógica JavaScript para mostrar informações diferentes ao clicar no card
        const cards = document.querySelectorAll("#card");
        cards.forEach((card) => {
            card.addEventListener("click", function () {
                // Crie um novo elemento li com informações diferentes e adicione-o à lista
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
