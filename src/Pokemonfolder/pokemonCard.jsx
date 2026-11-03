export const Card = (props) => {
    const {curvalue}=props;
    return (
        <li className="pokemon-card">
            <figure>
                <img src={curvalue.sprites.other.dream_world.front_default} alt="" />
            </figure>
            <h1>{curvalue.name}</h1>
            <div className="types">
                <p className="para">{curvalue.types.map((val)=>(val.type.name)).join(",")}</p>
            </div>
            <div className="pokemon-stat grid-three-cols">
               <p className="pokemon-info"> 
                <span>Height : {curvalue.height}</span>
                </p>
                <p className="pokemon-info">              
                <span>Weight : {curvalue.weight} </span>
                </p>
                <p className="pokemon-info"> 
                <span>Speed : {curvalue.stats[5].base_stat} </span>
                </p>  
            </div>
            <div className="extra-details grid-three-cols">
                <div className="pokemon-info">
                    <span>{curvalue.base_experience}</span>
                    <p>Experience : </p>
                </div>                
                <div className="pokemon-info">
                    <span>{curvalue.stats[1].base_stat}</span>
                    <p>Attack : </p>
                </div>
                <div className="pokemon-info">
                    <span> {curvalue.abilities[0].ability.name}</span>
                    <p>Abilities : </p>
                </div>
            </div>
        </li>
    )
}