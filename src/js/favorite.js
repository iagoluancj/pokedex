function addFavorite(bodyCard) {

        const favoriteIcon = bodyCard.querySelector('.IdFavorited');

        if (favoriteIcon.classList.contains('favorited')) {
            favoriteIcon.classList.remove('favorited');
        } else {
            favoriteIcon.classList.add('favorited');
        }
    

    function renderizaPokemons() {
        const favorites = JSON.parse(bodyCard.getAttribute('data-pokemon'));
        console.log(favorites)
    }

    return renderizaPokemons()

    // fazer uma função de if onde se o addFavorite ja tiver sido usado ==true, 
    // ele deve chamar o else que sera uma função pra remover

    //P4 - exportar os arquivos de alguam forma. 

    //P4 - fazer função para pegar os dados exportados e renderizar no novo html.

    //P5 - concertar o click no icone - feito 90% / RESOLVIDO. 

}
// function loadFavoritePokemons() {
//     pokeApi.getPokemons().then((pokemons = []) => {
//         const newHtml = pokemons.map((pokemon) => `
//             <div class="bodyCard hide-card" id="fatherCard" data-pokemon=${JSON.stringify(pokemon)}>