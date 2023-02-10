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