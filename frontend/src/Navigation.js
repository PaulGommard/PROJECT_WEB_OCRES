import React from "react";
import { Link } from "react-router-dom";
import './index.css';

function Navigation() {

    return (
        <header>
            <a className="bn60" href="/widgets">
                Widgets
            </a>
            <a className="bn60" href="/dashboard">
                Dashboard
            </a>
        </header>
    )

}

export default Navigation;