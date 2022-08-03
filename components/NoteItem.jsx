import React from "react";
import { useRouter } from "next/router";

import styles from "../styles/noteItem.module.css";

const NoteItem = ({ note }) => {
  const router = useRouter();

  const onClickHandler = (e) => {
    e.preventDefault();
    router.push(`/notes/${note._id}`);
  };

  return (
    <div className={styles.noteItem} onClick={onClickHandler}>
      <h2 className={styles.title}>{note.title}</h2>
      <h4 className={styles.description}>
        {note.description.replace(/\s/g, "").trim().substring(0, 350)}
      </h4>
    </div>
  );
};

export default NoteItem;
