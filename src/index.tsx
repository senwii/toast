import React from "react"
import ReactDOM from 'react-dom'

import Toast from './Toast'

function App() {
  Toast({
    type: 'success', // success|error|warning|loading
    message: `现在是${new Date()}`,
    async control({ goto, delay, set }) {
      await goto('in')
      for (let i=0; i<50; i++) {
        await goto('in')
        await delay(500)
        await goto('out')
        set({
          type: ['success', 'error', 'warning', 'loading'] [~~(Math.random() * 4)],
          message: `现在是${new Date()}`,
        })
      }
      await goto('out')
      await goto('exit')
    },
  })

  async function doToast() {
    const a = Toast.create(`${new Date()}`)

      await a.goto('in')
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
