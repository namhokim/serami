import React from "react";
import style from "./Editor.css";

export default function Editor(props) {
    return (
        <div className={style.editorContainer}>
            <h3 className={style.editorTitle}>{props.title}</h3>
            <div className={style.editorLine}></div>
            <textarea
                id={props.id}
                className={`${style.editor} ${props.className}`}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}