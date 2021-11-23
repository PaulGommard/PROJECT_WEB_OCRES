import React from "react";
import '../index.css';

const Coronavirus = ({item}) => (
    <div class="coronavirus">
        <div class="title">
            <h2>Coronavirus In United States For Today</h2>
        </div>

        <div className="description">
            <p>Total Death : {item.death}</p>
            <p>Death Increase : {item.deathIncrease}</p>
            <p>Total Hospitalized : {item.hospitalizedCumulative}</p>
            <p>Hospitalized Increase : {item.hospitalizedIncrease}</p>
        </div>
        
    </div>
    );

export default Coronavirus;