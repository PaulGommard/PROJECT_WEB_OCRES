import React from "react";
import '../index.css';

const Joke = ({item}) => (
    <div class="joke">
        <div class="title">
            <h2>The Joke Of The Day</h2>
            <p>{item}</p>
        </div>
    </div>
        );

export default Joke;