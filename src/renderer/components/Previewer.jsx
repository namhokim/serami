import React from "react";
import style from "./Previewer.css";

export default function Previewer(props) {
    return (
        <div
            id="previewer"
            className={`${props.className} ${style.previewer}`}
        >
            <h3 className={style.previewerTitle}>{props.title}</h3>
            <div className={style.previewerLine}></div>
            <span
                dangerouslySetInnerHTML={{ __html: props.value }}
            />
        </div>
    )
}