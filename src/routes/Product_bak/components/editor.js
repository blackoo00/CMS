import React, {Component} from 'react'
import {EditorState,ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import {Editor} from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs'
import config from '../../../config';
import { Form } from 'antd';
const FormItem = Form.Item;

require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css')

const rawContentState = {
    'entityMap': {
        '0': {
            'type': 'IMAGE',
            'mutability': 'MUTABLE',
            'data': {
                'src': 'http://i.imgur.com/aMtBIep.png',
                'height': 'auto',
                'width': '100%'
            }
        }
    },
    'blocks': [{
        'key': '9unl6',
        'text': '',
        'type': 'unstyled',
        'depth': 0,
        'inlineStyleRanges': [],
        'entityRanges': [],
        'data': {}
    },{
        'key': '8g6vn',
        'text': 'Initialized from content state.',
        'type': 'unstyled',
        'depth': 0,
        'inlineStyleRanges': [],
        'entityRanges': [],
        'data': {}
    }, {
        'key': '95kn',
        'text': ' ',
        'type': 'atomic',
        'depth': 0,
        'inlineStyleRanges': [],
        'entityRanges': [{
            'offset': 0,
            'length': 1,
            'key': 0
        }],
        'data': {}
    }, {
        'key': '7rjes',
        'text': '',
        'type': 'unstyled',
        'depth': 0,
        'inlineStyleRanges': [],
        'entityRanges': [],
        'data': {}
    }]
}

class App extends Component {
    state = {
        editorContent: undefined,
        contentState: rawContentState,
        editorState: ''
    }

    constructor(props) {
        super(props);
        const html = props.details;
        if (typeof html != 'undefined') {
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    onEditorChange = (editorContent) => {
        const {details} = this.props
        this.setState({
            editorContent
        })
    }

    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
            xhr.open('POST', config.PROD_DETAIL_IMG_URL)
            // xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            xhr.setRequestHeader('token', localStorage.getItem('token'))
            const data = new FormData() // eslint-disable-line no-undef
            data.append('image', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText)
                console.log(response)
                resolve(response)
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        }
    )
    normFile = (e) => {
        console.log('Upload event:', draftToHtml(e));
        if (Array.isArray(e)) {
            return e;
        }
        return e && draftToHtml(e);
    }
    render() {
        const {editorState} = this.state
        const {getFieldDecorator,formItemLayout} = this.props;
        return (
            <FormItem
                {...formItemLayout}
                label="Editor"
            >
                {getFieldDecorator('details', {
                    // valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    initialValue:this.props.details
                })(
            <Editor
                editorState={editorState}
                toolbarClassName="home-toolbar"
                wrapperClassName="home-wrapper"
                editorClassName="home-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    history: {inDropdown: true},
                    inline: {inDropdown: false},
                    list: {inDropdown: true},
                    textAlign: {inDropdown: true},
                    image: {uploadCallback: this.imageUploadCallBack}
                }}
                onContentStateChange={this.onEditorChange}
                // placeholder="请输入正文~~尝试@哦，有惊喜"
                spellCheck
                onFocus={() => {
                    console.log('focus')
                }}
                onBlur={() => {
                    console.log('blur')
                }}
                onTab={() => {
                    console.log('tab')
                    return true
                }}
                localization={{
                    locale: 'zh',
                    translations: {'generic.add': 'Add'}
                }}
                mention={{
                    separator: ' ',
                    trigger: '@',
                    caseSensitive: true,
                    suggestions: [
                        {
                            text: 'A',
                            value: 'AB',
                            url: 'href-a'
                        },
                        {
                            text: 'AB',
                            value: 'ABC',
                            url: 'href-ab'
                        },
                        {
                            text: 'ABC',
                            value: 'ABCD',
                            url: 'href-abc'
                        },
                        {
                            text: 'ABCD',
                            value: 'ABCDDDD',
                            url: 'href-abcd'
                        },
                        {
                            text: 'ABCDE',
                            value: 'ABCDE',
                            url: 'href-abcde'
                        },
                        {
                            text: 'ABCDEF',
                            value: 'ABCDEF',
                            url: 'href-abcdef'
                        },
                        {
                            text: 'ABCDEFG',
                            value: 'ABCDEFG',
                            url: 'href-abcdefg'
                        }
                    ]
                }}
            />
                )}
            </FormItem>
        )
    }
}

export default App
