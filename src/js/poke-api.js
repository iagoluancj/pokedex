const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = (pokeDetail.height / 10).toFixed(1)
    pokemon.weight = (pokeDetail.weight / 10).toFixed(1)
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        // .then(convertPokeApiDetailToPokemon)
        .then((pokeDetail) => {
            // Chame a função convertPokeApiDetailToPokemon para obter os detalhes do Pokémon
            const convertedPokemon = convertPokeApiDetailToPokemon(pokeDetail);
            
            // Faça uma solicitação separada para obter os detalhes da espécie do Pokémon
            return fetch(pokeDetail.species.url)
                .then((response) => response.json())
                .then((speciesData) => {
                    // Acesse as informações sobre grupos de ovos a partir dos detalhes da espécie
                    const eggGroups = speciesData.egg_groups.map((group) => group.name);
                    convertedPokemon.eggGroups = eggGroups;

                    // Retorne o objeto Pokémon com as informações adicionais
                    return convertedPokemon;
                });
        });
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) 
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}