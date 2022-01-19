import { FETCH_ALL, CREATE, UPDATE, LIKE_POST, DELETE } from '../constants/actionTypes'
// dispatch() --> reducer = (state, action) => { return state }
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE: case LIKE_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}
