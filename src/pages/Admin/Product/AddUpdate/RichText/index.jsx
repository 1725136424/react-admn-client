import React, { PureComponent } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less'
import { uploadImg } from "../../../../../api";

class RichText extends PureComponent {

    state = {
        editorState: EditorState.createEmpty()
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });

    };

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
                xhr.open('POST', uploadImg);
                // xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
                const data = new FormData(); // eslint-disable-line no-undef
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            },
        );
    }

    // 传递数据给父元素
    submitHtmlToFather = () => {
        const { editorState } = this.state
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    // 设置html元素至rich中
    setHtmlToRich = (html) => {
        const contentBlock = htmlToDraft(html);
        console.log(contentBlock);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState })
        }
    }

    render() {

        const { editorState } = this.state

        return (
            <>
                <Editor
                    editorState={ editorState }
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={ this.onEditorStateChange }
                    toolbar={ {
                        image: {
                            uploadCallback: this.uploadImageCallBack,
                            alt: { present: true, mandatory: false },
                        },
                    } }
                />
            </>
        );
    }
}

export default RichText;
