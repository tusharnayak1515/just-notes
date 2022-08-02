import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import userReducer from "./userReducer";
import { HYDRATE } from "next-redux-wrapper";

const reducers = combineReducers({
    userReducer: userReducer,
    notesReducer: notesReducer
});

const masterReducer = (state,action)=> {
    if(action.type === HYDRATE) {
        const nextState = {
            ...state,
            userReducer: {
                user: state.userReducer.user,
                profile: action.payload.userReducer.profile ? action.payload.userReducer.profile : state.userReducer.profile,
                isLoading: state.userReducer.isLoading
            },
            notesReducer: {
                notes: [...new Set(action.payload.notesReducer.notes, state.notesReducer.notes)],
                note: action.payload.notesReducer.note ? action.payload.notesReducer.note : state.notesReducer.note,
                isLoading: state.notesReducer.isLoading
            }
        }
        return nextState;
    }
    else {
        return reducers(state,action);
    }
}

export default masterReducer;