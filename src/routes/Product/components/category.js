import React from 'react'
import { Form,Select} from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;

const App = ({formItemLayout,getFieldDecorator,style,cats = []}) => (
    <div>
        <FormItem
            {...formItemLayout}
            label="Name"
            hasFeedback
            style={style}
        >
            {getFieldDecorator('category_id', {
                rules: [{
                    required: true, message: 'Please input the product name!',
                }],
            })(
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {cats.map(item => (
                        <Option key={'pdetail_cid_' + item.id} value={item.id}>{item.name}</Option>
                    ))}
                </Select>
            )}
        </FormItem>

    </div>
)

export default App
