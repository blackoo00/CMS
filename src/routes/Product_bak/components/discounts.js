import React, { Component } from 'react'
import { Button, Col, Form, Icon, Input, Row } from 'antd'

const FormItem = Form.Item

let uuid = 0

class Discount extends Component {
    componentDidMount(){
        const { form,list } = this.props;
        let keys = [];
        if(list.length != 0){
            list.map((item,index) => {
                keys.push(index)
            })
            form.setFieldsValue({
                dkeys: keys
            })
        }
    }
    remove = (k) => {
        const { form } = this.props
        // can use data-binding to get
        const keys = form.getFieldValue('dkeys')
        // We need at least one passenger
        if (keys.length === 0) {
            return
        }

        // can use data-binding to set
        form.setFieldsValue({
            dkeys: keys.filter(key => key !== k),
        })
    }

    add = () => {
        const { form } = this.props
        const keys = form.getFieldValue('dkeys')
        const nextKeys = keys.concat(uuid)
        uuid++
        form.setFieldsValue({
            dkeys: nextKeys,
        })
    }

    render () {
        const { getFieldDecorator, getFieldValue,list } = this.props
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 0 },
            },
        }
        const formItemLayoutWithLabel = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7, offset: 0 },
            },
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 17, offset: 0 },
            },
        }
        getFieldDecorator('dkeys', { initialValue: [] })
        const keys = getFieldValue('dkeys')
        const formItems = keys.map((k, index) => {
            return (
                <Row
                    key={k}
                >
                    <Col span={7}>
                        <FormItem
                            style={{display:'none'}}
                        >
                            {getFieldDecorator(`discount[${k}]['id']`, {
                                initialValue:list.length != 0 ? list[k]['id'] : '',
                            })(
                                <div></div>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayoutWithLabel}
                            label={'count'}
                            hasFeedback
                        >
                            {getFieldDecorator(`discount[${k}]['count']`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                initialValue:list.length != 0 ? list[k]['count'].toString() : '',
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    pattern:'^[0-9]*[1-9][0-9]*$',
                                    message: 'Please input count\'s discount or delete this field.',
                                }],
                            })(
                                <Input placeholder="discount`count"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem
                            {...formItemLayoutWithLabel}
                            label={'discount'}
                            hasFeedback
                        >
                            {getFieldDecorator(`discount[${k}]['discount']`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                initialValue:list.length != 0 ? list[k]['discount'].toString() : '',
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    pattern:'^[0-9]*[1-9][0-9]*$',
                                    message: 'Please input discount\'s detail or delete this field.',
                                }],
                            })(
                                <Input placeholder="count`s discount"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1} style={{textAlign:'center'}}>
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    </Col>
                </Row>
            )
        })
        return (
            <Row>
                <Col span={4} style={{textAlign:'right'}}>
                    <label className="my-antd-label">
                        Discounts
                    </label>
                </Col>
                <Col span={20}>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button offset={4} type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus"/> Add discount
                        </Button>
                    </FormItem>
                </Col>
            </Row>
        )
    }
}

export default Discount
