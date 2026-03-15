const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'faisla-backend' })
})

// Placeholder leaderboard routes
const mockLeaderboard = [
  { id: 1, name: 'Demo Farmer', daysSurvived: 120, score: 780 },
]

app.get('/api/leaderboard', (req, res) => {
  res.json({ entries: mockLeaderboard })
})

app.post('/api/leaderboard', (req, res) => {
  const { name, daysSurvived, score } = req.body || {}
  const entry = {
    id: mockLeaderboard.length + 1,
    name: name || 'Anonymous',
    daysSurvived: daysSurvived || 0,
    score: score || 0,
  }
  mockLeaderboard.push(entry)
  res.status(201).json({ entry })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Faisla backend listening on http://localhost:${port}`)
})

