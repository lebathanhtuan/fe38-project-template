import { useState } from 'react'
import { Button, Input, Form, Card, Space } from 'antd'
import { Link, generatePath } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import TaskItem from './TaskItem'
import { ROUTES } from 'constants/routes'

function ToDoListPage() {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: 'Làm việc nhà',
      content: 'Lau nhà, quét nhà, nấu cơm',
    },
    {
      id: 2,
      title: 'Đi chợ',
      content: 'Mua thịt, rau, cá',
    },
  ])

  const handleAddTask = (values) => {
    // Add task vào state
    const newTask = {
      id: uuidv4(),
      title: values.title,
      content: values.content,
    }
    setTaskList([newTask, ...taskList])
  }

  const renderTaskList = taskList.map((item, index) => {
    return <TaskItem key={item.id} item={item} />
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
