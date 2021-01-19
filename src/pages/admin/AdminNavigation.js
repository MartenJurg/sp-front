import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import React from "react";

const AdminNavigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg">

            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav" className='mr-5'>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Nav className="mr-auto">
                        <Link className="nav-item" to="/admin/deals">Pakkumised</Link>
                        <Link className="nav-item" to="/admin/categories">Kategooriad</Link>
                        <Link className="nav-item" to="/admin/invoices">Arved</Link>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AdminNavigation;