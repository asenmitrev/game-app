import React from 'react';
import './Card.scss';

export default function Card({ className, card }) {
    const {hp, initiative, power, alive, type, imageNr, name, armor,attackSpecial} = card;
    const ref = React.createRef();
    card.ref = ref;
    // const types = ['fairy', 'ice', 'grass', 'dark', 'psychic', 'fire', 'electric', 'water', 'normal'];
    return (
        <figure className={`card card--${type} + ${className} ${alive ? '' : 'card--dead'}`} ref={ref}>
            <div className="card__image-container">
                <img src={`${process.env.PUBLIC_URL}/img/${type}/${type}${imageNr}.jpg`} alt="Eevee" className="card__image" />   
            </div>
        
            <figcaption className="card__caption">
                <h1 className="card__name">{name}</h1>

                <h3 className="card__type">
                    {type}
                </h3>

                <table className="card__stats">
                    <tbody>
                        <tr>
                            <th>HP</th>
                            <td>{hp}</td>
                        </tr>
                        <tr>
                            <th>Power</th>
                            <td>{power}</td>
                        </tr>
                        <tr>
                            <th>Initiative</th>
                            <td>{initiative}</td>
                        </tr>
                        <tr>
                            <th>Armor</th>
                            <td>{armor}</td>
                        </tr>
                        <tr>
                            <th>Attack</th>
                            <td>{attackSpecial}</td>
                        </tr>
                    </tbody>
                </table>
                
                {/* <div class="card__abilities">
                    <h4 class="card__ability">
                        <span class="card__label">Ability</span>
                        Run Away
                    </h4>
                    <h4 class="card__ability">
                        <span class="card__label">Hidden Ability</span>
                        Anticipation
                    </h4>
                </div> */}
            </figcaption>
        </figure>
    )
}