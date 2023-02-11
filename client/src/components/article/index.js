import React, { useEffect } from "react";
import { usesDispatch, useSelector } from "react-redux";
import CardItem from "../utils/card";
import { CardGroup } from "react-bootstrap";
import { getPost } from "../../store/actions/index";

const Article = (props) => {
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.match.params.id){
            dispatch(getPost(props.match.params.id)).then(
                ({payload}) =>{
                    if(!payload.singlePost.post){
                        props.history.push('/');
                    }
                }
            );
        }

    },[dispatch]);

    const myPost = posts.singlePost && posts.singlePost.post ? posts.singlePost.post : null;


    return(
        <>
        {
            myPost ?
            <>
                <h1>{myPost.title}</h1>
                <small> Created by {myPost.author.name}</small>
                
                <div>
                    {myPost.content}
                </div>
                :null

            </>
        }
        </>
    )
}

export default Article;