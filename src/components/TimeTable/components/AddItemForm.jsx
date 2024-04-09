import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
const AddItemForm = ({
    onFinish
}) => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);

    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);

    return (
        <Form form={form} name="horizontal_task_form" layout="inline" onFinish={onFinish}>
            <Form.Item
                name="task"
                rules={[
                    {
                        required: true,
                        message: 'Please input your task!',
                    },
                ]}
            >
                <Input prefix={<SendOutlined />} placeholder="Task" />
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !clientReady ||
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Task
                    </Button>
                )}

            </Form.Item>
        </Form>
    );
};
export default AddItemForm;