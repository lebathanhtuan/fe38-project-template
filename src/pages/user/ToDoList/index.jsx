import { useState, useEffect, useMemo } from 'react'
import { Button, Input, Form, Card, notification } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addTask, updateTask, deleteTask } from '../../../redux/slicers/task.slice'
import { ROUTES } from 'constants/routes'
import TaskItem from './TaskItem'

function ToDoListPage({ text, setText }) {
  const [searchKey, setSearchKey] = useState('')

  const { taskList } = useSelector((state) => state.task)

  const filterTaskList = useMemo(
    () => taskList.filter((item) => item.title.toLowerCase().includes(searchKey.toLowerCase())),
    [taskList, searchKey]
  )

  const dispatch = useDispatch()

  useEffect(() => {
    notification.info({ message: 'Hello' })
    console.log('Khơi tạo ToDoListPage')
    // Gọi API
    // dispatch action để lấy dữ liệu từ API

    return () => {
      console.log('Rời khỏi ToDoListPage')
      // Clear dữ liệu khi rời khỏi trang
      setText('Clear')
    }
  }, [])

  console.log('🚀 ~ render')

  const handleAddTask = (values) => {
    dispatch(addTask({ data: values }))
  }

  const handleUpdateTask = (id, values) => {
    dispatch(
      updateTask({
        id: id,
        data: values,
      })
    )
  }

  const handleDeleteTask = (id) => {
    dispatch(deleteTask({ id: id }))
  }

  const renderTaskList = filterTaskList.map((item, index) => {
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
      <Input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Ví dụ về Effect rời khỏi"
      />
      <Link to={ROUTES.USER.HOME}>Go Home</Link>
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
      <Input
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Search..."
        style={{ marginTop: 16 }}
      />
      <div>{renderTaskList}</div>
    </div>
  )
}

export default ToDoListPage
