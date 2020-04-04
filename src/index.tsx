import React from "react"
import ReactDOM from 'react-dom'

import Toast from './Toast'

function App() {
  async function doToast() {
    const a = Toast.create(`${new Date()}`)

    await a.goto('in')
    await a.delay(5000)
    await a.goto('out')
    await a.goto('exit')
  }

  return (
    <div className="root">
      <button onClick={doToast}>点击我</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app') as HTMLElement,
)
