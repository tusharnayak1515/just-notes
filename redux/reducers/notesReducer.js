let isNotes = null;

if(typeof window !== "undefined") {
    if(localStorage.getItem("jn_notes") === null) {
        isNotes = null;
    }
    else {
        isNotes = JSON.parse(localStorage.getItem("jn_notes"));
    }
}

const initState = {
    notes: isNotes,
    allNotes: null,
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

    else if(action.type === "get-user-notes") {
        const { notes, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            allNotes: notes,
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

    else if(action.type === "reset-note") {
        return {
            ...state,
            note: null,
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
        const { notes, note, error } = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            notes: notes,
            note: note,
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