import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { useReactiveRef, useTimeoutRef } from './hooks'

import './interface'

import './index.less'

const defaultOption:ToastProp = {
  type: 'success',
  message: '',
  duration: 1000,
  cssClass: '',
  sustain: 0,
  animeDuration: 250,
  control: null,
  context: {} as Context,
}

function Toast(options: ToastProp) {
  const [type, setType] = useState(options.type)
  const [message, setMessage] = useState(options.message)
  const [duration, setDuration] = useState(options.duration)
  const [cssClass, setCssClass] = useState(options.cssClass)
  const timerRef = useTimeoutRef(undefined as unknown as NodeJS.Timeout)
  const rootRef = useRef(null)
  const referRef = useRef(Promise.resolve())
  const sustainRef = useRef(options.sustain)
  const animeDurRef = useRef(options.animeDuration)
  const timestampRef = useRef(new Date().getTime())
  const [initProgress, setInitProgress] = useState(Symbol('sleep'))
  const curprogress = useReactiveRef(initProgress)

  options.context.goto = goto
  options.context.delay = delay
  options.context.set = set
  
  useEffect(() => {
    (async () => {
      if (!options.control) {
        await goto('in')
        await delay(duration)
        await goto('out')
        await goto('exit')
      } else {
        options.control(options.context)
      }
    })()
  }, [])

  /**
   * 
   * @param progress string
   * @description 跳转到流程
   */
  function goto(progress:string):Promise<any> {
    referRef.current = referRef.current.then(() => transit(progress))
    return referRef.current
  }

  /**
   * 
   * @param millisecond number
   * @description 延迟指定毫秒数
   */
  function delay(millisecond:number):Promise<any> {
    referRef.current = referRef.current.then(() => new Promise(resolve => {
      if (millisecond >= 0 && millisecond < Infinity) {
        timerRef.current = setTimeout(() => {
          resolve()
        }, millisecond)
      } else if (millisecond < 0) {
        resolve()
      }
    }) as unknown as Promise<any>)

    return referRef.current
  }

  /**
   * 
   * @param progress string
   * @param option? DefaultToastProp
   * @description 流转到下一个流程
   */
  async function transit(progress:string, option?:DefaultToastProp):Promise<any> {
    const currenttime = new Date().getTime()

    if (curprogress.current !== initProgress) {
      const dt = sustainRef.current - (currenttime - timestampRef.current)
  
      await new Promise(resolve => {
        if (dt >= 0) {
          timerRef.current = setTimeout(() => {
            resolve()
          }, dt)
        } else {
          resolve()
        }
      })
    }

    option && set(option)

    return new Promise(resolve => {
      if (curprogress.current === progress) {
        resolve()
        return
      }

      // 防止动画还未结束
      setTimeout(() => {
        curprogress.current = progress
        timestampRef.current = new Date().getTime()

        timerRef.current = setTimeout(() => {
          resolve()
          if (progress === 'exit') {
            const current = rootRef.current as unknown as  HTMLElement
            const parent:null|Node = current.parentNode
            const ancestor:null|Node = parent && parent.parentNode
            parent && ancestor && ancestor.removeChild(parent)
          }
        }, animeDurRef.current)
      }, 16)
    })
  }

  /**
   * 
   * @param key string
   * @param value any
   * @description 更新单个配置项（type|message|duration|cssClass|sustain|animeDuration）
   */
  function setSingle(key:string, value:any) {
    switch (key) {
      case 'type':
        setType(value)
        break
      case 'message':
        setMessage(value)
        break
      case 'duration':
        setDuration(value)
      case 'cssClass':
        setCssClass(value)
        break
      case 'sustain':
        sustainRef.current = value
        break
      case 'animeDuration':
        animeDurRef.current = value
        break
    }
  }

  /**
   * 
   * @param payload DefaultToastProp
   * @description 以对象形式更新多个配置项
   */
  function set(payload:DefaultToastProp) {
    Object.keys(payload).map(key => {
      setSingle(key, payload[key])
    })
  }

  /**
   * 
   * @param evt AnimationEvent
   * @description 动画开始|结束时，保存动画属性值，以便流转时过度动画更平滑
   */
  function saveAnimateValue(evt:any) {
    const styleSheets = window.document.styleSheets as any
    const target = evt.target as HTMLElement

    [...styleSheets]
      .map(stylesheet => {
        const rulelist = [...stylesheet.cssRules]
        .reverse()
        .find(rulelist => {
          return rulelist.type === 7 && rulelist.name === evt.animationName
        }) as any
          
        if (rulelist) {
          const framerule = [...rulelist.cssRules].find(framerule => framerule.keyText === '100%') as any

          if (framerule) {
            [...framerule.style].map(property => {
              const value = getComputedStyle(target)[property]

              target.style[property] = value
            })
          }
        }
      }
    )
  }

  return (
    <div className={`toast-root ${type} ${String(curprogress.current)} ${cssClass}`} style={{ animationDuration: `${animeDurRef.current}ms` }} ref={rootRef}>
      <div className="main-content" onAnimationStart={saveAnimateValue} onAnimationEnd={saveAnimateValue}>
        <div className="icon">&zwj;</div>
        {
          message && <div className="content">{message}</div>
        }
      </div>
    </div>
  )
}

function createParam(...options: Array<string|DefaultToastProp>):ToastProp {
  let prop:ToastProp = {
    ...defaultOption,
    context: {} as Context,
  }

  options.map((option:string|DefaultToastProp) => {
    if (typeof option === 'string') {
      prop.message = option
    } else {
      prop = Object.assign(prop, option)
    }
  })

  return prop
}

const container:HTMLDivElement = document.createElement('div')

const ToastWrapper:ToastWrapper = function(options: string|DefaultToastProp) {
  let prop:ToastProp = createParam(options)

  if (!document.body.contains(container)) {
    container.className = 'toast-group-container'
    document.body.append(container)
  }

  const div:HTMLDivElement = document.createElement('div')
  container.append(div)

  ReactDOM.render(<Toast {...prop} />, div)
}

ToastWrapper.create = (options: string|DefaultToastProp):Context => {
  let prop:ToastProp = createParam(options, {
    control: () => {},
  })

  ToastWrapper(prop)

  return prop.context
}

export default ToastWrapper
