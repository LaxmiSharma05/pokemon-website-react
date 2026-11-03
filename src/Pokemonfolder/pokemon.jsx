import { useEffect, useState } from "react";
import { Card } from "./pokemonCard";

export const Pokemon = () => {
    const [searchval, getsearch] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorIs, getError] = useState(null);
    const handleChange = (e) => {
        getsearch(e.target.value);
    }
    const API = "https://pokeapi.co/api/v2/pokemon?limit=50";
    const fetchApi = async () => {
        try {
            //getting pokemon api data
            const apiData = await fetch(API);
            const data = await apiData.json();
            //getting results.url api and calling it and storing response in resultapi
            const resultApi = data.results.map(async (pokemon) => {
                const urlcall = await fetch(pokemon.url);
                const dataconvert = await urlcall.json();
                return dataconvert;
            });
            //checking if all api are fetched or not
            const allfulfilled = await Promise.all(resultApi);
            setPokemon(allfulfilled);
            console.log(allfulfilled);
        } catch (error) {
            console.log(error);
            getError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApi();
    }, [])
    if (errorIs) {
        return <h1>{errorIs.message}</h1>
    }
    if (loading) {
        return <h1>Loading...</h1>
    }
    return <>
        <section className="container">
            <header>
                <h1>Let's Catch Pokémon </h1>
            </header>
            <div className="searchBox">
                <input type="search" name="search" id="searchbox" placeholder="Search Pokémon..." value={searchval} onChange={handleChange} />
            </div>
            <div>
                <ul className="cards grid-three-cols ">
                    {
                        pokemon.map((curpokemon) => {
                            if ((curpokemon.name).toLowerCase().includes(searchval.toLowerCase())) {
                                return (                                   
                                <Card key={curpokemon.id} curvalue={curpokemon} />
                                )
                            }else{
                            return null;
                            }
                        })
                    }
                </ul>
            </div>
        </section>
    </>
};