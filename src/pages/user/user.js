import Authorize from '../../components/Authorize'

import UserPage from './userPage'
function User() {
  return (
    <Authorize>
      <UserPage />
    </Authorize>
  )
}

export default User
