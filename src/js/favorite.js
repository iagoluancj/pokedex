const favoritos = [];

function addFavorite(bodyCard) {

    const favoriteIcon = bodyCard.querySelector('.IdFavorited');

    if (favoriteIcon.classList.contains('favorited')) {
        favoriteIcon.classList.remove('favorited');
    } else {
        favoriteIcon.classList.add('favorited');
    }

    const favorites = JSON.parse(bodyCard.getAttribute('data-pokemon'));

    const existingFavorite = favoritos.find((favorite) => favorite.number === favorites.number);

    if (!existingFavorite) {
        // Se não estiver na lista, adicione-o
        favoritos.push(favorites);
    } else {
        // Se já estiver na lista, remova-o
        const index = favoritos.indexOf(existingFavorite);
        if (index !== -1) {
            favoritos.splice(index, 1);
        }
    }

    localStorage.setItem('favorites', JSON.stringify(favoritos));

    renderizaPokemonsFavoritos();
}

function renderizaPokemonsFavoritos() {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];

    const favoritesContainer = document.getElementById('favoritesContainer');

    const addedPokemons = {};
    favoritesContainer.innerHTML = '';

    favoritesFromStorage.forEach((favorite) => {
        const number = favorite.number;
        const names = favorite.name;
        const type = favorite.type;
        const types = favorite.types.join(', ');
        const photo = favorite.photo;
        const specie = favorite.specie;
        const height = favorite.height;
        const weight = favorite.weight;
        const eggGroups = favorite.eggGroups.join(', ');

        if (!addedPokemons[number]) {

            addedPokemons[number] = true; 
    
            const newHtmlFavoritePage = `
            <div class="favorited__Pokemon">
                <div class="favorited__Details">
                    <div>
                        <p>${names} diz olá para você e para o mundo</p>
                    </div>
                    <div class="caraPrecisaMudarEsseNome">
                        <div class="spans">
                            <span>${number}</span>
                            <span>${types}</span>
                            <span>${names}</span>
                        </div>
                        <div class="imgSpan">
                            <img src="${photo}" alt="${names}">
                        </div>
                    </div>
                </div>
                <div class="favorited__specificeDetails">
                    <span>${height}</span>
                    <span>${weight}</span>
                    <span>${eggGroups}</span>
                </div>
            </div>
            `;
            favoritesContainer.innerHTML += newHtmlFavoritePage;
        }
    });
}

renderizaPokemonsFavoritos();

//P3 - exportar os arquivos de alguam forma - FEITO.

//P3 - fazer função para pegar os dados exportados e renderizar no novo html.

//P4 Criar um if onde se o addFavorite ja tiver sido usado ==true, ele deve chamar o else que sera uma função pra remover / RESOLVIDO.

//P5 - concertar o click no icone - feito 90% / RESOLVIDO. 