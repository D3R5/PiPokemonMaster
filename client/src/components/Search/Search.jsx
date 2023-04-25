import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { search_request, set_search_success } from "../../redux/actions/actions";
import style from "./Search.module.css";
import lupa from './lupa.png';

export default function Search() {


    document.addEventListener("DOMContentLoaded", function () {
        const myButton = document.getElementById("myButton");
    
        // Agrego un controlador de eventos para la tecla 'Enter'
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                myButton.click(() => {
                    if (checkInput()) {
                        dispatch(search_request(search))
                    } else {
                        alert("Please enter a name")
                    }
                });
            }
        });    
    });


    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemon);
    const history = useHistory();

    useEffect(() => {
        const redirect = () => {
            dispatch(set_search_success())
            history.push(`/details/${pokemon.onePokemon.id}`)
        }

        if (pokemon.searchSuccess) {
            redirect()
        }
    }, [pokemon.searchSuccess, dispatch, history, pokemon.onePokemon.id])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const checkInput = () => {
        return search !== "";
    }
    const handleClick = () => {
        if (checkInput()) {
            dispatch(search_request(search))
        } else {
            alert("Please enter a name")
        }
    }
    return (
        <div className={style.container}>
            <input type="text" name="" id="" placeholder="Write a Poke name or ID" onChange={handleChange} value={search} className={style.searchInput} />
            <button id="myButton" src="lupa" onClick={handleClick} className={style.searchButton}>
                <img src={lupa} alt="search" className={style.lupa} />
            </button>
            <p className={style.text} >Search for a Pokémon by name or using its National Pokédex number.</p>
        </div>
    )
}