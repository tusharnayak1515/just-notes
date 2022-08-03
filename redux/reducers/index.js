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
        // console.log("state: ",state);
        // console.log("action.payload.default: ",action.payload.default);
        // console.log("state.notes: ",state.notesReducer);
        // console.log("action.payload.notes: ",action.payload.default.notesReducer);
        const nextState = {
            ...state,
            userReducer: {
                user: state.userReducer.user,
                profile: action.payload.default.userReducer.profile ? action.payload.default.userReducer.profile : state.userReducer.profile,
                theme: state.userReducer.theme,
                isLoading: state.userReducer.isLoading
            },
            notesReducer: {
                notes: [...new Set(action.payload.default.notesReducer.notes, state.notesReducer.notes)],
                note: action.payload.default.notesReducer.note ? action.payload.default.notesReducer.note : state.notesReducer.note,
                isLoading: state.notesReducer.isLoading
            }
        }
        // console.log("nextState: ",nextState);
        return nextState;
    }
    else {
        // console.log("state: ",reducers(state,action));
        return reducers(state,action);
    }
}

export default masterReducer;