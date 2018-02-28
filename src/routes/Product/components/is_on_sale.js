import React from 'react'
import { Form, Switch } from 'antd'

const FormItem = Form.Item;

const App = ({formItemLayout,getFieldDecorator,style}) => (
    <div>
        <FormItem
            {...formItemLayout}
            label="Sale"
            style={style}
        >
            {getFieldDecorator('is_on_sale', { valuePropName: 'checked' })(
                <Switch />
            )}
        </FormItem>

    </div>
)

export default App
