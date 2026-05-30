import { useState } from 'react'

function Query() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const res = await fetch('/api/query/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    setLoading(false)
    setResult(data)
  }

  return (
    <div className="panel">
      <h2>Ask your notes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What do you want to know?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>

      {result && (
        <div className="result">
          <p className="answer">{result.answer}</p>
          {result.sources.length > 0 && (
            <div className="sources">
              <h3>Sources</h3>
              {result.sources.map((src, i) => (
                <p key={i} className="source">{src}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Query
