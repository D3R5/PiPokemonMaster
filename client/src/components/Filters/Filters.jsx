import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filter_pokemon, filter_reset } from "../../redux/actions/actions";
import style from "./Filters.module.css";

export default function Filters() {
    const [filters, setFilters] = useState({
        origin: "all",
        type: "all",
        sort: "none",
    });
    const dispatch = useDispatch();

    const changeFilters = (filter, value) => {
        let newFilter = filters;
        newFilter[filter] = value;
        setFilters(newFilter);
    };
    const handleChange = (e) => {
        if (e.target.getAttribute("filter") === "origin")
            changeFilters("origin", e.target.getAttribute("id"));
        if (e.target.getAttribute("filter") === "type")
            changeFilters(
                "type",
                e.target[e.target.selectedIndex].getAttribute("id")
            );
        if (e.target.getAttribute("filter") === "sort")
            changeFilters(
                "sort",
                e.target[e.target.selectedIndex].getAttribute("id")
            );
        console.log(filters);
        dispatch(filter_pokemon(filters));
    };
    const handleReset = () => {
        dispatch(filter_reset());
    };

    return (
        <div className={style.container}>
            <div>
                <p className={style.title}>Origin</p>
                <div className={style.originCont}>
                    <label htmlFor="all">
                        <input
                            type="radio"
                            name="origin"
                            id="all"
                            onChange={handleChange}
                            filter="origin"
                            className={style.inputOrigin}
                        />
                        <span className={style.originSpan}>ALL</span>
                    </label>
                    <label htmlFor="db">
                        <input
                            type="radio"
                            name="origin"
                            id="db"
                            onChange={handleChange}
                            filter="origin"
                            className={style.inputOrigin}
                        />
                        <span className={style.originSpan}>DB</span>
                    </label>
                    <label htmlFor="api">
                        <input
                            type="radio"
                            name="origin"
                            id="api"
                            onChange={handleChange}
                            filter="origin"
                            className={style.inputOrigin}
                        />
                        <span className={style.originSpan}>API</span>
                    </label>
                </div>
            </div>
            <div>
                <p className={style.title}>Type</p>
                <select onChange={handleChange} filter="type">
                    <option id="all">All</option>
                    <option id="normal">Normal</option>
                    <option id="fighting">Fighting</option>
                    <option id="flying">Flying</option>
                    <option id="poison">Poison</option>
                    <option id="ground">Ground</option>
                    <option id="rock">Rock</option>
                    <option id="bug">Bug</option>
                    <option id="ghost">Ghost</option>
                    <option id="steel">Steel</option>
                    <option id="fire">Fire</option>
                    <option id="water">Water</option>
                    <option id="grass">Grass</option>
                    <option id="electric">Electric</option>
                    <option id="psychic">Psychic</option>
                    <option id="ice">Ice</option>
                    <option id="dragon">Dragon</option>
                    <option id="dark">Dark</option>
                    <option id="fairy">Fairy</option>
                    <option id="shadow">Shadow</option>
                    <option id="unknown">Unknown</option>
                </select>
            </div>
            <div>
                <p className={style.title}>Sort</p>
                <select onChange={handleChange} filter="sort">
                    <option id="none">None</option>
                    <option id="A-Z">A-Z</option>
                    <option id="Z-A">Z-A</option>
                    <option id="100-0">Best attack</option>
                    <option id="0-100">Worst attack</option>
                </select>
            </div>
            <button onClick={handleReset} className={style.button}>
                Clear filters
            </button>
        </div>
    );
}
