import { ipcRenderer } from "electron";
import React from "react";
import Handlebars from "handlebars";
import SafeEval from "safe-eval";
import Editor from "./Editor";
import Previewer from "./Previewer";
import style from "./HandlebarsEditorUi.css";
import PanelGroup from "react-panelgroup"

export default class HandlebarsEditorUi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "", templateText: "", contextText: "" };
        this.onChangeTemplateText = this.onChangeTemplateText.bind(this);
        this.onChangeContextText = this.onChangeContextText.bind(this);
        this.evaluateHandlebars = this.evaluateHandlebars.bind(this);
    }

    onChangeTemplateText(e) {
        this.setState({ templateText: e.target.value });
        this.evaluateHandlebars(e.target.value, this.state.contextText);
    }

    onChangeContextText(e) {
        this.setState({ contextText: e.target.value });
        this.evaluateHandlebars(this.state.templateText, e.target.value);
    }

    evaluateHandlebars(templateText, contextText) {
        if (templateText.length === 0) {
            this.setState({ text: "<h3>template is empty.</h3>" });
            return;
        }

        if (contextText.length === 0) {
            this.setState({ text: "<h3>context is empty.</h3>" });
            return;
        }

        try {
            var evaluatedContext = SafeEval(contextText);
            let typeofContext = typeof evaluatedContext;
            if (!(typeofContext === 'function' || typeofContext === 'object')) {
                this.setState({ text: `<h3>context code should be object or function.</h3>${contextCode}` });
                return;
            }
            if (typeofContext === 'function') {
                var context = evaluatedContext();
            } else {
                var context = evaluatedContext;
            }

            var template = Handlebars.compile(templateText);
            var output = template(context);
            this.setState({ text: output });
        }
        catch (err) {
            let detailLocation = err.stack.substring(0, err.stack.indexOf(err.name));
            let errorMessage = `<h3>context code evalutaion error.</h3>${err}<br/><pre>${detailLocation}</pre>`;
            this.setState({ text: errorMessage });
        }
    }

    componentDidMount() {
        ipcRenderer.on("REQUEST_TEXT_TEMPLATE", () => {
            ipcRenderer.send("REPLY_TEXT_TEMPLATE", this.state.templateText);
        });
        ipcRenderer.on("REQUEST_TEXT_CONTEXT", () => {
            ipcRenderer.send("REPLY_TEXT_CONTEXT", this.state.contextText);
        });
        ipcRenderer.on("SEND_TEXT_TEMPLATE", (_e, text) => {
            this.setState({ templateText: text });
            this.evaluateHandlebars(text, this.state.contextText);
        })
        ipcRenderer.on("SEND_TEXT_CONTEXT", (_e, text) => {
            this.setState({ contextText: text });
            this.evaluateHandlebars(this.state.templateText, text);
        })
    }

    componentWillUnMount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        return (
            <div className={style.handlebarsEditor}>
                <PanelGroup
                    borderColor="grey"
                    panelWidths={[{size: 200},{size: 200},{ }]}
                >
                    <Editor
                        id="templateEditor"
                        title="Template"
                        className={style.editorArea}
                        value={this.state.templateText}
                        onChange={this.onChangeTemplateText}
                    />
                    <Editor
                        id="contextEditor"
                        title="Context"
                        className={style.editorArea}
                        value={this.state.contextText}
                        onChange={this.onChangeContextText}
                    />
                    <Previewer
                        className={style.previewerArea}
                        title="Template Rendering"
                        value={this.state.text}
                    />
                </PanelGroup>
            </div>
        )
    }
}
