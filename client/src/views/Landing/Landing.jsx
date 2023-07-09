import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import image from "../../assets/logo.png"
import pokedex from "../../assets/pokedex.png"

export default function Landing(){
    return(
        <div className={style.container}>
            <img src={pokedex} alt="logo" className={style.pokedex} />
            <img src={image} alt="logo" className={style.image} />
            <Link to="/home" className={style.button}><p className={style.text}>PRESS START</p></Link>
        </div>
    )
}  
