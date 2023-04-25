import axios from "axios";

export const FIND_POKEMON = "FIND_POKEMON";
export const FIND_FAILURE = "FIND_FAILURE";
export const FIND_POKEMON_REQUEST = "FIND_POKEMON_REQUEST";
export const FIND_POKEMON_SUCCESS = "FIND_POKEMON_SUCCESS";
export const FIND_CREATE_POKEMON = "FIND_CREATE_POKEMON";
export const FIND_SEARCH_REQUEST = "FIND_SEARCH_REQUEST";
export const FIND_SEARCH_SUCCESS = "FIND_SEARCH_SUCCESS";
export const FIND_SEARCH_FAILURE = "FIND_SEARCH_FAILURE";
export const FILTER_POKEMON = "FILTER_POKEMON";
export const FILTER_RESET = "FILTER_RESET";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const DETAILED_POKEMON_SUCCESS = "DETAILED_POKEMON_SUCCESS";
export const DETAILED_POKEMON = "DETAILED_POKEMON";
export const SET_PAGE = "SET_PAGE";
export const SET_SEARCH_SUCCESS = "SET_SEARCH_SUCCESS";



export const find_pokemon = () => {
    return (dispatch) => {
        dispatch(find_pokemon_request());
        fetch("http://localhost:3001/pokemons")
            .then(response => response.json())
            .then(pokemons => {
                dispatch(find_pokemon_success(pokemons))
            })
            .catch(error => {
                dispatch(find_failure(error))
            })
    }
} 
export const find_failure = (error) => {
    return {
        type: FIND_FAILURE,
        payload: error
    }
}
export const find_pokemon_request = () => {
    return {
        type: FIND_POKEMON_REQUEST
    }
}
export const find_pokemon_success = (pokemons) => {
    return {
        type: FIND_POKEMON_SUCCESS,
        payload: pokemons
    }
}
export const find_create_pokemon = (pokemon) => {
    return (dispatch) => {
        dispatch(find_pokemon_request());
        fetch(`http://localhost:3001/pokemons`, {
            method: "POST",
            body: JSON.stringify(pokemon),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if(typeof(response) === "string"){
                alert(response)
            }else{
                let poke = response;
                poke.types = pokemon.types
                alert("Pokemon creado exitosamente");
                dispatch(create_pokemon(response))
            }
        })
        .catch(error => {
            alert("No se pudo crear el pokemon")
            dispatch(find_failure(error))
        })
    }
}
export const find_search_request = () => {
    return{
        type: FIND_SEARCH_REQUEST
    }
}
export const find_search_success = (pokemon) => {
    return{
        type: FIND_SEARCH_SUCCESS,
        payload: pokemon
    }
}
export const find_search_failure = (error) => {
    return{
        type: FIND_SEARCH_FAILURE,
        payload: error
    }
}


export const filter_pokemon = (filtros) => {
    return{
        type: FILTER_POKEMON,
        payload: filtros
    }
}
export const filter_reset = () => {
    return{
        type: FILTER_RESET
    }
}
export const create_pokemon = (pokemon) => {
    return{
        type: CREATE_POKEMON,
        payload: pokemon
    }
}
export const delete_pokemon = (id) => {
    return{
        type: DELETE_POKEMON,
        payload: id
    }
}
export const search_request = (name) => {
    return (dispatch) => {
        dispatch(find_search_request());
        fetch(`http://localhost:3001/pokemons?name=${name}`)
        .then(response => response.json())
        .then(response => {
            dispatch(find_search_success(response));
        })
        .catch(error => {
            dispatch(find_search_failure(error));
        })
    }
}
export const detailed_pokemon_success = (pokemon) => {
    return{
        type: DETAILED_POKEMON_SUCCESS,
        payload: pokemon
    }
}
export const detailed_pokemon = (id) => {
    return(dispatch)=> {
        dispatch(find_pokemon_request())
        fetch(`http://localhost:3001/pokemons/${id}`)
        .then(response => response.json())
        .then(response => {
            dispatch(detailed_pokemon_success(response))
        })
        .catch(error => {
            dispatch(find_failure(error))
        })
    }
}



export const set_page = (page) => {
    return{
        type: SET_PAGE,
        payload: page
    }
}
export const set_search_success = () => {
    return{
        type: SET_SEARCH_SUCCESS,
    }
}


export const find_delete_pokemon = (id) => {
    return() => {
        fetch(`http://localhost:3001/pokemons/${id}`,{
            method: "DELETE"
        })
        .then(response => response.json())
        .then(response => delete_pokemon(id))
        .catch(error => {
            console.log(error)
        })
    }
}