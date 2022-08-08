import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../redux';
import { toast } from 'react-toastify';

import styles from '../styles/folderModal.module.css';

const FolderModal = ({myfolder, setShow}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [folder, setFolder] = useState({id: myfolder ? myfolder._id : '', name: myfolder ? myfolder.name : ''});
    const topRef = useRef();

    const onValueChange = (e)=> {
        e.preventDefault();
        setFolder({...folder, [e.target.name]: e.target.value});
    }

    const onClose = (e)=> {
        e.preventDefault();
        setShow(false);
    }

    const onAdd = (e)=> {
        e.preventDefault();
        if(folder.name.replace(/\s/g, "").trim().length >= 3 && folder.name.replace(/\s/g, "").trim().length <= 15) {
            dispatch(actionCreators.addFolder(folder));
            setShow(false);
        }
        else {
            toast.warn('Name must be minimum 3 and maximum 20 characters long!', {
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

    const onEdit = (e)=> {
        e.preventDefault();
        if(folder.name.replace(/\s/g, "").trim().length >= 3 && folder.name.replace(/\s/g, "").trim().length <= 15) {
            dispatch(actionCreators.editFolder(folder));
            setShow(false);
        }
        else {
            toast.warn('Folder must be minimum 3 and maximum 20 characters long!', {
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

    const onFolderDelete = (e)=> {
        e.preventDefault();
        dispatch(actionCreators.deleteFolder(folder.id));
        setShow(false);
        router.replace("/");
    }

    useEffect(()=> {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return ReactDom.createPortal(
        <div className={styles.overlay} ref={topRef}>
            <div className={styles.modal}>
                <h1 className={styles.folder_head}>{myfolder ? "Edit Folder" : "Add Folder"}</h1>
                <input type="text" name="name" value={folder.name} onChange={onValueChange} placeholder="Folder Name" />
                <button onClick={myfolder ? onEdit : onAdd} className={styles.add_btn}>{myfolder ? 'Edit' : 'Submit'}</button>
                {myfolder && <button onClick={onFolderDelete} className={styles.delete_btn}>Delete</button>}
                <button onClick={onClose} className={styles.close_btn}>Close</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default FolderModal;