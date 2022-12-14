import { getCookie } from "cookies-next";

let isUser = null;
let isProfile = null;

if(getCookie("auth_token") === undefined) {
    isUser = null;
}
else {
    isUser = getCookie("auth_token");
}

if(getCookie("jn_profile") === undefined) {
    isProfile = null;
}
else {
    isProfile = JSON.parse(getCookie("jn_profile"));
}

const initState = {
    user: isUser,
    profile: isProfile,
    theme: "light",
    isLoading: false
}

const userReducer = (state = initState, action)=> {
    if(action.type === "user-loading") {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === "toggle-theme") {
        const theme = state.theme === "light" ? "dark" : "light";
        return {
            ...state,
            theme: theme,
            isLoading: false
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

    else if(action.type === "add-folder") {
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

    else if(action.type === "delete-folder") {
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
        return {
            ...state,
            user: null,
            profile: null,
            isLoading: false
        }
    }

    else {
        // console.log(state);
        return state;
    }
}

export default userReducer;