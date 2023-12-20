import { useState } from 'react'
import { Button, Input, Form, Card } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import TaskItem from './TaskItem'

function ToDoListPage() {
  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || [])

  const handleAddTask = (values) => {
    const newTask = {
      id: uuidv4(),
      title: values.title,
      content: values.content,
    }
    const newTaskList = [newTask, ...taskList]
    setTaskList(newTaskList)
    localStorage.setItem('taskList', JSON.stringify(newTaskList))
  }

  const handleUpdateTask = (id, values) => {
    const newTaskList = [...taskList]
    const index = newTaskList.findIndex((item) => item.id === id)
    newTaskList.splice(index, 1, {
      id: taskList[index].id,
      title: values.title,
      content: values.content,
    })
    setTaskList(newTaskList)
    localStorage.setItem('taskList', JSON.stringify(newTaskList))
  }

  const handleDeleteTask = (id) => {
    const newTaskList = taskList.filter((item) => item.id !== id)
    setTaskList(newTaskList)
    localStorage.setItem('taskList', JSON.stringify(newTaskList))
  }

  const renderTaskList = taskList.map((item, index) => {
    return (
      <TaskItem
        key={item.id}
        item={item}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />
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
      <Input placeholder="Search..." style={{ marginTop: 16 }} />
      <div>{renderTaskList}</div>
    </div>
  )
}

export default ToDoListPage
