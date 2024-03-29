export default function(state={}, action) {
    switch (action.type) {   
        case 'AUTH_USER':
        case 'USER_STATS':
        case 'POST_CREATE':
        case 'USER_POSTS':
        case 'UPDATE_POST':
            return {...state, ...action.payload};

        case 'LOGOUT_STATS':
            return { auth: action.payload};

        default:
            return state;
    }
}