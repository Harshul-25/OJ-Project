import React from 'react';

export default function Statement({name, description}){
    return (
        <section className='statement'>
            <h1>{name}</h1>
            <br/>
            <p style={{height:"100%", "white-space":"pre-wrap"}}>{description}</p>
        </section>
    )
}