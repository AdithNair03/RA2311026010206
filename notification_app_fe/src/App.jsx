import { useState } from 'react'
import AllNotifications from './pages/AllNotifications'
import PriorityInbox from './pages/PriorityInbox'

function App() {
  const [page, setPage] = useState('all')

  return (
    <div>
      <div style={{ background: '#1976d2', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', flexGrow: 1 }}>
          Campus Notifications
        </span>
        <button onClick={() => setPage('all')}
          style={{ background: page === 'all' ? 'white' : 'transparent', color: page === 'all' ? '#1976d2' : 'white',
            border: '1px solid white', borderRadius: '4px', padding: '6px 16px', cursor: 'pointer' }}>
          All
        </button>
        <button onClick={() => setPage('priority')}
          style={{ background: page === 'priority' ? 'white' : 'transparent', color: page === 'priority' ? '#1976d2' : 'white',
            border: '1px solid white', borderRadius: '4px', padding: '6px 16px', cursor: 'pointer' }}>
          Priority Inbox
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        {page === 'all' ? <AllNotifications /> : <PriorityInbox />}
      </div>
    </div>
  )
}

export default App