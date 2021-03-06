import React from "react";
import style from "./Editor.css";

export default function Editor(props) {
    return (
        <div className={`pane ${style.editorContainer}`}>
            <textarea
                id={props.id}
                className={`${style.editor} ${props.className}`}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}