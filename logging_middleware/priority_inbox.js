const axios = require('axios')
const { Log } = require('./logger')

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjg1NDFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTAxNywiaWF0IjoxNzc3NzA0MTE3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGI0ZDRkYzgtNTYwMS00MmNkLWE1YzYtYWYxOTdmMTcwZjFjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdGggbmFpciIsInN1YiI6ImYxNWRlOTFjLWExNjQtNDkxYS04MTdkLWYyZDFmYzUwMzFjZiJ9LCJlbWFpbCI6ImFuODU0MUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFkaXRoIG5haXIiLCJyb2xsTm8iOiJyYTIzMTEwMjYwMTAyMDYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJmMTVkZTkxYy1hMTY0LTQ5MWEtODE3ZC1mMmQxZmM1MDMxY2YiLCJjbGllbnRTZWNyZXQiOiJIQnZwVUJ0RlZGU3JRWnd2In0.iqrrkyzwLJ_5Hg9tf_XrMIvEPLXRf768lfoDwMQhGB0"

const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 }

async function fetchNotifications() {
  await Log("frontend", "info", "api", "Fetching notifications from server")
  const response = await axios.get("http://20.207.122.201/evaluation-service/notifications", {
    headers: { Authorization: "Bearer " + ACCESS_TOKEN }
  })
  await Log("frontend", "info", "api", "Fetched " + response.data.notifications.length + " notifications")
  return response.data.notifications
}

function getTopN(notifications, n) {
  return notifications.map(function(item) {
    return Object.assign({}, item, {
      score: (TYPE_WEIGHT[item.Type] || 0) * 1e12 + new Date(item.Timestamp).getTime()
    })
  }).sort(function(a, b) {
    return b.score - a.score
  }).slice(0, n)
}

async function main() {
  const notifications = await fetchNotifications()
  const top10 = getTopN(notifications, 10)
  await Log("frontend", "info", "component", "Top 10 priority notifications calculated")
  console.log("\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n")
  top10.forEach(function(n, i) {
    console.log((i+1) + ". [" + n.Type + "] " + n.Message + " - " + n.Timestamp)
  })
}

main()