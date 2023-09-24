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
        .then((pokeDetail) => {
            const convertedPokemon = convertPokeApiDetailToPokemon(pokeDetail);
            
            return fetch(pokeDetail.species.url)
                .then((response) => response.json())
                .then((speciesData) => {
                    const eggGroups = speciesData.egg_groups.map((group) => group.name);
                    convertedPokemon.eggGroups = eggGroups;

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