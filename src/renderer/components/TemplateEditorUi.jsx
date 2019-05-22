import React from "react";
import Editor from "./Editor";
import style from "./TemplateEditorUi.css";

export default class TemplateEditorUi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeText(e) {
        this.setState({ text: e.target.value });
    }
    render() {
        return (
            <div className={style.templateEditor}>
                <Editor
                    className={style.editorArea}
                    value={this.state.text}
                    onChange={this.onChangeText}
                />
            </div>
        )
    }
} 