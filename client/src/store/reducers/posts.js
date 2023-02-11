export default function(state={}, action) {
    switch (action.type) {   
        case 'GET_POSTS':
        case 'GET_POST':
            return {...state, ...action.payload};

        default:
            return state;
    }
}