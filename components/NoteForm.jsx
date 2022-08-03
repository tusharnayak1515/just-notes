import React, { useState } from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import { actionCreators } from "../redux";

import styles from "../styles/noteForm.module.css";

const NoteForm = ({ note }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {theme} = useSelector(state=> state.default.userReducer,shallowEqual);
  const [noteDetails, setNoteDetails] = useState({
    id: note ? note._id : null,
    title: note ? note.title : "",
    description: note ? note.description : "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNoteDetails({ ...noteDetails, [name]: value });
  };

  const onCancelClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const onEdit = (e) => {
    e.preventDefault();
    if (
      noteDetails.title.replace(/\s/g, "").trim().length >= 3 &&
      noteDetails.title.replace(/\s/g, "").trim().length <= 20 &&
      noteDetails.description.replace(/\s/g, "").trim().length >= 3
    ) {
      dispatch(actionCreators.editNote(noteDetails));
      router.push("/");
    } else {
      if (
        noteDetails.title.replace(/\s/g, "").trim().length < 3 ||
        noteDetails.title.replace(/\s/g, "").trim().length > 20
      ) {
        toast.warn("Title must be minimum 3 and maximum 25 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn("Description must be minimum 3 characters long!", {
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
  };

  const onAdd = (e) => {
    e.preventDefault();
    if (
      noteDetails.title.replace(/\s/g, "").trim().length >= 3 &&
      noteDetails.title.replace(/\s/g, "").trim().length <= 20 &&
      noteDetails.description.replace(/\s/g, "").trim().length >= 3
    ) {
      dispatch(actionCreators.addNote(noteDetails));
      router.push("/");
    } else {
      if (
        noteDetails.title.replace(/\s/g, "").trim().length < 3 ||
        noteDetails.title.replace(/\s/g, "").trim().length > 20
      ) {
        toast.warn("Title must be minimum 3 and maximum 25 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn("Description must be minimum 3 characters long!", {
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
  };

  const onDelete = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.deleteNote(note._id));
    router.replace("/");
  }

  return (
    <div className={`${styles.noteForm} ${theme === "light" ? styles.light_form : styles.dark_form}`}>
      <div className={styles.btnDiv}>
        <h1 onClick={onCancelClick}>
          <BiArrowBack className={styles.back_btn} />
        </h1>
        <div className={styles.btn_container}>
            {note && <button className={styles.deleteBtn} onClick={onDelete}>
                Delete
            </button>}
            <button className={styles.saveBtn} onClick={note ? onEdit : onAdd}>
                Save
            </button>
        </div>
      </div>

      <div className={styles.titleDiv}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter title"
          value={noteDetails.title}
          onChange={onChangeHandler}
        />
      </div>

      <div className={styles.descriptionDiv}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="Enter description"
          value={noteDetails.description}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default NoteForm;
