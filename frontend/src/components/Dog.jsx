import React from "react";
import '../index.css';

const Dog = ({item}) => (
    <div class="dog">
        <div class="title">
            <h2>Your Dog</h2>
            <img src={item.message} alt="Image" />
        </div>
    </div>
    );

export default Dog;