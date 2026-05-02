import { useEffect, useState } from 'react'
import axios from 'axios'

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjg1NDFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTAxNywiaWF0IjoxNzc3NzA0MTE3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGI0ZDRkYzgtNTYwMS00MmNkLWE1YzYtYWYxOTdmMTcwZjFjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdGggbmFpciIsInN1YiI6ImYxNWRlOTFjLWExNjQtNDkxYS04MTdkLWYyZDFmYzUwMzFjZiJ9LCJlbWFpbCI6ImFuODU0MUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFkaXRoIG5haXIiLCJyb2xsTm8iOiJyYTIzMTEwMjYwMTAyMDYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJmMTVkZTkxYy1hMTY0LTQ5MWEtODE3ZC1mMmQxZmM1MDMxY2YiLCJjbGllbnRTZWNyZXQiOiJIQnZwVUJ0RlZGU3JRWnd2In0.iqrrkyzwLJ_5Hg9tf_XrMIvEPLXRf768lfoDwMQhGB0"

const TYPE_COLOR = { Placement: '#2e7d32', Result: '#ed6c02', Event: '#0288d1' }

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([])
  const [viewed, setViewed] = useState([])
  const [filter, setFilter] = useState('All')
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(true)

useEffect(() => {
    setLoading(true)
    axios.get("http://20.207.122.201/evaluation-service/notifications", {
      headers: { Authorization: "Bearer " + TOKEN }
    }).then(r => {
      let data = r.data.notifications
      if (filter !== 'All') {
        data = data.filter(n => n.Type === filter)
      }
      setNotifications(data.slice(0, limit))
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [filter, limit])

  return (
    <div>
      <h2>All Notifications</h2>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option>All</option>
          <option>Placement</option>
          <option>Result</option>
          <option>Event</option>
        </select>
        <input type="number" value={limit} onChange={e => setLimit(e.target.value)}
          style={{ padding: '8px', width: '80px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {notifications.map(n => (
            <div key={n.ID} onClick={() => setViewed(v => v.includes(n.ID) ? v : [...v, n.ID])}
              style={{ border: viewed.includes(n.ID) ? '1px solid #ccc' : '1px solid #1976d2',
                borderRadius: '8px', padding: '16px', cursor: 'pointer',
                opacity: viewed.includes(n.ID) ? 0.6 : 1, background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ background: TYPE_COLOR[n.Type], color: 'white',
                  padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>{n.Type}</span>
                {viewed.includes(n.ID) && <span style={{ fontSize: '12px', color: '#999' }}>Viewed</span>}
              </div>
              <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>{n.Message}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{n.Timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}