import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/Navigation.scss';


function Navigation() {

    return(
        <nav>
            {/* <h1></h1> */}
            <ul>
                <Link to="/">CRM</Link>
                <Link to="/add">Dodaj klienta</Link>
            </ul>
        </nav>
    )
}

export default Navigation