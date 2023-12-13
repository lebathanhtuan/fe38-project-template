import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div>
      <div>Header</div>
      <hr />
      <Outlet />
      <hr />
      <div>Footer</div>
    </div>
  )
}

export default UserLayout
