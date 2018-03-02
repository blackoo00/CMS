import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item;

const App = ({formItemLayout,getFieldDecorator,style}) => (
    <div>
        <FormItem
            {...formItemLayout}
            label="Price"
            hasFeedback
            style={style}
        >
            {getFieldDecorator('price', {
                rules: [{
                    required: true, message: 'Please input the product name!',
                }],
            })(
                <Input />
            )}
        </FormItem>

    </div>
)

export default App
