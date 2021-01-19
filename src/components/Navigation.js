import React, {useEffect} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, Redirect} from 'react-router-dom'
import {useStoreActions, useStoreState} from "easy-peasy";
import { checkUser} from "../Auth";

const Navigation = () => {

    const {checkToken} = useStoreActions(actions => actions.token);
    const {token} = useStoreState(state => state.token);

    const logout = () => {
        localStorage.removeItem('token')
        checkToken()
        window.location.reload()
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="global-bg">
            <Navbar.Brand as={Link} to="/">
                <img
                    alt=""
                    width="100"
                    src={require("../resources/images/studentpraxis_logo.png")}
                    className="logo d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav" className='mr-5'>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Nav className="mr-auto">
                        {checkUser(true) ? <Link className="nav-item" to="/admin/deals">Pakkumised</Link> : "" }
                        {checkUser(true) ? <Link className="nav-item" to="/admin/categories">Kategooriad</Link> : "" }
                        {checkUser(true) ? <Link className="nav-item" to="/admin/invoices">Arved</Link> : "" }
                        <Link className="nav-item" to="/praktikapakkujale">Praktikapakkujale</Link>
                        <Link className="nav-item" to="/praktikandile">Praktikandile</Link>
                        {token === ""
                            ? <Link className="nav-item" to="/login">Sisene</Link>
                            : <Link className="nav-item" to="/profiil">Profiil</Link>}
                        {token !== "" ? <Link className="nav-item" onClick={() => logout()}>Logout</Link> : ''}
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Navigation;