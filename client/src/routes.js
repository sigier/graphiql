import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/home";
import Header from "./components/header";
import UserAccess from "./components/userArea/access";
import { ToastContainer } from "react-toastify";


class Routes extends Component{
    render () {
        return(<BrowserRouter>
            <Header/>
            <Container className="mt-4">
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="/sign_in" component={UserAccess}/>
                </Switch>
            </Container>
            <ToastContainer/>
            </BrowserRouter>)

    }    
}

export default Routes; 