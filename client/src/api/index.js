import axios from "axios";

axios.defaults.baseURL = "/graphql";
axios.defaults.method = "POST";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.common['Authorizarion'] = 'Bearer' + localStorage.getItem("X-AUTH");


export const signupUser = async (userData) => {

    try {

        const {data} = await axios({data: {
                query:  `mutation{
                    signUp(
                        fields: {
                            email: "${userData.email}"
                            password: "${userData.password}"
                        }
                    ) {
                        _id
                        email
                        token
                    } 
                }`
        }});
         
        return {
            auth: data.data ? data.data.signUp : null,
            errors: data.errors
        };
        
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData) => {

    try {

        const {data} = await axios({data: {
                query:  `mutation{
                    authUser(
                        fields: {
                            email: "${userData.email}"
                            password: "${userData.password}"
                        }
                    ) {
                        _id
                        email
                        token
                    } 
                }`
        }});
         
        return {
            auth: data.data ? data.data.authUser : null,
            errors: data.errors
        };
        
    } catch (error) {
        throw error;
    }
};

export const autoSignin = async () => {

    try {

        const {data} = await axios({data: {
                query:  `mutation{
                    isAuth(
                    ) {
                        _id
                        email
                        token
                    } 
                }`
        }});

        if (data.errors) {
            localStorage.removeItem('X-AUTH');
        }
         
        return {
            auth: data.data ? data.data.isAuth : null,
            errors: data.errors
        };
        
    } catch (error) {
        throw error;
    }
};


export const getUserStats = async (id) => {

    try {

        const body = {
            query:`
                query User($id:ID!, $sort:SortInput){
                    user(Id:$id){
                        name
                        lastname
                        posts(sort:$sort) {_id, title}
                        categories {name}
                    }
                }
            `,
            variables: {
                id: id,
                sort: {
                    sortBy: "_id",
                    order: "desc",
                    limit: 3

                }
            }

        };
        const {data} = await axios({data: JSON.stringify(body);
                
        });

        
         
        return {
            stats: data.data ? data.data.user : null
        };
        
    } catch (error) {
        throw error;
    }
};

export const getCategories = async () => {

    try {
        const body = {
            query: `
                query {
                    categories {
                        _id
                        name
                    }
                }
            `
        };

        const {data} = await axios ({
            data: JSON.stringify(body)
        });

        return data;
        

    } catch (error) {
        throw error;
    }
}; 


export const createPost = async (args) => {

    try {
        const body = {
            query: `
                mutation CreatePost($fields: PostInput!) {
                    createPost(fields:$fields){
                        _id
                        title
                    }
                }
            `,
            variables: {
                fields: args
            }
        };

        const {data} = await axios({data: JSON.stringify(body)});
     

        return {createPost:{
            post: data.data ? data.data.createPost : null,
            error: data.errors
        }};
        

    } catch (error) {
        throw error;
    }
}; 


export const getUserPosts = async (sort, prevState, id) => {

    try {
        const body = {
            query: `
                query GetUserPosts($sort: SortInput, $queryBy: QueryByInput) {
                    posts(sort: $sort, queryBy:queryBy){
                        id
                        status
                        title
                        category { name }
                    }
                }
            `,

            variables: {
                queryBy:{key: "author", value: id},
                sort:sort
            }

        };

        const {data} = await axios({data: JSON.stringify(body)});
     
        let newState;
        let newPosts = data.data ? data.data.posts : null;

        if (newPosts){
            newState = [...prevState, ...newPosts];
        }

        return {
            posts: data.data ? newState : null

        };

    } catch (error) {
        throw error;
    }
}; 


export const updatePostStatus = async (status, postId, state) => {

    try {
        const body = {
            query: `
                mutation UpdatePost($fields: PostInput!, $postId: ID!) {
                        updatePost(fields: $fields, postId: $postId){
                            id
                            status
                            title
                            category { name }
                        }
                }
            
            `,
            variables: {postId:postId, fields: {status: status}}
        };
            

        const {data} = await axios({data: JSON.stringify(body)});

        let newState = null;
        let updatePost = data.data ? data.data.updatePost : null;

        if(updatePost){
            newState = prevState.map((old) =>{
                return [updatePost].find(newObject => newObject._id === old._id) || old;
            });
        }

        return {
            posts: newState ? newState : prevState
        };

    } catch (error) {
        throw error;
    }
}; 



export const removePost = async (id, prevState) => {

    try {
        const body = {
            query: `
                mutation {
                    deletePost(postId: "${id}"){
                        _id
                        
                    }
                }
            
            `
        };
            
        const {data} = await axios({data: JSON.stringify(body)});

        let newState = null;
        let deletePost = data.data ? data.data.deletePost : null;

        if(deletePost){
            newState = prevState.filter (obj =>{
                return obj._id !== deletePost._id
            });
        }

        return {
            posts: newState ? newState : prevState
        };
      

    } catch (error) {
        throw error;
    }
};

