import React from "react";
import "./styles/Header.css"

function Header() {
    return (
        <header className="container">
            <span className="logo">w8what</span>
            <nav>
                <ul>
                    <li className="active"><a href="#">temp</a></li>
                    <li className="btn"><a href="#">Какая вакансия вас интересует</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
