import React from 'react';
import './Card.scss';

export default function Card({ className, card }) {
    const {hp, initiative, power, alive} = card;
    // const types = ['fairy', 'ice', 'grass', 'dark', 'psychic', 'fire', 'electric', 'water', 'normal'];
    const types = ['grass', 'dark', 'fire', 'water', 'psychic', 'electric'];
    
    const cardVisualType = getRandomArrayElement(types);
    const imageNr = getRandomArrayElement([1,2,3,4]);
    return (
        <figure className={`card card--${cardVisualType} + ${className} ${alive ? '' : 'card--dead'}`}>
            <div className="card__image-container">
                <img src={`${process.env.PUBLIC_URL}/img/${cardVisualType}/${cardVisualType}${imageNr}.jpg`} alt="Eevee" className="card__image" />   
            </div>
        
            <figcaption className="card__caption">
                {/* <h1 class="card__name">Eevee</h1> */}

                <h3 className="card__type">
                    {cardVisualType}
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

function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}