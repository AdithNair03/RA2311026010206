import { useEffect, useState } from 'react'
import axios from 'axios'

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjg1NDFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTAxNywiaWF0IjoxNzc3NzA0MTE3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGI0ZDRkYzgtNTYwMS00MmNkLWE1YzYtYWYxOTdmMTcwZjFjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdGggbmFpciIsInN1YiI6ImYxNWRlOTFjLWExNjQtNDkxYS04MTdkLWYyZDFmYzUwMzFjZiJ9LCJlbWFpbCI6ImFuODU0MUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFkaXRoIG5haXIiLCJyb2xsTm8iOiJyYTIzMTEwMjYwMTAyMDYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJmMTVkZTkxYy1hMTY0LTQ5MWEtODE3ZC1mMmQxZmM1MDMxY2YiLCJjbGllbnRTZWNyZXQiOiJIQnZwVUJ0RlZGU3JRWnd2In0.iqrrkyzwLJ_5Hg9tf_XrMIvEPLXRf768lfoDwMQhGB0"

const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 }
const TYPE_COLOR = { Placement: '#2e7d32', Result: '#ed6c02', Event: '#0288d1' }

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState([])
  const [topN, setTopN] = useState(10)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get("http://20.207.122.201/evaluation-service/notifications", {
      headers: { Authorization: "Bearer " + TOKEN }
    }).then(r => {
      const sorted = r.data.notifications.map(n => ({
        ...n, score: (TYPE_WEIGHT[n.Type] || 0) * 1e12 + new Date(n.Timestamp).getTime()
      })).sort((a, b) => b.score - a.score).slice(0, topN)
      setNotifications(sorted)
      setLoading(false)
    })
  }, [topN])

  return (
    <div>
      <h2>Priority Inbox</h2>
      <div style={{ marginBottom: '24px' }}>
        <label>Top N: </label>
        <input type="number" value={topN} onChange={e => setTopN(Number(e.target.value))}
          style={{ padding: '8px', width: '80px', borderRadius: '4px', border: '1px solid #ccc', marginLeft: '8px' }} />
      </div>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {notifications.map((n, i) => (
            <div key={n.ID} style={{ border: '1px solid #1976d2', borderRadius: '8px', padding: '16px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#1976d2' }}>#{i + 1}</span>
                <span style={{ background: TYPE_COLOR[n.Type], color: 'white',
                  padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>{n.Type}</span>
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