import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light justify-content-between px-5 ">
            <a className="navbar-brand" href="#">HireMe</a>

            <div className="navbar-brand">
                <a className="navbar-brand" href="#">Saved Jobs</a>
                <a className="navbar-brand" href="#">Logo</a>
                <a className="navbar-brand" href="#">Logo</a>
            </div>



        </nav>
    );
}

export default Navbar;
