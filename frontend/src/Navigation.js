import React from "react";
import {Link} from "react-router-dom";
import './index.css';

function Navigation(){

    return(
        <header>
            <form id="form">
                <Link to="/">
                    <h1>Widgets</h1>
                </Link>
                <h1>The most crappy site in the world</h1>
            </form>
        </header> 
    )

}

export default Navigation;