import { useState } from 'react'
import { Button, Input, Form, Card } from 'antd'
import { Link, generatePath } from 'react-router-dom'

import { ROUTES } from 'constants/routes'

function ToDoListPage() {
  const [taskList, setTaskList] = useState([
    {
      title: 'Làm việc nhà',
      content: 'Lau nhà, quét nhà, nấu cơm',
    },
    {
      title: 'Đi chợ',
      content: 'Mua thịt, rau, cá',
    },
  ])

  const handleAddTask = (values) => {
    console.log('🚀 ~ file: index.jsx:22 ~ handleAddTask ~ handleAddTask:', values)
    // Add task vào state
  }

  const renderTaskList = taskList.map((item, index) => {
    return (
      <Card key={index} size="small" title={item.title} style={{ marginTop: 16 }}>
        <div>{item.content}</div>
        <Button danger>Delete</Button>
      </Card>
    )
  })

  return (
    <div style={{ width: '100%', margin: '0 auto', maxWidth: 700 }}>
      <h2>To Do List</h2>
      <Card size="small" title="Add Task">
        <Form name="addTask" layout="vertical" onFinish={(values) => handleAddTask(values)}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Title is required!',
              },
              {
                max: 10,
                min: 3,
                type: 'string',
                message: 'Title must be less than 10 characters!',
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Content is required!',
              },
            ]}
          >
            <Input placeholder="Content" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
      </Card>
      <div>{renderTaskList}</div>
    </div>
  )
}

export default ToDoListPage
