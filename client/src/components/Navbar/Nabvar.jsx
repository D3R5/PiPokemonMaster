import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import Search from "../Search/Search"
import { useDispatch } from "react-redux";
import { find_pokemon } from "../../redux/actions/actions";

import image from "../../assets/pokeball.png"
import pokeHenry from "../../assets/pokehenry.png"


export default function Navbar() {
    const dispatch = useDispatch();

    const reloadPokes = () => {
        dispatch(find_pokemon())
    }
    
    return (
        <div className={style.container}>
            <ul className={style.ulContainer}>
                <li className={style.liContainer}>
                    <NavLink
                        to={"/home"}
                        className={style.link}
                        activeClassName={style.selected}
                    >Home
                    </NavLink>
                </li>
                <li className={style.liContainer}>
                    <NavLink
                        to={"/create"}
                        className={style.link}
                        activeClassName={style.selected}
                    >Create Pokémon
                    </NavLink>
                </li>
            </ul>
            <Search />
            <img className={style.pokehenry} src={pokeHenry} alt="pokehenry" />
            <img className={style.pokehenry2} src={pokeHenry} alt="pokehenry" />
            <button data="Reload" className={style.reload} onClick={reloadPokes}>
                <img src={image} alt="reload" />
            </button>
        </div>
    )
}  