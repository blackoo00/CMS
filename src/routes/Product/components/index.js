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

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const style = {
    marginBottom:0
}

class App extends React.Component{
    handleSubmit = (e) => {
        const {createOrUpdate} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }else{
                createOrUpdate(fieldsValue);
            }
        })
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    componentDidMount(){
        const {info} = this.props;
        this.props.form.setFieldsValue({
            name: info.name,
            price:info.price,
            stock:info.stock,
            is_on_sale:info.is_on_sale
        });
    }
    render(){
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const { info } = this.props;
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Name
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        style={style}
                    />
                    <Category
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        style={style}
                        cats={info.categories}
                    />
                    <Price
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        style={style}
                    />
                    <Stock
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        style={style}
                    />
                    <IsOnSale
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        style={style}
                    />
                    <Logo
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        normFile={this.normFile}
                        style={style}
                        imageUrl={info.main_img_url}
                    />
                    <Properties
                        getFieldDecorator={getFieldDecorator}
                        getFieldValue={getFieldValue}
                        form={this.props.form}
                        list={this.props.info.properties}
                    />
                    <Discounts
                        getFieldDecorator={getFieldDecorator}
                        getFieldValue={getFieldValue}
                        form={this.props.form}
                        list={this.props.info.discount}
                    />
                    <Editor
                        details={info.details}
                        getFieldDecorator = {getFieldDecorator}
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
            </div>
        )
    }
}
export default Form.create()(App)
