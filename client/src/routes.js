import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/home";
import Header from "./components/header";
import UserAccess from "./components/userArea/access";
import { ToastContainer } from "react-toastify";
import AutoSignin from "./components/hoc/autoSignin";
import UserArea from "./components/hoc/userArea";
import Profile from "./components/userArea/profile";
import Articles from "./components/userArea/articles";
import CreateArticle from "./components/userArea/articles/create";


class Routes extends Component{
    render () {
        return(<BrowserRouter>
        <AutoSignin>
            <Header/>
            <Container className="mt-4">
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="/sign_in" component={UserAccess}/>
                    <Route path="/user_area/profile" component={Profile}/>
                    <Route path="/user_area/create" component={CreateArticle}/>
                    <Route path="/user_area/articles" component={Articles}/>
                    <Route path="/user_area" component={UserArea}/>
                </Switch>
            </Container>
            <ToastContainer/>
            </AutoSignin>
            </BrowserRouter>)

    }    
}

export default Routes; 