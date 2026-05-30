import { useState } from 'react'
import Upload from './components/Upload'
import Query from './components/Query'
import './App.css'

function App() {
  const [tab, setTab] = useState('query')

  return (
    <div className="app">
      <header>
        <h1>Nodus</h1>
        <nav>
          <button
            className={tab === 'query' ? 'active' : ''}
            onClick={() => setTab('query')}
          >
            Ask
          </button>
          <button
            className={tab === 'upload' ? 'active' : ''}
            onClick={() => setTab('upload')}
          >
            Upload
          </button>
        </nav>
      </header>

      <main>
        {tab === 'query' ? <Query /> : <Upload />}
      </main>
    </div>
  )
}

export default App
