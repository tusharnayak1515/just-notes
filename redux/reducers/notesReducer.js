let isNotes;

if(typeof window !== "undefined") {
    if(!localStorage.getItem("jn_notes")) {
        isNotes = null;
    }
    else {
        isNotes = JSON.parse(localStorage.getItem("jn_notes"));
    }
}

const initState = {
    notes: isNotes,
    note: null,
    isLoading: false
}


const notesReducer = (state = initState, action)=> {
    if(action.type === "notes-loading") {
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === "get-notes") {
        const { notes, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            notes: notes,
            isLoading: false
        }
    }

    else if(action.type === "get-note") {
        const { note, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            note: note,
            isLoading: false
        }
    }

    else if(action.type === "add-note") {
        const { notes, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            notes: notes,
            isLoading: false
        }
    }

    else if(action.type === "edit-note") {
        const { notes, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            notes: notes,
            isLoading: false
        }
    }

    else if(action.type === "delete-note") {
        const { notes, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            notes: notes,
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
            notes: null,
            note: null,
            isLoading: false
        }
    }

    else {
        return state;
    }
}

export default notesReducer;