import React from 'react';
import { Form,Upload, Icon, message } from 'antd';
import config from '../../../config';
import common from '../../common';

const FormItem = Form.Item;

const Avatar = ({formItemLayout,getFieldDecorator,normFile,imageUrl,loading,handleChange}) => (
    <FormItem
        {...formItemLayout}
        label="Logo"
        extra="the picture should be square"
    >
        {getFieldDecorator('main_img_url', {
            // valuePropName: 'fileList',
            getValueFromEvent: normFile,
            initialValue:imageUrl
        })(
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={config.UPLOAD_IMG_URL}
                beforeUpload={common.checkPicType}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} style={{width:'100px'}} alt="" /> : <div>
                    <Icon type={loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                </div>}
            </Upload>
        )}
    </FormItem>
)

export default Avatar
