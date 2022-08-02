import { getCookie } from "cookies-next";

let isUser;
let isProfile;

if(!getCookie("auth_token")) {
    isUser = null;
}
else {
    isUser = getCookie("user_token");
}

if(!getCookie("jn_profile")) {
    isProfile = null;
}
else {
    isProfile = JSON.parse(getCookie("jn_profile"));
}

const initState = {
    user: isUser,
    profile: isProfile,
    isLoading: false
}


const userReducer = (state = initState, action)=> {
    if(action.type === "user-loading") {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === "register") {
        const { user, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }

    else if(action.type === "login") {
        const { user, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }

    else if(action.type === "profile") {
        const { profile, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }

    else if(action.type === "edit-profile") {
        const { profile, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }

    else if(action.type === "add-note") {
        const { profile, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }

    else if(action.type === "delete-note") {
        const { profile, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }

    else if(action.type === "logout") {
        const { error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: null,
            profile: null,
            isLoading: false
        }
    }

    else {
        return state;
    }
}

export default userReducer;