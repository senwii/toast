import React, { useRef, useEffect } from "react"
import ReactDOM from 'react-dom'

import Toast from './Toast'
import CodeField from './components/CodeField'
import Anchor from './components/Anchor'

import './style.less'

function App() {
  const instance = useRef(null as unknown as Context)
  useEffect(() => {
    instance.current = Toast.create({
      cssClass: 'present-toast',
      attachment: '#carousel',
    })
  }, [])

  useEffect(() => {
    setTimeout(async () => {
      enum TYPE_ENUM { success, error, warning, loading, length }
      enum MESSAGE_ENUM {
        'This is a React Component, Made by React Hooks.',
        'Already support 4 types: success|error|warning|loading.',
        'You can also override or add your own type by style.',
        'For example: Shrink',
        'Another example: tremble',
        'import Toast from \'@senwii/toast\';',
        'Toast(\'message\');',
        length,
      }
      for(let i=0;;i++) {
        const type = TYPE_ENUM[i%TYPE_ENUM.length]
        instance.current.set({
          type,
          message: MESSAGE_ENUM[i%MESSAGE_ENUM.length],
        })

        switch (i%MESSAGE_ENUM.length) {
          case 3:
            instance.current.set({
              animeDuration: 1000,
            })
            await instance.current.goto('shrink')
            instance.current.set({
              animeDuration: 250,
            })
            break
          case 4:
            instance.current.set({
              animeDuration: 1000,
            })
            await instance.current.goto('tremble')
            instance.current.set({
              animeDuration: 250,
            })
            break
          default:
            await instance.current.goto('in')
        }
        await instance.current.delay(3500)
        await instance.current.goto('out')
      }
    }, 10)
  })
  return (
    <div className="root">
      <div className="top-block">

        <h1>@senwii/toast</h1>
        <img src="//img.shields.io/github/license/senwii/toast" />
        &nbsp;
        <object data="//img.shields.io/github/forks/senwii/toast?link=https%3A%2F%2Fgithub.com%2Fsenwii%2Ftoast%2Ffork" />
        &nbsp;
        <img src="//img.shields.io/github/stars/senwii/toast" />
        &nbsp;
        <img src="//github.com/senwii/toast/workflows/ci/badge.svg" />
        <div id="carousel"></div>
      </div>
      <p>This is a <Anchor href="//github.com/senwii/toast">Toast</Anchor> UI Component written by React Hooks and Typescript. <b>Type</b> and <b>progress</b> are used to describe a toast's state. The former decides the icon outlooking, like success tick or error cross. And the latter shows animations while changing to different progress. Of course, a set of api like <b>set()</b> <b>delay()</b> <b>goto()</b> are provided to control them. So, edit the nether codes and have a try!</p>
      <section>
        <h3><Anchor href="#instantiate" id="instantiate">Instantiate</Anchor></h3>
        <div>
          <ul>
            <li>
              <Anchor href="#toast" id="toast"><code>Toast(options)</code></Anchor>
              <br />
              <p>This will instantiate a toast immediately. options description can be seen <Anchor href="#options">here</Anchor>. Sometimes we want to activate a toast not immediately but lazily, we can use <Anchor href="#toast_create">Toast.create(options)</Anchor> instead.</p>
              <p>Minimal usage:</p>
              <CodeField readonly={true} runBtn={true} attachment={document.body} code={
`// By default, toast dom is attached to <body>.
// Run the code, toast will appears on top center of the page.
Toast('A message.')`}
              />
              <p>Rich usage:</p>
              <CodeField readonly={true} runBtn={true} attachment={document.body} code={
`Toast({
  type: 'loading',
  message: 'It\\'s loading for something now.',
  attachment: document.body,
  duration: 3500,
  sustain: 5000,
  cssClass: 'custom-class-name',
  animeDuration: 250,
})`}
              />
              <br />
            </li>
            <li>
              <Anchor href="#toast_create" id="toast_create"><code>Toast.create(options)</code></Anchor>
              <br />
              <p>Create a toast but don't activate it immediately. <Anchor href="#options">Options</Anchor> param is the same as <Anchor href="#toast">Toast(options)</Anchor>. A <Anchor href="#context">context</Anchor> will be returned, and then control the toast's state by it. You should completely manually control the shown state, so some options like <Anchor href="#options_duration">duration</Anchor> won't work here.</p>
              <CodeField attachment={document.body} runBtn={true} code={
`const toast = Toast.create('A message') // return a context
// some logic...
toast.goto('in') // show
toast.delay(1500) // keep shown for 1500ms
toast.goto('out') // hide

toast.goto('in') // show again
// some logic...
toast.goto('out') // hide again
toast.goto('exit') // remove from the dom. Call this if not needed any more.`}
              />
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h3><Anchor href="#options" id="options">options</Anchor></h3>
        <div>
          <ul>
            <li>
              <Anchor href="#options_string" id="options_string"><code>&lt;string&gt;</code></Anchor>
              <br />
              <p>Will be set as toast message.</p>
            </li>
            <li>
              <Anchor href="#options_object" id="options_object"><code>&lt;object&gt;</code></Anchor>
              <br />
              <p>Some optional properties are exposed to be used. Here is the list:</p>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code><Anchor href="#options_type" id="options_type">type</Anchor></code></td>
                    <td><code>&lt;String&gt;</code></td>
                    <td><code>success</code></td>
                    <td><code>success|error|warning|loading, or you can also <Anchor href="#customized_a_type">customized a type</Anchor>. <b>Instance dom element will add a css class named type</b>.</code></td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#options_message" id="options_message">message</Anchor></code></td>
                    <td><code>&lt;String&gt;</code></td>
                    <td><code>&lt;Empty String&gt;</code></td>
                    <td><code>the shown content.</code></td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#options_duration" id="options_duration">duration</Anchor></code></td>
                    <td><code>&lt;Number&gt;</code></td>
                    <td><code>1000</code></td>
                    <td><code>millisecond between progress 'in' and 'out', ignored while <Anchor href="#options_control">control</Anchor> property exists or in <Anchor href="#toast_create">Toast.create</Anchor>.</code></td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#options_cssClass" id="options_cssClass">cssClass</Anchor></code></td>
                    <td><code>&lt;String&gt;</code></td>
                    <td><code>&lt;Empty String&gt;</code></td>
                    <td><code>add a css class to instance dom, convenient for overriding style.</code></td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#options_sustain" id="options_sustain">sustain</Anchor></code></td>
                    <td><code>&lt;Number&gt;</code></td>
                    <td><code>0</code></td>
                    <td><code>minimal millisecond between two progress. Progress won't effect until the time gap reaches this value. This property is designed to avoid flash.</code></td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#options_animeDuration" id="options_animeDuration">animeDuration</Anchor></code></td>
                    <td><code>&lt;Number&gt;</code></td>
                    <td><code>250</code></td>
                    <td><code>millisecond of progress changing animation duration.</code></td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#options_control" id="options_control">control</Anchor></code></td>
                    <td><code>&lt;Function(<Anchor href="#context">context</Anchor>)&gt;</code></td>
                    <td><code>null</code></td>
                    <td>
                      <code>manually control the shown state.
                        <br />
                        <br />
                        Tips:
                        <br />
                        1. Ignored when used in <Anchor href="#toast_create">Toast.create(options)</Anchor>
                        <br />
                        2. If exists, <Anchor href="#options_duration">duration</Anchor> will be ignored.
                        <br />
                        Detailed usage seen <Anchor href="#use_control">here</Anchor>.
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#options_attachment" id="options_attachment">attachment</Anchor></code></td>
                    <td><code>&lt;Selector String&gt;|<br />&lt;HTMLElement&gt;</code></td>
                    <td><code>document.body</code></td>
                    <td><code>the element to attach the instance dom. If is document.body, use fixed layout; else use absolute layout.</code></td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h3><Anchor href="#context" id="context">context</Anchor></h3>
        <div>
          <ul>
            <li>
              <Anchor href="#context_object" id="context_object"><code>&lt;object&gt;</code></Anchor>
              <br />
              <p>Used in <Anchor href="#options_control">control option</Anchor> or the return value of <Anchor href="#toast_create">Toast.create</Anchor>. Contains several properties:</p>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Signature</th>
                    <th>Functionality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code><Anchor href="#context_set" id="context_set">set</Anchor></code></td>
                    <td><code>(<Anchor href="#context_set_payload">payload</Anchor>:&lt;Object&gt;):undefined</code></td>
                    <td><code>set toast state, like <Anchor href="#options_type">type</Anchor>、<Anchor href="#options_message">message</Anchor>, <Anchor href="#options_sustain">sustain</Anchor> and so on. <Anchor href="#use_control">Usage</Anchor>.</code></td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#context_goto" id="context_goto">goto</Anchor></code></td>
                    <td><code>(progress:&lt;String&gt;):&lt;Promise&gt;</code></td>
                    <td>
                      <code>change to specific progress. <b>Instance dom element will add a css class named progress</b>. And show animation while changing. Provided three:
                        <br />
                        - in: from hidden to visible
                        <br />
                        - out: from visible to hidden
                        <br />
                        - exit: remove instance dom (no-recover operation, used to clean dom while no more needed)
                        <br />
                        <br />
                        Tips:
                        <br />
                        1. If <Anchor href="#options_sustain">sustain</Anchor> exists, won't effect until time gap meets the sustain value.
                        <br />
                        2. Besides upper three, any other value is treated as custom progress type. Combined with <Anchor href="#options_cssClass">cssClass</Anchor>, can reach the purpose to <Anchor href="#extend_a_new_progress">extend a new progress</Anchor>.
                        <br />
                        3. Inside, uses a Promise to save <Anchor href="#context_goto">goto()</Anchor> and <Anchor href="#context_delay">delay()</Anchor> call order, so <Anchor href="#goto_and_delay_written_sync">this</Anchor> works completely fine. But, if mixin <Anchor href="#context_goto">goto()</Anchor> or <Anchor href="#context_delay">delay()</Anchor> with <Anchor href="#context_set">set()</Anchor>, errors occur, seen <Anchor href="#goto_delay_mixin_set">this</Anchor>.
                      </code>
                    </td>
                  </tr>
                  <tr>
                    <td><code><Anchor href="#context_delay" id="context_delay">delay</Anchor></code></td>
                    <td><code>(millisecond:&lt;Number&gt;):&lt;Promise&gt;</code></td>
                    <td><code>prolong current progress for specific millisecond.</code></td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h3><Anchor href="#context_set_payload" id="context_set_payload">payload</Anchor></h3>
        <div>
          <ul>
            <li>
              <Anchor href="#context_set_payload_object" id="context_set_payload_object"><code>&lt;object&gt;</code></Anchor>
              <br />
              <p>Not all properties in <Anchor href="#options">options</Anchor> can be used in <Anchor href="#context_set">set()</Anchor> call. Only part works: <Anchor href="#options_type">type</Anchor>、<Anchor href="#options_message">message</Anchor>、<Anchor href="#options_cssClass">cssClass</Anchor>、<Anchor href="#options_sustain">sustain</Anchor>, and <Anchor href="#options_animeDuration">animeDuration</Anchor></p>
              <CodeField sandboxId="p-1" runBtn={true} code={
`const a = Toast.create({
  attachment: '#p-1',
  message: 'Success',
})
;(async function() {
  await a.goto('in')
  await a.delay(1000)
  a.set({ // payload usage
    type: 'loading',
    message: 'Loading',
  })
  await a.delay(1000)
  a.set({ // payload usage
    type: 'error',
    message: 'Error',
  })
  await a.delay(1000)
  await a.goto('out')
  await a.goto('exit')
})()`}
              />
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h3><Anchor href="#example" id="example">example</Anchor></h3>
        <div>
          <ul>
            <li>
              <Anchor href="#customized_a_type" id="customized_a_type"><code>customized a type</code></Anchor>
              <br />
              <p>Combine custom <b>type</b> with <b>cssClass</b>, we can define a new type.</p>
              <CodeField sandboxId="p-2" runBtn={true} code={
`// .js
const toast = Toast.create({
  type: 'search', // custom type, besides default success|error|warning|loading...
  cssClass: 'custom-toast', // className for control style
  message: 'A new type: Search',
  attachment: '#p-2',
})
toast.goto('in')

// .css
// Add these styles
// .custom-toast.search .icon {
//   background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2NTE0NDY3ODk3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU0NjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTExMyA0ODkuNUMxMTMgMjY4LjkgMjkxLjYgOTAgNTEyIDkwczM5OSAxNzguOSAzOTkgMzk5LjVTNzMyLjQgODg5IDUxMiA4ODkgMTEzIDcxMC4xIDExMyA0ODkuNXoiIGZpbGw9IiMzMzNGNTAiIHAtaWQ9IjU0NjMiPjwvcGF0aD48cGF0aCBkPSJNMTk0LjIgNjA3LjZsMC41IDEuOCAwLjIgMS44LTAuMSAxLjgtMC40IDEuNy0wLjYgMS42LTAuOSAxLjUtMS4xIDEuNC0xLjMgMS4yLTEuNSAxLTEuNyAwLjgtMS44IDAuNS0xLjggMC4yLTEuOC0wLjEtMS43LTAuNC0xLjctMC42LTEuNS0wLjktMS40LTEuMS0xLjItMS4zLTEtMS41LTAuOC0xLjctMS0yLjktMS0yLjktMC45LTIuOS0wLjktMi45LTAuOS0yLjktMC45LTIuOS0wLjktMi45LTAuOC0yLjktMC44LTIuOS0wLjgtMi45LTAuOC0yLjktMC43LTIuOS0wLjctMi45LTAuNy0yLjktMC43LTIuOS0wLjYtMi45LTAuNi0yLjktMC42LTIuOS0wLjYtMi45LTAuNS0yLjktMC41LTIuOS0wLjUtMi45LTAuNS0yLjktMC40LTMtMC40LTMtMC40LTMtMC40LTMtMC40LTMtMC4zLTMtMC4zLTMtMC4zLTMtMC4zLTMtMC4yLTMtMC4yLTMtMC4yLTMtMC4yLTMtMC4xLTMtMC4xLTMtMC4xLTMtMC4xLTN2LTE1bDAuMS0zIDAuMS0zIDAuMS0zIDAuMS0zIDAuMi0zIDAuMi0zIDAuMi0zIDAuMi0zIDAuMy0zIDAuMy0zIDAuMy0zIDAuMy0zIDAuNC0yLjkgMC40LTIuOSAwLjQtMi45IDAuNC0yLjkgMC40LTIuOSAwLjUtMi45IDAuNS0yLjkgMC41LTIuOSAwLjUtMi45IDAuNi0yLjkgMC42LTIuOSAwLjYtMi45IDAuNi0yLjkgMC43LTIuOSAwLjctMi45IDAuNy0yLjkgMC43LTIuOSAwLjctMi45IDAuOC0yLjkgMC44LTIuOSAwLjgtMi45IDAuOC0yLjkgMC45LTIuOSAwLjktMi45IDAuOS0yLjggMC45LTIuOCAxLTIuOCAxLTIuOCAxLTIuOCAxLTIuOCAxLTIuOCAxLjEtMi44IDEuMS0yLjggMS4xLTIuOCAxLjEtMi44IDEuMi0yLjggMS4yLTIuOCAxLjItMi44IDEuMi0yLjggMS4zLTIuNyAxLjMtMi43IDIuNi01LjQgMS40LTIuOCAxLjQtMi43IDEuNC0yLjcgMS40LTIuNyAxLjQtMi43IDEuNS0yLjYgMS41LTIuNiAxLjUtMi42IDEuNS0yLjYgMS41LTIuNiAxLjYtMi42IDEuNi0yLjYgMS42LTIuNSAxLjYtMi41IDEuNi0yLjUgMS42LTIuNSAxLjctMi41IDEuNy0yLjUgMS43LTIuNSAxLjctMi40IDEuNy0yLjQgMS44LTIuNCAxLjgtMi40IDEuOC0yLjQgMS44LTIuNCAxLjgtMi40IDEuOS0yLjMgMS45LTIuMyAxLjktMi4zIDEuOS0yLjMgMS45LTIuMyAxLjktMi4zIDItMi4yIDItMi4yIDItMi4yIDItMi4yIDItMi4yIDItMi4yIDIuMS0yLjEgMi4xLTIuMSAyLjEtMi4xIDIuMS0yLjEgMi4xLTIuMSAyLjEtMi4xIDIuMi0yIDIuMi0yIDIuMi0yIDIuMi0yIDIuMi0yIDIuMi0yIDIuMy0xLjkgMi4zLTEuOSAyLjMtMS45IDIuMy0xLjkgMi4zLTEuOSAyLjMtMS45IDIuMy0xLjggMi40LTEuOCAyLjQtMS44IDIuNC0xLjggMi40LTEuOCAyLjQtMS43IDIuNC0xLjcgMi40LTEuNyAyLjUtMS43IDIuNS0xLjcgMi41LTEuNiAyLjUtMS42IDIuNS0xLjYgMi41LTEuNiAyLjUtMS42IDIuNi0xLjUgMi42LTEuNSAyLjYtMS41IDIuNi0xLjUgMi42LTEuNSAyLjYtMS40IDIuNi0xLjQgMi42LTEuNCAyLjctMS40IDIuNy0xLjQgMi43LTEuMyAyLjctMS4zIDIuNy0xLjMgMi43LTEuMyAyLjctMS4zIDIuNy0xLjIgMi44LTEuMiAyLjgtMS4yIDIuOC0xLjIgMi44LTEuMiAyLjgtMS4xIDIuOC0xLjEgMi44LTEuMSAyLjgtMS4xIDIuOC0xIDIuOC0xIDIuOS0xIDUuNy0xLjkgMy43LTAuNiAzLjUgMC42IDMuMiAxLjYgMi42IDIuNSAxLjcgMy4zIDAuNiAzLjYtMC42IDMuNS0xLjYgMy4yLTIuNSAyLjUtMy4zIDEuNy01LjQgMS44LTIuNyAwLjktMi43IDEtMi43IDEtMi43IDEtMi42IDEtMi42IDEtMi42IDEuMS0yLjYgMS4xLTIuNiAxLjEtMi42IDEuMS0yLjYgMS4xLTIuNiAxLjItMi42IDEuMi0yLjUgMS4yLTIuNSAxLjItMi41IDEuMi0yLjUgMS4zLTIuNSAxLjMtMi41IDEuMy0yLjUgMS4zLTIuNSAxLjMtMi41IDEuNC0yLjQgMS40LTIuNCAxLjQtMi40IDEuNC0yLjQgMS40LTIuNCAxLjUtMi40IDEuNS0yLjQgMS41LTIuNCAxLjUtMi4zIDEuNS0yLjMgMS41LTIuMyAxLjYtMi4zIDEuNi0yLjMgMS42LTIuMyAxLjYtMi4zIDEuNi0yLjMgMS43LTIuMiAxLjctMi4yIDEuNy0yLjIgMS43LTIuMiAxLjctMi4yIDEuNy0yLjIgMS44LTIuMiAxLjgtMi4xIDEuOC0yLjEgMS44LTIuMSAxLjgtMi4xIDEuOC0yLjEgMS45LTIuMSAxLjktMi4xIDEuOS0yIDEuOS0yIDEuOS0yIDEuOS0yIDItMiAyLTIgMi0yIDItMS45IDItMS45IDItMS45IDItMS45IDIuMS0xLjkgMi4xLTEuOSAyLjEtMS44IDIuMS0xLjggMi4xLTEuOCAyLjEtMS44IDIuMi0xLjggMi4yLTEuOCAyLjItMS43IDIuMi0xLjcgMi4yLTEuNyAyLjItMS43IDIuMi0xLjcgMi4zLTEuNyAyLjMtMS42IDIuMy0xLjYgMi4zLTEuNiAyLjMtMS42IDIuMy0xLjYgMi4zLTEuNSAyLjQtMS41IDIuNC0xLjUgMi40LTEuNSAyLjQtMS41IDIuNC0xLjUgMi40LTEuNCAyLjQtMS43IDIuOC0xLjQgMi41LTEuNCAyLjUtMS40IDIuNS0xLjMgMi41LTEuMyAyLjUtMS4zIDIuNS0xLjMgMi41LTEuMiAyLjUtMi41IDUuMi0xLjIgMi42LTEuMiAyLjYtMS4yIDIuNi0xLjEgMi42LTEuMSAyLjYtMS4xIDIuNi0xLjEgMi42LTEuMSAyLjYtMSAyLjYtMSAyLjYtMSAyLjYtMSAyLjYtMC45IDIuNy0wLjkgMi43LTAuOSAyLjctMC45IDIuNy0wLjkgMi43LTAuOCAyLjctMC44IDIuNy0wLjggMi43LTAuOCAyLjctMC43IDIuNy0wLjcgMi43LTAuNyAyLjctMC43IDIuNy0wLjcgMi43LTAuNiAyLjctMC42IDIuNy0wLjYgMi43LTAuNiAyLjctMC42IDIuNy0wLjUgMi43LTAuNSAyLjctMC41IDIuNy0wLjUgMi44LTAuNCAyLjgtMC40IDIuOC0wLjQgMi44LTAuNCAyLjgtMC40IDIuOC0wLjMgMi44LTAuMyAyLjgtMC4zIDIuOC0wLjMgMi44LTAuMiAyLjgtMC4yIDIuOC0wLjIgMi44LTAuMiAyLjgtMC4yIDIuOC0wLjEgMi44LTAuMSAyLjgtMC4xIDIuOC0wLjEgMi44djE0bDAuMSAyLjggMC4xIDIuOCAwLjEgMi44IDAuMSAyLjggMC4yIDIuOCAwLjIgMi44IDAuMiAyLjggMC4yIDIuOCAwLjIgMi44IDAuMyAyLjggMC4zIDIuOCAwLjMgMi44IDAuMyAyLjggMC40IDIuOCAwLjQgMi44IDAuNCAyLjggMC40IDIuOCAwLjQgMi44IDAuNSAyLjggMC41IDIuOCAwLjUgMi44IDAuNSAyLjggMC42IDIuOCAwLjYgMi44IDAuNiAyLjcgMC42IDIuNyAwLjYgMi43IDAuNyAyLjcgMC43IDIuNyAwLjcgMi43IDAuNyAyLjcgMC44IDIuNyAwLjggMi43IDAuOCAyLjcgMC44IDIuNyAwLjggMi43IDAuOSAyLjcgMC45IDIuNyAwLjkgMi43IDEuMSAxLjl6TTE4MSA2NTNjMC03LjcgNi4zLTE0IDE0LTE0czE0IDYuMyAxNCAxNC02LjMgMTQtMTQgMTQtMTQtNi4zLTE0LTE0ek00NjguOCAxNzguN2MtMC40LTAuNi0xLjEtMS0xLjktMC45bC04LjMgMS01LjUtNi4zYy0wLjUtMC42LTEuMy0wLjgtMi0wLjYtMC43IDAuMi0xLjMgMC44LTEuNCAxLjVsLTEuNiA4LjItNy43IDMuM2MtMC43IDAuMy0xLjEgMS0xLjIgMS43IDAgMC43IDAuNCAxLjUgMSAxLjhsNy4zIDQuMSAwLjggOC4zYzAuMSAwLjcgMC42IDEuNCAxLjMgMS43IDAuNyAwLjMgMS41IDAuMSAyLTAuNGw2LjItNS43IDguMiAxLjhjMC4zIDAuMSAwLjYgMC4xIDAuOSAwIDAuNC0wLjEgMC44LTAuMyAxLTAuNyAwLjUtMC42IDAuNi0xLjQgMC4zLTIuMWwtMy41LTcuNiA0LjMtNy4yYzAuMi0wLjUgMC4yLTEuMy0wLjItMS45ek04MDUuOCAyOTcuM2MtMC4yLTAuNy0wLjgtMS4yLTEuNi0xLjRsLTguMi0xLjItMy43LTcuNmMtMC4zLTAuNy0xLTEuMS0xLjgtMS4xcy0xLjQgMC40LTEuOCAxLjFsLTMuNyA3LjYtOC4yIDEuMmMtMC43IDAuMS0xLjQgMC42LTEuNiAxLjQtMC4yIDAuNyAwIDEuNSAwLjUgMmw2IDUuOS0xLjQgOC4zYy0wLjEgMC44IDAuMiAxLjUgMC44IDEuOSAwLjYgMC40IDEuNCAwLjUgMi4xIDAuMmw3LjQtMy45IDcuNCAzLjljMC4zIDAuMiAwLjYgMC4yIDAuOSAwLjIgMC40IDAgMC44LTAuMSAxLjItMC40IDAuNi0wLjQgMC45LTEuMiAwLjgtMS45bC0xLjQtOC4zIDYtNS45YzAuMy0wLjUgMC41LTEuMyAwLjMtMnpNNTUwLjggODI2LjljLTAuMi0wLjctMC44LTEuMi0xLjYtMS4zbC04LjItMS4yLTMuNy03LjNjLTAuMy0wLjctMS0xLjEtMS44LTEuMXMtMS40IDAuNC0xLjggMS4xbC0zLjcgNy4zLTguMiAxLjJjLTAuNyAwLjEtMS40IDAuNi0xLjYgMS4zLTAuMiAwLjcgMCAxLjUgMC41IDJsNiA1LjctMS40IDguMWMtMC4xIDAuNyAwLjIgMS41IDAuOCAxLjkgMC42IDAuNCAxLjQgMC41IDIuMSAwLjFsNy40LTMuOCA3LjQgMy44YzAuMyAwLjEgMC42IDAuMiAwLjkgMC4yIDAuNCAwIDAuOC0wLjEgMS4yLTAuNCAwLjYtMC40IDAuOS0xLjIgMC44LTEuOWwtMS40LTguMSA2LTUuN2MwLjMtMC40IDAuNS0xLjIgMC4zLTEuOXoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjU0NjQiPjwvcGF0aD48cGF0aCBkPSJNMjQ3LjQgNTc2LjJjMC0wLjctMC40LTEuNC0xLjEtMS44bC03LjQtMy44LTEuMS04LjNjLTAuMS0wLjctMC42LTEuNC0xLjMtMS42LTAuNy0wLjItMS41LTAuMS0yIDAuNWwtNiA1LjktOC4yLTEuNmMtMC43LTAuMS0xLjUgMC4yLTEuOSAwLjctMC41IDAuNi0wLjUgMS40LTAuMiAyLjFsMy44IDcuNS00IDcuM2MtMC40IDAuNy0wLjMgMS41IDAuMSAyLjEgMC40IDAuNiAxLjIgMC45IDEuOSAwLjhsOC4zLTEuMyA1LjcgNi4xYzAuMiAwLjIgMC41IDAuNCAwLjggMC41IDAuNCAwLjEgMC44IDAuMSAxLjIgMCAwLjctMC4yIDEuMi0wLjggMS40LTEuNmwxLjQtOC4zIDcuNi0zLjZjMC41LTAuMSAxLTAuOCAxLTEuNnpNODAwLjggNjU0LjNjLTAuMi0wLjctMC44LTEuMi0xLjYtMS40bC04LjItMS4yLTMuNy03LjZjLTAuMy0wLjctMS0xLjEtMS44LTEuMXMtMS40IDAuNC0xLjggMS4xbC0zLjcgNy42LTguMiAxLjJjLTAuNyAwLjEtMS40IDAuNi0xLjYgMS40LTAuMiAwLjcgMCAxLjUgMC41IDJsNiA1LjktMS40IDguM2MtMC4xIDAuOCAwLjIgMS41IDAuOCAxLjkgMC42IDAuNCAxLjQgMC41IDIuMSAwLjJsNy40LTMuOSA3LjQgMy45YzAuMyAwLjIgMC42IDAuMiAwLjkgMC4yIDAuNCAwIDAuOC0wLjEgMS4yLTAuNCAwLjYtMC40IDAuOS0xLjIgMC44LTEuOWwtMS40LTguMyA2LTUuOWMwLjMtMC41IDAuNS0xLjMgMC4zLTJ6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI1NDY1Ij48L3BhdGg+PHBhdGggZD0iTTM2NC42IDYzNy42bDExNy4zLTEyNS41IDQ2LjQgNDMuNEw0MTEgNjgxbC00Ni40LTQzLjR6IiBmaWxsPSIjQURCOUNBIiBwLWlkPSI1NDY2Ij48L3BhdGg+PHBhdGggZD0iTTQ0MiA1NDMuNWMwLTI5LjUgMjUuMy01My41IDU2LjUtNTMuNXM1Ni41IDI0IDU2LjUgNTMuNS0yNS4zIDUzLjUtNTYuNSA1My41LTU2LjUtMjQtNTYuNS01My41eiIgZmlsbD0iIzhDRThFNCIgcC1pZD0iNTQ2NyI+PC9wYXRoPjxwYXRoIGQ9Ik03MTggMjEwLjRjNi02LjQgMTYuMS02LjggMjIuNS0wLjhsNzUuNyA3MC43YzYuNCA2IDYuOCAxNi4xIDAuOCAyMi41bC00LjcgNWMtNiA2LjQtMTYuMSA2LjgtMjIuNSAwLjhsLTc1LjctNzAuN2MtNi40LTYtNi44LTE2LjEtMC44LTIyLjVsNC43LTV6IiBmaWxsPSIjREZGNEZFIiBwLWlkPSI1NDY4Ij48L3BhdGg+PHBhdGggZD0iTTY4OS41IDI0MC44YzYtNi40IDE2LjEtNi44IDIyLjUtMC44bDc1LjcgNzAuN2M2LjQgNiA2LjggMTYuMSAwLjggMjIuNWwtNC43IDVjLTYgNi40LTE2LjEgNi44LTIyLjUgMC44bC03NS43LTcwLjdjLTYuNC02LTYuOC0xNi4xLTAuOC0yMi41bDQuNy01eiIgZmlsbD0iI0JGRTlGRCIgcC1pZD0iNTQ2OSI+PC9wYXRoPjxwYXRoIGQ9Ik03ODUuOCA1OTMuN2MtMy4zIDAtNi42LTEuMi05LjEtMy42bC0zNDItMzE5LjdjLTMuNy0zLjUtNS4xLTguOC0zLjYtMTMuNyAxLjUtNC45IDUuNy04LjUgMTAuOC05LjJsMjU5LjUtMzguMWM0LTAuNiA4LjEgMC43IDExIDMuNWwxMDMuMSA5Ni40YzMgMi44IDQuNSA2LjcgNC4yIDEwLjhsLTIwLjYgMjYxLjVjLTAuNCA1LjEtMy43IDkuNS04LjUgMTEuNC0xLjUgMC40LTMuMSAwLjctNC44IDAuN3pNNDczLjEgMjY5LjhsMzAxLjYgMjgxLjkgMTcuOS0yMjcuNS05My43LTg3LjYtMjI1LjggMzMuMnoiIGZpbGw9IiM1RUM4RkEiIHAtaWQ9IjU0NzAiPjwvcGF0aD48cGF0aCBkPSJNNjQ2LjUgMzk5LjljLTMuMyAwLTYuNS0xLjItOS4xLTMuNi01LjQtNS01LjctMTMuNS0wLjYtMTguOGwxNDcuMS0xNTcuNGM1LTUuNCAxMy41LTUuNyAxOC44LTAuNiA1LjQgNSA1LjcgMTMuNSAwLjYgMTguOGwtMTQ3IDE1Ny40Yy0yLjYgMi44LTYuMiA0LjItOS44IDQuMnoiIGZpbGw9IiM1RUM4RkEiIHAtaWQ9IjU0NzEiPjwvcGF0aD48cGF0aCBkPSJNNDQ1LjcgMTk3LjFMODUxIDU3NmwtMjEuOCAxMy45Yy0xMDUuMSA1OS44LTI0MS4xIDQ3LjUtMzM0LjEtMzkuNHMtMTE0LjUtMjIxLjgtNjEuOC0zMzAuN2wxMi40LTIyLjd6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI1NDcyIj48L3BhdGg+PHBhdGggZD0iTTM2NyA3NjhWNjMwbDE0MSAxMzhIMzY3eiIgZmlsbD0iI0Q2RENFNSIgcC1pZD0iNTQ3MyI+PC9wYXRoPjxwYXRoIGQ9Ik0zNTEgNjQ1YzAtMjIuMSAxNy45LTQwIDQwLTQwczQwIDE3LjkgNDAgNDAtMTcuOSA0MC00MCA0MC00MC0xNy45LTQwLTQweiIgZmlsbD0iIzQ0NTQ2QSIgcC1pZD0iNTQ3NCI+PC9wYXRoPjxwYXRoIGQ9Ik0zMjYgNjUwYzAtMzYuNSAyOS41LTY2IDY2LTY2czY2IDI5LjUgNjYgNjYtMjkuNSA2Ni02NiA2Ni02Ni0yOS41LTY2LTY2eiBtMzMgMGMwIDE4LjIgMTQuOCAzMyAzMyAzM3MzMy0xNC44IDMzLTMzLTE0LjgtMzMtMzMtMzMtMzMgMTQuOC0zMyAzM3pNMjM0IDc5MC4yYzAtOC45IDcuMi0xNi4yIDE2LjItMTYuMmgzNDYuNmM4LjkgMCAxNi4yIDcuMiAxNi4yIDE2LjJ2MTU3LjZjMCA4LjktNy4yIDE2LjItMTYuMiAxNi4ySDI1MC4yYy04LjkgMC0xNi4yLTcuMi0xNi4yLTE2LjJWNzkwLjJ6IiBmaWxsPSIjRjk3QjZFIiBwLWlkPSI1NDc1Ij48L3BhdGg+PHBhdGggZD0iTTIxNSA3NzEuNWMwLTggNi41LTE0LjUgMTQuNS0xNC41aDM5NWM4IDAgMTQuNSA2LjUgMTQuNSAxNC41cy02LjUgMTQuNS0xNC41IDE0LjVoLTM5NWMtOCAwLTE0LjUtNi41LTE0LjUtMTQuNXoiIGZpbGw9IiNGQUNDN0UiIHAtaWQ9IjU0NzYiPjwvcGF0aD48cGF0aCBkPSJNMjY1IDgzMi45YzAtMy4yIDIuNi01LjkgNS45LTUuOWg2MS4yYzMuMiAwIDUuOSAyLjYgNS45IDUuOXY1Ny4yYzAgMy4yLTIuNiA1LjktNS45IDUuOWgtNjEuMmMtMy4yIDAtNS45LTIuNi01LjktNS45di01Ny4yek0zODcgODMyLjljMC0zLjIgMi42LTUuOSA1LjktNS45aDYxLjJjMy4yIDAgNS45IDIuNiA1LjkgNS45djU3LjJjMCAzLjItMi42IDUuOS01LjkgNS45aC02MS4yYy0zLjIgMC01LjktMi42LTUuOS01Ljl2LTU3LjJ6TTUwOSA4MzIuOWMwLTMuMiAyLjYtNS45IDUuOS01LjloNjEuMmMzLjIgMCA1LjkgMi42IDUuOSA1Ljl2NTcuMmMwIDMuMi0yLjYgNS45LTUuOSA1LjloLTYxLjJjLTMuMiAwLTUuOS0yLjYtNS45LTUuOXYtNTcuMnoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjU0NzciPjwvcGF0aD48L3N2Zz4=');
// }`}
              />
              <br />
            </li>
            <li>
              <Anchor href="#use_control" id="use_control"><code>use control option</code></Anchor>
              <br />
              <p><Anchor href="#options_control">Control</Anchor> option provides flexible way to control shown state. If exists, instance won't start show-hidden-destory lifecycle automaticlly. Instead, you have to manage state manually. For example, call goto('in') first, call goto('out') later, and call goto('exit') finally.</p>
              <CodeField sandboxId="p-3" runBtn={true} code={
`Toast({
  type: 'loading',
  message: 'loading...',
  attachment: '#p-3',
  async control({goto, set, delay}) {
    await goto('in')

    // After some time
    await delay(3000)
    await goto('out')
    set({
      type: 'error',
      message: 'loading failed!',
    })

    await goto('in')
    await delay(1000)
    await goto('out')

    await goto('exit')
  },
})`}
              />
              <p>When used in Toast.create, this option will be ignored:</p>
              <CodeField sandboxId="p-4" runBtn={true} code={
`const toast = Toast.create({
  type: 'loading',
  message: 'loading start',
  attachment: '#p-4',
  async control({goto, set, delay}) { // won't execute
    await goto('in')
    await delay(1000)
    await goto('out')

    await goto('exit')
  },
})
// This works ↓
toast.goto('in')`}
              />
              <br />
            </li>
            <li>
              <Anchor href="#extend_a_new_progress" id="extend_a_new_progress"><code>extend a new progress</code></Anchor>
              <br />
              <p>Custom a progress is similar to <Anchor href="#customized_a_type">customized a type</Anchor>. Follow three steps:
                <br />
                1. set <Anchor href="#options_cssClass">cssClass option</Anchor>
                <br />
                2. pass a progress string to <Anchor href="#context_goto">goto()</Anchor> method
                <br />
                3. define css animation keyframes
                <br />
                That's all. For example, this customs a 'shake' progress:
              </p>
              <CodeField sandboxId="p-5" runBtn={true} code={
`// .js
const toast = Toast.create({
  type: 'loading',
  message: 'loading',
  attachment: '#p-5',
  cssClass: 'custom-progress-toast', // set custom css classname
})
toast.goto('in')
toast.delay(1000)
toast.goto('shake') // activate shake progress

// .css
// .custom-progress-toast {
//  &.shake .main-content { // activate shake animation when calling goto('shake')
//      animation-duration: inherit;
//      animation-name: animeShake;
//  }
// }
// @keyframes animeShake {
//     25% {
//         transform: rotate(20deg);
//     }
//     45% {
//         transform: rotate(-20deg);
//     }
//     60% {
//         transform: rotate(12deg);
//     }
//     70% {
//         transform: rotate(-12deg);
//     }
//     80% {
//         transform: rotate(6deg);
//     }
//     88% {
//         transform: rotate(-6deg);
//     }
//     93% {
//         transform: rotate(3deg);
//     }
//     97% {
//         transform: rotate(-3deg);
//     }
//     98% {
//         transform: rotate(2deg);
//     }
//     99% {
//         transform: rotate(-2deg);
//     }
//     99.5% {
//         transform: rotate(1deg);
//     }
//     to {
//         transform: rotate(0);
//     }
// }`}
               />
               <br />
            </li>
            <li>
              <Anchor href="#goto_and_delay_written_sync" id="goto_and_delay_written_sync"><code>goto() and delay() written in synchronous</code></Anchor>
              <br />
              <p>As the document describes above, <Anchor href="#context_goto">goto()</Anchor> and <Anchor href="#context_delay">delay()</Anchor> both return Promise, means they work asynchronously. So it maybe confusing that these codes work correctly:
              </p>
              <CodeField readonly={true} sandboxId="p-6" runBtn={true} code={
`const toast = Toast.create({
  type: 'success',
  message: 'Show a success message',
  attachment: '#p-6',
})
// Should't only goto('out') works?
// But in facct, it runs by in-delay-out order as expected.
toast.goto('in')
toast.delay(2000)
toast.goto('out')`}
              />
              <p>That's because in fact, we use a Promise ref to keep the calling order. Every <Anchor href="#context_goto">goto()</Anchor> and <Anchor href="#context_delay">delay()</Anchor> call will be added to the Promise then() chain immediately. Mean code like these:</p>
              <CodeField readonly={true} code={
`// define a Promise ref
const chainRef = useRef(Promise.resolve())
function goto(progress) {
  chainRef.current = chainRef.current.then(() => dealGoto(progress)) // add to the Promise then chain
  return chainRef.current
}
function delay(millisecond) {
  chainRef.current = chainRef.current.then(() => new Promise(resolve => { // add to the Promise then chain
    setTimeout(() => {
      resolve()
    }, millisecond)
  }))
  return chainRef.current
}`}
              />
              <p>By the way, we must be careful when using <Anchor href="#goto_delay_mixin_set" id="goto_delay_mixin_set">goto() and delay() mixin with set()</Anchor>:</p>
              <CodeField readonly={true} sandboxId="p-7" runBtn={true} code={
`const toast = Toast.create({
  type: 'success',
  message: 'msg1',
  attachment: '#p-7',
})
toast.goto('in')
toast.delay(2000)
toast.goto('out')
toast.set({
  message: 'msg2',
})`}
               />
               <p>Because <Anchor href="#context_set">set()</Anchor> is a synchronous method, and doesn't work like <Anchor href="#context_goto">goto()</Anchor> and <Anchor href="#context_delay">delay()</Anchor>, it won't been added to the promise chain. So run the above code, only shows `msg2`, and `msg1` is overrided. To make it works properly, we can wrap them in promise.then style or async style:</p>
              <CodeField readonly={true} sandboxId="p-8" runBtn={true} code={
`const toast = Toast.create({
  type: 'success',
  message: 'msg1',
  attachment: '#p-8',
})
;(async function() {
  // First show 'msg1',
  // 2000ms later, show 'msg2',
  // another 2000ms later, hidden.
  await toast.goto('in')
  await toast.delay(2000)
  toast.set({
    message: 'msg2',
  })
  await toast.delay(2000)
  await toast.goto('out')
})()`}
               />
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app') as HTMLElement,
)
