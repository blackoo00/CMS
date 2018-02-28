import React from 'react';
import { Form,Upload, Icon, message } from 'antd';
import config from '../../../config';

const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Avatar extends React.Component {
    state = {
        loading: false,
    };
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        // console.log(info);
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    componentWillMount(){
        const imageUrl = this.props.imageUrl;
        if(imageUrl){
            this.setState({
                imageUrl
            })
        }
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file.response;
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        // http://zerg-1251466962.cossh.myqcloud.com/20180118/151628634877.jpeg
        const imageUrl = this.state.imageUrl;
        const {formItemLayout,getFieldDecorator} = this.props;
        return (
            <FormItem
                {...formItemLayout}
                label="Logo"
                extra="the picture should be square"
            >
                {getFieldDecorator('main_img_url', {
                    // valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    initialValue:this.state.imageUrl
                })(
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={config.UPLOAD_IMG_URL}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} style={{width:'100px'}} alt="" /> : uploadButton}
            </Upload>
                )}
            </FormItem>
        );
    }
}

export default Avatar
