import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toggleTheme = ()=> async (dispatch)=> {
    dispatch({
        type: "toggle-theme"
    });
}

// ****************************** Users Section ******************************* \\

export const register = ({name, email, password})=> async(dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.post(`${link}/api/auth/register`, {name, email, password});

        if(res.data.success) {
            dispatch({
                type: "register",
                payload: {
                    user: getCookie("auth_token")
                }
            });
            toast.success("Registration Successful!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "register",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "register",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const login = ({email, password})=> async(dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.post(`${link}/api/auth/login`, {email, password});

        if(res.data.success) {
            dispatch({
                type: "login",
                payload: {
                    user: getCookie("auth_token")
                }
            });
            toast.success("Login Successful!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "login",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "login",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const profile = (token)=> async(dispatch)=> {
    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.get(`${link}/api/auth/profile/`, {headers: {"auth_token": token}});
        // const myprofile = getCookie("jn_profile") !== undefined ? getCookie("jn_profile") : res.data.user;
        if(res.data.success) {
            dispatch({
                type: "profile",
                payload: {
                    profile: JSON.parse(getCookie("jn_profile"))
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const editProfile = ({name, email})=> async(dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.put(`${link}/api/auth/editprofile`, {name, email});

        if(res.data.success) {
            dispatch({
                type: "edit-profile",
                payload: {
                    profile: getCookie("jn_profile")
                }
            });
            toast.success("Profile updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "edit-profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const logout = ()=> async(dispatch)=> {
    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.get(`${link}/api/auth/logout`);

        if(res.data.success) {
            deleteCookie("auth_token");
            deleteCookie("jn_profile");
            if(typeof window !== "undefined") {
                localStorage.removeItem("jn_notes");
            }
            dispatch({
                type: "logout"
            });
            toast.success("Logged out successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "logout",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "logout",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

// ****************************** Folders Section ******************************* \\

export const getFolder = (id,token)=> async(dispatch)=> {
    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.get(`${link}/api/folders/getfolder?folder=${id}`, {headers: {"auth_token": token}});

        if(res.data.success) {
            dispatch({
                type: "get-folder",
                payload: {
                    folder: res.data.folder
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-folder",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "get-folder",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const resetFolder = ()=> async (dispatch)=> {
    dispatch({
        type: "reset-folder"
    });
}

export const addFolder = ({name})=> async(dispatch)=> {
    dispatch({
        type: "folders-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.post(`${link}/api/folders/addfolder`, {name});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_folders", JSON.stringify(res.data.folders));
            }
            dispatch({
                type: "add-folder",
                payload: {
                    folders: res.data.folders
                }
            });
            toast.success("Folder added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "add-folder",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "add-folder",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const editFolder = ({id,name})=> async(dispatch)=> {
    dispatch({
        type: "folders-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.put(`${link}/api/folders/editfolder?folder=${id}`, {name});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_folders", JSON.stringify(res.data.folders));
            }
            dispatch({
                type: "edit-folder",
                payload: {
                    folders: res.data.folders,
                    folder: res.data.folder
                }
            });
            toast.success("Folder updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-folder",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "edit-folder",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const deleteFolder = (id)=> async(dispatch)=> {
    dispatch({
        type: "folders-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${link}/api/folders/deletefolder?folder=${id}`);

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_folders", JSON.stringify(res.data.folders));
            }
            dispatch({
                type: "delete-folder",
                payload: {
                    folders: res.data.folders
                }
            });
            toast.success("Folder deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-folder",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "delete-folder",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const getFolders = (token)=> async(dispatch)=> {
    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.get(`${link}/api/folders/`, {headers: {"auth_token": token}});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_folders", JSON.stringify(res.data.folders));
            }
            dispatch({
                type: "get-folders",
                payload: {
                    folders: res.data.folders
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-folders",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "get-folders",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

// ****************************** Notes Section ******************************* \\

export const getNote = (id,token)=> async(dispatch)=> {
    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.get(`${link}/api/notes/getnote?note=${id}`, {headers: {"auth_token": token}});

        if(res.data.success) {
            dispatch({
                type: "get-note",
                payload: {
                    note: res.data.note
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-note",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "get-note",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const resetNote = ()=> async (dispatch)=> {
    dispatch({
        type: "reset-note"
    });
}

export const addNote = ({title, description})=> async(dispatch)=> {
    dispatch({
        type: "notes-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.post(`${link}/api/notes/addnote`, {title, description});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_notes", JSON.stringify(res.data.notes));
            }
            dispatch({
                type: "add-note",
                payload: {
                    notes: res.data.notes
                }
            });
            toast.success("Note added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "add-note",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "add-note",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const editNote = ({id, title, description})=> async(dispatch)=> {
    dispatch({
        type: "notes-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.put(`${link}/api/notes/editnote?note=${id}`, {title, description});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_notes", JSON.stringify(res.data.notes));
            }
            dispatch({
                type: "edit-note",
                payload: {
                    notes: res.data.notes,
                    note: res.data.note
                }
            });
            toast.success("Note updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-note",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "edit-note",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const deleteNote = (id)=> async(dispatch)=> {
    dispatch({
        type: "notes-loading"
    });

    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${link}/api/notes/deletenote?note=${id}`);

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_notes", JSON.stringify(res.data.notes));
            }
            dispatch({
                type: "delete-note",
                payload: {
                    notes: res.data.notes
                }
            });
            toast.success("Note deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-note",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "delete-note",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}

export const getNotes = (token)=> async(dispatch)=> {
    const link = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";
    try {
        const res = await axios.get(`${link}/api/notes/`, {headers: {"auth_token": token}});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jn_notes", JSON.stringify(res.data.notes));
            }
            dispatch({
                type: "get-notes",
                payload: {
                    notes: res.data.notes
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-notes",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    } catch (error) {
        dispatch({
            type: "get-notes",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
}