import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { find_create_pokemon, find_pokemon } from "../../redux/actions/actions";

import style from "./Create.module.css";

      
export default function Create() {

    const dispatch = useDispatch();
    
    const [dataPokemon, setDataPokemon] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0,
        types: [],
        height: 0,
        weight: 0,
    });
    
    const [errors, setErrors] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        special_attack: "",
        special_defense: "",
        speed: "",
        types: "",
        height: "",
        weight: ""
    })

    const checkErrors = (type, data) => {
        let error = "";
        switch (type) {
            case "name":
                if (!/^[A-Za-z\s]*$/.test(data)) error = "No se permiten numeros o caracteres especiales";
                if (data[0] === " ") error = "No pueden haber espacios al inicio";
                if (data === "") error = "No puede quedar vacio";
                if (data.length > 100) error = "No se permiten mas de 100 caracteres";
                break;
            case "image":
                if (data[0] === ".") error = "Ingrese una url valida"
                if (!(data.substring(data.length - 4) === ".png" || data.substring(data.length - 4) === ".jpg")) error = "La URL debe tener extensión .jpg o .png";
                if (data.includes(" ")) error = "La url de la imagen no puede contener espacios";
                if (data === "") error = "Este espacio no puede quedar en blanco";
                break;
            case "hp":
            case "attack":
            case "special_attack":
            case "defense":
            case "special_defense":
            case "speed":
            case "height":
            case "weight":
                if (data <= 0) error = "Seleccione un valor";
                break;
            case "types":
                if (data.length === 0) error = "Debe escoger al menos un tipo"
                if (data.length > 2) error = "No se pueden seleccionar más de dos tipos"
                break;
            default:
                break;
        }
        setErrors({
            ...errors,
            [type]: error
        })
    }
    const handleChange = (e) => {
        let arr = [];
        if (e.target.name === "name" || e.target.name === "image") {
            setDataPokemon({
                ...dataPokemon,
                [e.target.name]: e.target.value
            });
        } else if (e.target.name === "height" || e.target.name === "weight") {
            setDataPokemon({
                ...dataPokemon,
                [e.target.name]: e.target.value
            });
        }
        else if (e.target.name === "types") {
            if (e.target.checked) {
                arr = [...dataPokemon.types, e.target.id]
                setDataPokemon({
                    ...dataPokemon,
                    types: arr
                })
            } else {
                arr = dataPokemon.types.filter(t => t !== e.target.id)
                setDataPokemon({
                    ...dataPokemon,
                    types: arr
                })
            }

        } else {
            setDataPokemon({
                ...dataPokemon,
                [e.target.name]: e.target.value
            });
        }
        e.target.name !== "types" ? checkErrors(e.target.name, e.target.value) : checkErrors(e.target.name, arr)
    }

    const createCheckbox = () => {
        let array = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy", "Unknown", "Shadow"];
        return array.map((t, i) => {
            return <label key={i} className={style.labelCheck}>
                <input type="checkbox" id={t.toLowerCase()} name="types" onChange={handleChange} className={style.inputCheck} />
                <span>{t}</span>
            </label>
        })
    }
    const createStats = () => {
        let array = [ "hp", "weight","height", "attack", "defense", "special attack", "special defense", "speed"];
        return array.map((s, i) => {
            return (
                <div key={i} className={style.contStatsInd}>
                    <label htmlFor="">{s.substring(0, 1).toUpperCase() + s.substring(1, s.length)}</label>
                    <input type="range" id={s} min={1} max={500} step={1} name={s.replace(/\s/g, '_')} value={dataPokemon[s.replace(/\s/g, '_')]} onChange={handleChange} className={style.inputRange} />
                    <span>{dataPokemon[s.replace(/\s/g, '_')]}</span>
                    <p className={style.errors}>{errors[s.replace(/\s/g, '_')] && errors[s.replace(/\s/g, '_')]}</p>
                </div>
            )
        })
    }
    const checkAllErrors = () => {
        let error = ""
        for (let e in errors) {
            if (dataPokemon[e].length === 0 || dataPokemon[e] === 0 || errors[e] !== "") {
                error = "Campos vacios o con errores"
            }
        }
        if (error !== "") {
            alert(error);
            return false;
        } else return true;
    }
    const handleSubmit = () => {
        if (checkAllErrors()) {
            dispatch(find_create_pokemon(dataPokemon))
            dispatch(find_pokemon())
        }
    }

    return (
        <div className={style.container}>
            <button onClick={handleSubmit} className={style.title}>Click me to create your pokemon!!!</button>
            <form className={style.formClass}>
                <div style={{ width: "60%", display: "flex", alignItems: "flex-start", flexWrap: "wrap", justifyContent:"center" }}>
                    <div className={style.contInputText}>
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" placeholder="Name" value={dataPokemon.name} onChange={handleChange} className={style.inputText} />
                        <p className={style.errors}>{errors.name && errors.name}</p>
                    </div>
                    <div className={style.contInputText}>
                        <label htmlFor="">Image URL</label>
                        <input type="text" name="image" placeholder="Image URL" value={dataPokemon.image} onChange={handleChange} className={style.inputText} />
                        <p className={style.errors}>{errors.image && errors.image}</p>
                    </div>
                    <div className={style.contTypes}>
                        {createCheckbox()}
                        <p className={style.errors}>{errors.types && errors.types}</p>
                    </div>
                    
                </div>
                <div className={style.contStats}>
                    {createStats()}
                </div>
            </form>
        </div>
    )
}