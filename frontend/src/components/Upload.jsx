import { useState } from 'react'

function Upload() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const res = await fetch('/api/documents/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setStatus({ ok: true, message: `Saved "${data.title}" (${data.chunks} chunks)` })
      setTitle('')
      setContent('')
    } else {
      setStatus({ ok: false, message: 'Something went wrong. Try again.' })
    }
  }

  return (
    <div className="panel">
      <h2>Upload a note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Paste your note or document content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
      {status && (
        <p className={status.ok ? 'success' : 'error'}>{status.message}</p>
      )}
    </div>
  )
}

export default Upload
