import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as actions from './actions'
import Components from './components/'
import controller from './controller';
import {Form} from 'antd';
import common from '../common';
import htmlToDraft from 'html-to-draftjs'
import {EditorState,ContentState} from 'draft-js'
import config from '../../config'
import draftToHtml from 'draftjs-to-html'

const {createFormField} = Form;

class App extends Component {
    constructor() {
        super()
    }
    componentWillMount(){
        let id = this.props.location.query.id
        this.id = id;
        let {init,addInit,getCats} = this.props
        if(typeof id != 'undefined' && id != 0){
            // init(id)
        }else{
            // addInit()
        }
        // getCats();
    }
    /*
    * 卸载
    * 使用antd进行了数据绑定，当切换产品时，优先传入的是先前state的产品数据,又因为是在componentDidMount
    * 中绑定数据，所以只能进行卸载，然后再进行数据绑定
    * */
    componentWillUnmount(){
        const {unmount,addInit} = this.props;
        unmount();
    }
    normFile(e){
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file.response;
    }
    _handleLogoChange = (info) => {
        if (info.file.status === 'uploading') {
            this.props.fileChange({
                file_loading:true
            });
            return;
        }
        if (info.file.status === 'done') {
            this.props.fileChange({
                file_loading:false
            });
            // common.getBase64(info.file.originFileObj, imageUrl => {
            //     // console.log(imageUrl)
            // });
        }
    }
    onEditorStateChange(editorState){
        this.props.fileChange({
            editorState
        });
    }
    onEditorChange(editorContent){
        this.props.fileChange({
            editorContent
        });
    }
    _editorNormFile(e){
        console.log('Upload event:', draftToHtml(e));
        if (Array.isArray(e)) {
            return e;
        }
        return e && draftToHtml(e);
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
    render(){
        const {...rest} = this.props;
        const html = rest.info.details;
        let editorState = rest.info.editorState;
        if (typeof html != 'undefined') {
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }
        return(
            <div>
                <Components
                    info = {rest.info}
                    editorState = {editorState}
                    onEditorStateChange = {this.onEditorStateChange.bind(this)}
                    onEditorChange = {this.onEditorChange.bind(this)}
                    _editorNormFile = {this._editorNormFile}
                    createOrUpdate = {(data) => rest.createOrUpdate(data,rest.info)}
                    getFieldDecorator = {rest.form.getFieldDecorator}
                    validateFields = {rest.form.validateFields}
                    normFile = {this.normFile}
                    handleChange = {this._handleLogoChange.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    info: state.product
})

const mapDispatchToProp = dispatch => ({
    init: (id) => {
        dispatch(controller.init(id))
    },
    fileChange:(values) => {
        dispatch(actions.fileChange(values))
    },
    unmount:() => {
        dispatch(actions.unmount())
    },
    createOrUpdate:(data,info) => {
        controller.createOrUpdate(data,info)
    },
    addInit: (id) => {
        dispatch(actions.addInit(id))
    },
    getCats:() => {
        dispatch(actions.getCats())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProp
)((Form.create({
    mapPropsToFields(props) {
        return {
            name: createFormField({value: props.info.name }),
            price: createFormField({value: props.info.price }),
            main_img_url: createFormField({value: props.info.main_img_url }),
            details: createFormField({value: props.info.details }),
        };
    },
    onFieldsChange(props, fields) {
        // console.log('onFieldsChange', fields);
        // props.fileChange(fields);
    },
    onValuesChange(props, values) {
        props.fileChange(values);
        // console.log(values);
    },
})(App)))
