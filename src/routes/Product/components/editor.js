import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Form } from 'antd'
const FormItem = Form.Item;
import draftToHtml from 'draftjs-to-html'

require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css')

const TextEditor = ({getFieldDecorator,normFile,onEditorChange,editorState,formItemLayout,details,onEditorStateChange,imageUploadCallBack}) => (
    <FormItem
        {...formItemLayout}
        label="Editor"
    >
        {getFieldDecorator('details', {
            // valuePropName: 'fileList',
            getValueFromEvent: normFile,
            initialValue:details
        })(
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
        )}
    </FormItem>
)

export default TextEditor
