let isFolders = null;

if(typeof window !== "undefined") {
    if(localStorage.getItem("jn_folders") === null) {
        isFolders = null;
    }
    else {
        isFolders = JSON.parse(localStorage.getItem("jn_folders"));
    }
}

const initState = {
    folders: isFolders,
    folder: null,
    isLoading: false
}

const foldersReducer = (state = initState, action)=> {
    if(action.type === "folders-loading") {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === "get-folders") {
        const { folders, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            folders: folders,
            isLoading: false
        }
    }

    else if(action.type === "get-folder") {
        const { folder, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            folder: folder,
            isLoading: false
        }
    }

    else if(action.type === "reset-folder") {
        return {
            ...state,
            folder: null,
            isLoading: false
        }
    }

    else if(action.type === "add-folder") {
        const { folders, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            folders: folders,
            isLoading: false
        }
    }

    else if(action.type === "edit-folder") {
        const { folders, folder, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            folders: folders,
            folder: folder,
            isLoading: false
        }
    }

    else if(action.type === "delete-folder") {
        const { folders, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            folders: folders,
            isLoading: false
        }
    }

    else if(action.type === "logout") {
        return {
            ...state,
            folders: null,
            folder: null,
            isLoading: false
        }
    }

    else {
        return state;
    }
}

export default foldersReducer;