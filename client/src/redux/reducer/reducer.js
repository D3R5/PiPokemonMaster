import {
    FIND_POKEMON_REQUEST,
    FIND_POKEMON_SUCCESS,
    FIND_SEARCH_REQUEST,
    FIND_SEARCH_SUCCESS,
    FIND_FAILURE,
    FIND_SEARCH_FAILURE,
    FILTER_POKEMON,
    FILTER_RESET,
    CREATE_POKEMON,
    DELETE_POKEMON,
    DETAILED_POKEMON_SUCCESS,
    SET_PAGE,
    SET_SEARCH_SUCCESS
} from "../actions/actions";
 
const initialState = {
    originalPokemons: [],
    pokemons: [],
    onePokemon: {},
    page: 1,
    msg: "",
    loading: false,
    searchSuccess: false,
};

const pokemons = (state = initialState, action) => {
    switch(action.type){

        case FIND_POKEMON_REQUEST: {
            return{
                ...state,
                loading: true
            }
        }
        case FIND_POKEMON_SUCCESS: {
            return{
                ...state,
                loading: false,
                originalPokemons: action.payload,
                pokemons: action.payload,
            }
        }
        case FIND_FAILURE: {
            return{
                ...state,
                msg: action.payload,
                loading: false
            }
        }
        case CREATE_POKEMON: {
            return{
                ...state,
                loading: false,
            }
        }
        case DELETE_POKEMON: {
            return{
                ...state,
                originalPokemons: state.originalPokemons.filter(p => p.id !== action.payload),
                pokemons: state.pokemons.filter(p => p.id !== action.payload)
            }
        }
        case FIND_SEARCH_REQUEST: {
            return{
                ...state,
                loading: true
            }
        }
        case FIND_SEARCH_SUCCESS: {
            if(typeof(action.payload) === "object"){
                return{
                    ...state,
                    loading: false,
                    onePokemon: action.payload,
                    searchSuccess: true
                }
            }else{
                alert(action.payload)
                return{
                    ...state,
                    loading: false,
                    msg: action.payload
                }
            } 
        }
        case FIND_SEARCH_FAILURE: {
            return{
                ...state,
                loading: false,
                msg: action.payload
            }
        }
        case SET_SEARCH_SUCCESS: {
            return{
                ...state,
                searchSuccess: false,
            }
        }
        case DETAILED_POKEMON_SUCCESS: {
            return{
                ...state,
                loading: false,
                onePokemon: action.payload
            }
        }
        case FILTER_POKEMON: {
            let newPokes = [...state.originalPokemons];

            if(action.payload.origin !== ""){
                switch (action.payload.origin) {
                    case "all":
                        break;
                    case "db":
                        newPokes = newPokes.filter(p => p.createDB);
                        break;
                    case "api":
                        newPokes = newPokes.filter(p => !p.createDB);
                        break;
                    default:
                        console.log("error filters origin")
                        break;
                }
            }
            if(action.payload.type !== ""){
                if(action.payload.type !== "all"){
                    newPokes = newPokes.filter(p => p.types.includes(action.payload.type))
                }
            }
            if(action.payload.sort !== ""){
                if(action.payload.sort !== "none"){
                    switch (action.payload.sort) {
                        case "A-Z":
                            let n = newPokes.length;
    
                            for (let i = 0; i < n; i++) {
                                let min = i;
                                for (let j = i + 1; j < n; j++) {
                                    if (newPokes[j].name < newPokes[min].name) {
                                        min = j;
                                    }
                                }
                                if (min !== i) {
                                    let tmp = newPokes[i];
                                    newPokes[i] = newPokes[min];
                                    newPokes[min] = tmp;
                                }
                            }
                            break;
                        case "Z-A":
                            let m = newPokes.length;
                            for (let i = 0; i < m; i++) {
                                let min = i;
                                for (let j = i + 1; j < m; j++) {
                                    if (newPokes[j].name > newPokes[min].name) {
                                        min = j;
                                    }
                                }
                                if (min !== i) {
                                    let tmp = newPokes[i];
                                    newPokes[i] = newPokes[min];
                                    newPokes[min] = tmp;
                                }
                            }
                            break;
                        case "100-0":
                            let p = newPokes.length;
                            for (let i = 0; i < p; i++) {
                                let min = i;
                                for (let j = i + 1; j < p; j++) {
                                    if (newPokes[j].stats[1][1] > newPokes[min].stats[1][1]) {
                                        min = j;
                                    }
                                }
                                if (min !== i) {
                                    let tmp = newPokes[i];
                                    newPokes[i] = newPokes[min];
                                    newPokes[min] = tmp;
                                }
                            }
                            break;
                        case "0-100":
                            let r = newPokes.length;
                            for (let i = 0; i < r; i++) {
                                let min = i;
                                for (let j = i + 1; j < r; j++) {
                                    if (newPokes[j].stats[1][1] < newPokes[min].stats[1][1]) {
                                        min = j;
                                    }
                                }
                                if (min !== i) {
                                    let tmp = newPokes[i];
                                    newPokes[i] = newPokes[min];
                                    newPokes[min] = tmp;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            return{
                ...state,
                pokemons: newPokes,
                page: 1
            }
        }
        case FILTER_RESET: {
            return{
                ...state,
                pokemons: state.originalPokemons
            }
        }
        case SET_PAGE: {
            return{
                ...state,
                page: action.payload
            }
        }
        default:
            return { ...state };
    }
}

export default pokemons;