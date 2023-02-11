import React from "react";
import React, { useReducer, useEffect } from "react";
import UserArea from "../../hoc/userArea";
import { Table, Button} from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import { getUserPosts,updatePostStatus, removePost } from "../../../store/actions";

const Articles = (props) => {


    const [sort, setSort] = useReducer(
        (state, newState) =>({...state, ...newState}),
        {limit:"3", order:"desc", sortBy:"_id", skip: 0});

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserPosts(sort,[], user.auth._id));
    });

    const updateStatusHandler = (item) => {
        const status = item.status === 'DRAFT' ? 'PUBLIC' : 'DRAFT';

        dispatch(updatePostStatus(status, item._id, user.posts));
    };
    

    return(
        <UserArea >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                                #
                        </th>
                        <th>
                                Title
                        </th>
                        <th>
                                Category
                        </th>
                        <th>
                                Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.posts ?
                        user.posts.map((item, index) => {
                            <tr key={index}>
                                <td>
                                    {index+1}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    {item.category.name}
                                </td>
                                <td className={item.status === 'DRAFT' ? 'yell' : 'green'} onClick={()=> updateStatusHandler(item)}>
                                    {item.status}
                                </td>
                                <td className="remove_btn" onClick={()=>{
                                    dispatch(removePost(item._id, user.posts));
                                }}>
                                    Remove
                                </td>
                            </tr>
                        })
                        : null
                    }
                </tbody>
            </Table>

            <Button onClick={()=>{
                let skip = sort.skip + sort.limit;
                dispatch(getUserPosts({...sort,skip:skip}, user.posts, user.auth._id))
                .then(()=>{
                    setSort({skip:skip});
                });
            }}>Load more</Button>

            <Button variant="outline-info" className="ml-2" onClick={()=>{
                        props.history.push('/user_area/create');
                    }}>Create new article</Button>
       </UserArea>
    )
}

export default Articles;