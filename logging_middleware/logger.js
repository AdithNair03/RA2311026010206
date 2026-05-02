const axios = require('axios')

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjg1NDFAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTAxNywiaWF0IjoxNzc3NzA0MTE3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGI0ZDRkYzgtNTYwMS00MmNkLWE1YzYtYWYxOTdmMTcwZjFjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdGggbmFpciIsInN1YiI6ImYxNWRlOTFjLWExNjQtNDkxYS04MTdkLWYyZDFmYzUwMzFjZiJ9LCJlbWFpbCI6ImFuODU0MUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFkaXRoIG5haXIiLCJyb2xsTm8iOiJyYTIzMTEwMjYwMTAyMDYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJmMTVkZTkxYy1hMTY0LTQ5MWEtODE3ZC1mMmQxZmM1MDMxY2YiLCJjbGllbnRTZWNyZXQiOiJIQnZwVUJ0RlZGU3JRWnd2In0.iqrrkyzwLJ_5Hg9tf_XrMIvEPLXRf768lfoDwMQhGB0"

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      { stack, level, package: pkg, message },
      { headers: { Authorization: "Bearer " + ACCESS_TOKEN, "Content-Type": "application/json" } }
    )
    console.log("[LOG SUCCESS] " + level.toUpperCase() + " - " + message)
    return response.data
  } catch (error) {
    console.error("[LOG ERROR]", error.message)
  }
}

module.exports = { Log }