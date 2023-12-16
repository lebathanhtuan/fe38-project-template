import { Button, Card, Space } from 'antd'

function TaskItem({ item }) {
  return (
    <Card size="small" title={item.title} style={{ marginTop: 16 }}>
      <div>{item.content}</div>
      <Space style={{ marginTop: 8 }}>
        <Button type="primary" ghost>
          Update
        </Button>
        <Button danger>Delete</Button>
      </Space>
    </Card>
  )
}

export default TaskItem
