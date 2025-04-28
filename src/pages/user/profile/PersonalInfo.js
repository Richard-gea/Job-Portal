import { Col, Row } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'

function PersonalInfo() {
    return (
        <Row gutter={[10, 10]}>
            <Col span={8}>
                <FormItem label="First Name" name="firstname"
                    rules={[{ required: true, message: "required"}]}>
                    <input type='text' />
                </FormItem>
            </Col>
            <Col span={8}>
                <FormItem label="Last Name" name="lastname"
                rules={[{ required: true, message: "required"}]}>
                    <input type='text' />
                </FormItem>
            </Col>
            <Col span={8}>
                <FormItem label="Email" name="email"
                rules={[{ required: true, message: "required"}]}>
                    <input type='text' />
                </FormItem>
            </Col>
            <Col span={8}>
                <FormItem label="Phone Number" name="phoneNumber"
                rules={[{ required: true, message: "required"}]}>
                    <input type='text' />
                </FormItem>
            </Col>
            <Col span={8}>
                <FormItem label="Portfolio" name="portfolio"
                rules={[{ required: true, message: "required"}]}>
                    <input type='text' />
                </FormItem>
            </Col>
            <Col span={24}>
                <FormItem label="Carrier Objective" name="carrierObjective"
                rules={[{ required: true, message: "required"}]}>
                    <textarea type='text'
                    rows={4} />
                    
                </FormItem>
            </Col>
            <Col span={24}>
                <FormItem label="Address" name="address">
                    <textarea type='text'
                    rows={4} />
                </FormItem>
            </Col>
        </Row>
    )
}

export default PersonalInfo
