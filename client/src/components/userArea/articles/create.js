import React, { useState, useEffect } from "react";
import UserArea from "../../hoc/userArea";
import { useFormik }  from "formik";
import * as Yup from "yup";
import { Alert, Form, Button } from "react-bootstrap";
import ToastHandler from "react-bootstrap";
import { useDispatch } from "react-redux";
import getCategories from "../../../api";
import { createPost, clearCreatedPost } from "../../../store/actions/index";


const CreateArticle = () => {

    const [categories, setCategories] = useState(null);
    const dispatch = useDispatch()

    useEffect(()=>{
        const categoryItem = async () => {
            const response = await getCategories();
            setCategories = response.data.categories;

        };
        categoryItem();

    }, [setCategories]);


    useEffect(()=>{  dispatch(clearCreatedPost()) }, [dispatch]);



    const formik = useFormik({
        initialValues:{
            title: '',
            excerpt: '',
            content: '',
            status: '',
            category: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('This field is required'),
            excerpt: Yup.string(),
            content: Yup.string(),
            status: Yup.string().matches('/(DRAFT|PUBLIC)/', {message: 'Use Draft or Public statuses only', excludeEmptyString: true}),
            category: Yup.string(),
        }),
        onSubmit: (values, {resetForm}) => { 
            dispatch(createPost(values)).then(({payload}) => {
                    if (payload.createPost.post){
                        ToastHandler("Post added!", "SUCCESS");
                        resetForm();
                    }

                    if (payload.createPost.error){
                        ToastHandler(payload.createPost.error, "ERROR");
                        resetForm();
                    }
            });
        }
    });

    return (
        <UserArea>
             <Form onSubmit={formik.handleSubmit} className="mt-3">
             <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    { formik.touched.title && formik.errors.title ? (
                        <Alert variant="danger">
                            {formik.errors.title}
                        </Alert>
                    ) :null}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Excerpt</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Enter excerpt"
                        id="excerpt"
                        name="excerpt"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.excerpt}
                    />
                    { formik.touched.excerpt && formik.errors.excerpt ? (
                        <Alert variant="danger">
                            {formik.errors.excerpt}
                        </Alert>
                    ) :null}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Enter content"
                        id="content"
                        name="content"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                    />
                    { formik.touched.content && formik.errors.content ? (
                        <Alert variant="danger">
                            {formik.errors.content}
                        </Alert>
                    ) :null}
                </Form.Group>
                <hr/>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                        <option></option>
                        {
                            categories ? 
                            categories.map((item, index) => (
                                <option key={index} value="item._id">{item.name}</option>
                            ))
                            : null
                        }
                    </Form.Control>    
                    { formik.touched.category && formik.errors.category ? (
                        <Alert variant="danger">
                            {formik.errors.category}
                        </Alert>
                    ) :null}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                    >
                        <option></option>
                        <option values="DRAFT">DRAFT</option>
                        <option values="PUBLIC">PUBLIC</option>
                    </Form.Control>    
                    { formik.touched.status && formik.errors.status ? (
                        <Alert variant="danger">
                            {formik.errors.status}
                        </Alert>
                    ) :null}
                </Form.Group>


                <Button variant="primary" type="submit">
                     Add new post
                </Button>

             </Form>
        </UserArea>
    )
}

export default CreateArticle;