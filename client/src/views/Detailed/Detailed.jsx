import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailed_pokemon } from "../../redux/actions/actions";

import ErrorPage from "../../components/ErrorPage/ErrorPage";
import Loading from "../../components/Loading/Loading";

import imageDefault from "../../assets/pikasurf.jpg";
import style from "./Detailed.module.css";


export default function Detailed() {
    const pokemon = useSelector(state => state.pokemon);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (pokemon.onePokemon.id !== id && !pokemon.loading && typeof (pokemon.onePokemon) !== "string") {
            dispatch(detailed_pokemon(id))
        }
    }, [dispatch, id, pokemon.loading, pokemon.onePokemon])

    const showTypes = () => {
        return pokemon.onePokemon.types.map((t, i) => {
            t = t.substring(0, 1).toUpperCase() + t.substring(1, t.length);
            return <p key={i} style={selectTypeClass(t)} className={style.type}>{t}</p>
        })
    }
    const showStats = () => {
        return pokemon.onePokemon.stats.map((s, i) => {
            return (
                <div key={i} className={style.stat}>
                    <span className={style.statName}>{s[0].substring(0, 1).toUpperCase() + s[0].substring(1, s[0].length)}</span>
                    <div className={style.statNum} ><span style={{ background: `linear-gradient(90deg, #FF4500 ${parseInt(s[1]) * 100 / 255 + "%"}, white ${parseInt(s[1]) * 100 / 255 + "%"})`, height: "30px", borderRadius: "10px" }}>{s[1]}</span></div>
                </div>
            )
        })
    }
    function selectTypeClass(type, style) {
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
                color = "black";
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
        return { background: bg, color: color }
    }
    const intToFloat = (data, type) => {
        data = data.toString()
        data = data.slice(0, data.length - 1) + "," + data.slice(data.length - 1) + " " + type;
        if (data[0] === ",") data = "0" + data
        return data;
    }
    const selectImage = () => {
        let num = Math.round(Math.random() * 100);
        if (num === 10 && pokemon.onePokemon.imageShiny) {
            return pokemon.onePokemon.imageShiny
        }
        return pokemon.onePokemon.image
    }
    const showData = () => {
        return (
            <div className={style.dataCont}>
                <div className={style.textContainer}>
                    <p className={style.name}>{pokemon.onePokemon.name.substring(0, 1).toUpperCase() + pokemon.onePokemon.name.substring(1, pokemon.onePokemon.name.length)}</p>
                    <p className={style.id}>N.° {pokemon.onePokemon.id}</p>
                </div>
                <img src={selectImage()} alt="pokemon" className={style.image} onError={(e => { e.target.onerror = null; e.target.src = imageDefault })} />
                <div style={{ width: "50%" }}>
                    <div className={style.typeCont}>
                        {showTypes()}
                        <p className={style.altStat}>Height: {intToFloat(pokemon.onePokemon.height, "m")}</p>
                        <p className={style.altStat}>Weight: {intToFloat(pokemon.onePokemon.weight, "kg")}</p>
                    </div>
                    <div className={style.statsCont}>
                        <p className={style.statsTitle}>Stats</p>
                        {showStats()}
                    </div>
                </div>
                <div className={style.altStatCont}>

                </div>

            </div>
        )
    }

    return (
        <div className={style.container}>
            {(pokemon.onePokemon.id === id && !pokemon.loading && typeof (pokemon.onePokemon) !== "string") && showData()}
            {pokemon.loading && <Loading />}
            {typeof (pokemon.onePokemon) === "string" && <ErrorPage />}
        </div>

    )
}