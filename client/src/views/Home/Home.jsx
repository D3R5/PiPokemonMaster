import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { find_pokemon } from "../../redux/actions/actions";

import Paginate from "../../components/Paginate/Paginate";
import Loading from "../../components/Loading/Loading";
import Filters from "../../components/Filters/Filters";

import style from "./Home.module.css";


export default function Home(){
    const pokemon = useSelector(state => state.pokemon)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(pokemon.originalPokemons.length === 0 && !pokemon.loading){
            dispatch(find_pokemon())
        }
    },[pokemon.originalPokemons, dispatch, pokemon.loading]);
  
    return(
        <div className={style.container}>
            {(pokemon.loading) && <Loading/>}
            {(!pokemon.loading && pokemon.originalPokemons.length > 0) && <Filters/>}
            {(!pokemon.loading && pokemon.originalPokemons.length > 0) && <Paginate/>}
        </div>
    )
}