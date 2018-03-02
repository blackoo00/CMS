import React from 'react'
import Name from './name'
import Category from './category'
import Price from './price'
import Stock from './stock'
import Logo from './logo'
import Editor from './editor'
import Properties from './properties'
import Discounts from './discounts'
import IsOnSale from './is_on_sale'
import { Button, Form } from 'antd'
import '../styles/index.css'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
}

const style = {
    marginBottom: 0
}

const App = ({ ...rest }) => (
    <Form onSubmit={(e) => {
        e.preventDefault();
        console.log(1);
        rest.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }else{
                rest.createOrUpdate(fieldsValue);
            }
        })
    }}>
        <Name
            getFieldDecorator={rest.getFieldDecorator}
            formItemLayout={formItemLayout}
            style={style}
        />
        <Price
            getFieldDecorator={rest.getFieldDecorator}
            formItemLayout={formItemLayout}
            style={style}
        />
        <Logo
            getFieldDecorator={rest.getFieldDecorator}
            formItemLayout={formItemLayout}
            normFile={rest.normFile}
            handleChange={rest.handleChange}
            style={style}
            imageUrl={rest.info.main_img_url}
            loading={rest.info.file_loading}
        />
        <Editor
            details={rest.info.details}
            editorState={rest.editorState}
            normFile={rest._editorNormFile}
            onEditorChange={rest.onEditorChange}
            onEditorStateChange={rest.onEditorStateChange}
            getFieldDecorator = {rest.getFieldDecorator}
            formItemLayout = {formItemLayout}
        />
        <FormItem
            wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
            }}
        >
            <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
    </Form>
)

export default App
