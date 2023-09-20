function filterPokemon(searchText) {
    const cards = document.querySelectorAll('.pokemon');

    const matchingCards = Array.from(cards).filter((card) => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        const type = card.querySelector('.type').textContent.toLowerCase();

        return type.includes(searchText) || name.includes(searchText)
    });

    resultCount.textContent = `Resultados encontrados: ${matchingCards.length/2}`;


// O ERRO ESTÁ NO CARD 2, ONDE podemos ver que o card 1 some porém o verso do card 2 continua como elemento visivel. 
    const bodyCard = document.querySelectorAll('.body');
    bodyCard.forEach((body) => {
        const name = body.querySelector('.name').textContent.toLowerCase();
        const types = body.querySelector('.types').textContent.toLowerCase();

        if (name.includes(searchText.toLowerCase()) || types.includes(searchText.toLowerCase())) {
            body.style.display = 'block';
        } else {
            body.style.display = 'none';
        }
    });
// AE PORRRAAAAA
}

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function () {
    const searchText = searchInput.value;
    filterPokemon(searchText);
});