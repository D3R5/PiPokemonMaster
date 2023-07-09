import React from "react";
import { Link } from "react-router-dom";

import style from "./Card.module.css";
import imageDefault from "../../assets/pikasurf.jpg";

export default function Card({ pokemon }) {
    

    const imgback = () => {
        return (
            <div>
                {pokemon.imageBack.map((t, i) => {
                    t = t.substring(0, 1).toUpperCase() + t.substring(1, t.length);
                    return <p key={i} className={[style.type, t].join(" ")} style={selectTypeClass(t)}>{t}</p>
                })}
            </div>
        )
    }

    const selectImage = () => {
        let num = Math.round(Math.random() * 100);
        if (num === 1 && pokemon.imageShiny) return pokemon.imageShiny;
        return pokemon.image
    }
    const showTypes = () => {
        return (
            <div className={style.typeContainer}>
                {pokemon.types.map((t, i) => {
                    t = t.substring(0, 1).toUpperCase() + t.substring(1, t.length);
                    return <p key={i} className={[style.type, t].join(" ")} style={selectTypeClass(t)}>{t}</p>
                })}
            </div>
        )
    }
    function selectTypeClass(type, style){
        let bg = "";
        let color = "";
        switch (type) {
            case "Normal":
                bg = "#A8A090";
                color = "black";
                break;
            case "Fighting":
                bg = "#A05038";
                color = "white";
                break;
            case "Flying":
                bg = "#98A8F0";
                color = "black";
                break;
            case "Poison":
                bg = "#B058A0";
                color = "white";
                break;
            case "Ground":
                bg = "#E9D6A4";
                color = "black";
                break;
            case "Rock":
                bg = "#B8A058";
                color = "white";
                break;
            case "Bug":
                bg = "#A8B820";
                color = "white";
                break;
            case "Ghost":
                bg = "#6060B0";
                color = "white";
                break;
            case "Steel":
                bg = "#A8A8C0";
                color = "black";
                break;
            case "Fire":
                bg = "#F05030";
                color = "white";
                break;
            case "Water":
                bg = "#3899F8";
                color = "white";
                break;
            case "Grass":
                bg = "#78C850";
                color = "white";
                break;
            case "Electric":
                bg = "#F8D030";
                color = "black";
                break;
            case "Psychic":
                bg = "#F870A0";
                color = "white";
                break;
            case "Ice":
                bg = "#58C8E0";
                color = "black";
                break;
            case "Dragon":
                bg = "#7860E0";
                color = "white";
                break;
            case "Dark":
                bg = "#7A5848";
                color = "white";
                break;
            case "Fairy":
                bg = "#E79FE7";
                color = "black";
                break;
            case "Shadow":
                bg = "#6060B0";
                color = "white";
                break;
            case "Unknown":
                bg = "black";
                color = "white";
                break;
            default:
                bg = "white";
                color = "black"
        }
        return {background: bg, color: color}
    }
    
    return (
        <div className={style.container}>
            <img src={selectImage()} alt="Pokemon_image" className={style.image} onError={(e => {e.target.onerror = null; e.target.src = imageDefault})} />
            <p className={style.name}>{pokemon.name.substring(0,1).toUpperCase()+pokemon.name.substring(1,pokemon.name.length)}</p>
            {showTypes()}
            <Link to={`details/${pokemon.id}`} className={style.button}>Poke details</Link>
        </div>
    )
}