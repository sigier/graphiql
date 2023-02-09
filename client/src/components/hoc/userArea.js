import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserArea = (props) => {

    return (
        <>
        <Navbar bg="light" variant="light"> 
            <Nav className="mr-auto">
                <LinkContainer>
                    <Nav.Link to="/user_area/profile">
                        Profile
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer>
                    <Nav.Link to="/user_area/articles">
                        Aricles
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer>
                    <Nav.Link to="/user_area/create">
                        Create post
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
        <div>
            {props.children}
        </div>
        </>
    )

};

export default UserArea;

