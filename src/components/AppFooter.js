import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>

        <span className="ms-1">&copy; 2023 Dev Pumas.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="" target="_blank" rel="noopener noreferrer">
          Dev Pumas
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
