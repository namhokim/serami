import React from "react";
import style from "./Previewer.css";

export default function Previewer(props) {
    return (
        <div
            id="previewer"
            className={`${props.className} ${style.previewer}`}
        >
            <span
                dangerouslySetInnerHTML={{ __html: props.value }}
            />
        </div>
    )
}