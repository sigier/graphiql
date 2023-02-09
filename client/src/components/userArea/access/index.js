import React, { useState, useEffect } from "react";
import { Form, Alert, Col, Row, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupUser, loginUser } from "../../../store/actions";
import axios from "axios";
import ToastHandler from "../../utils/toasts";


const UserAccess = (props) => {

    const [type, setType] = useState(true);

    const dispatch = useDispatch();

    const switchTypeHandler = () => {
        setType(!type);
    };

    const onSubmitHandler = (values) => {
        if (type) {
            dispatch(loginUser(values)).then(({payload}) =>{
                successHandler(payload);
            });
            
        } else {
            dispatch(signupUser(values)).then(({payload}) =>{
                successHandler(payload);
            });
        }
    }

    const successHandler = (payload) => {
        const errors = payload.errors;
        const auth = payload.auth;

        if (errors) {
            ToastHandler(errors, 'ERROR')
        }

        if (auth){
            localStorage.setItem('X-AUTH', auth.token);
            axios.defaults.headers.common['Authorizarion'] = 'Bearer' + auth.token;
            ToastHandler("Welcome!", 'SUCCESS')
            props.history.push('/user_area');
        }
    } 

    const formik = useFormik({
        initialValues: {

            email:'',
            password:''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(5, 'Must be more than 5 characters').required('Password is required')
        }),
        onSubmit: values => {
            onSubmitHandler(values);
        }
    });

    useEffect(() => {

        return function cleanup()
    },[]);

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-4">
                    <Col>
                        <h1>
                            Sign in / Register
                        </h1>
                    </Col>
                </Row>
            
            <Form.Group>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                { formik.touched.email && formik.errors.email ? (<Alert variant="danger">
                    {formik.errors.email}
                </Alert>) : null}
            </Form.Group>
            <Form.Group>
                <Form.Label>
                       Password
                </Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                     { formik.touched.password && formik.errors.password ? (<Alert variant="danger">
                    {formik.errors.password}
                </Alert>) : null}
            </Form.Group>
            {
                type ?
                    <Button variant="primary" type="submit">
                    Sign in
                    </Button>
                :
                    <Button variant="primary" type="submit">
                    Register
                    </Button>
            }
            <Button variant="secondary" className="ml-2" onClick={switchTypeHandler}>
                Already { type ? 'signed in' : 'Registered' } ? Click here
            </Button>

            </Form>

        </>
    )
}

export default UserAccess;