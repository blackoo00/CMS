import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item;

const App = ({formItemLayout,getFieldDecorator,style}) => (
    <div>
        <FormItem
            {...formItemLayout}
            label="Name"
            hasFeedback
            style={style}
        >
            {getFieldDecorator('name', {
                rules: [{
                    required: true, message: 'Please input the product name!',
                }],
            })(
                <Input/>
            )}
        </FormItem>

    </div>
)

export default App
