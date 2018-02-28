import React, { Component } from 'react'
import { Button, Col, Form, Icon, Input, Row } from 'antd'

const FormItem = Form.Item

let uuid = 0

class DynamicFieldSet extends Component {
    componentDidMount(){
        const { form,list } = this.props;
        let keys = [];
        if(list.length != 0){
            list.map((item,index) => {
                keys.push(index)
            })
            form.setFieldsValue({
                keys: keys
            })
        }
    }
    remove = (k) => {
        const { form } = this.props
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        // We need at least one passenger
        if (keys.length === 0) {
            return
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        })
    }

    add = () => {
        const { form } = this.props
        const keys = form.getFieldValue('keys')
        const nextKeys = keys.concat(uuid)
        uuid++
        form.setFieldsValue({
            keys: nextKeys,
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
                sm: { span: 6, offset: 0 },
            },
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 18, offset: 0 },
            },
        }
        getFieldDecorator('keys', { initialValue: [] })
        const keys = getFieldValue('keys')
        const formItems = keys.map((k, index) => {
            return (
                <Row
                    key={k}
                >
                    <Col span={7}>
                        <FormItem
                            style={{display:'none'}}
                        >
                            {getFieldDecorator(`properties[${k}]['id']`, {
                                initialValue:list.length != 0 ? list[k]['id'] : '',
                            })(
                                <div></div>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayoutWithLabel}
                            label={'name'}
                            hasFeedback
                        >
                            {getFieldDecorator(`properties[${k}]['name']`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                initialValue:list.length != 0 ?list[k]['name'] : '',
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input property\'s name or delete this field.',
                                }],
                            })(
                                <Input placeholder="proterty name"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem
                            {...formItemLayoutWithLabel}
                            label={'detail'}
                            hasFeedback
                        >
                            {getFieldDecorator(`properties[${k}]['detail']`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                initialValue:list.length != 0 ?list[k]['name'] : '',
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input property\'s detail or delete this field.',
                                }],
                            })(
                                <Input placeholder="proterty detail"/>
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
                        Properties
                    </label>
                </Col>
                <Col span={20}>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button offset={4} type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus"/> Add property
                        </Button>
                    </FormItem>
                </Col>
            </Row>
        )
    }
}

export default DynamicFieldSet
