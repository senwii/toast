import { useState, useRef } from 'react'

/**
 * @desc 综合useRef的实时性和useState能触发render的特性
 */
export function useReactiveRef(initial:any) {
    let [value, setValue] = useState(initial)
    const ref = useRef(value)
    const res:React.MutableRefObject<any> = {
        current: value,
    }

    Object.defineProperty(res, 'current', {
        get() {
            return value
        },
        set(val) {
            setValue(() => {
                // 因闭包相关原因，有必要手动执行一次value = val，否则res.current存在stale state现象
                value = val
                return val
            })
            ref.current = val
        },
    })

    return res
}

/**
 * 
 * @desc 可以被赋值setTimeout的返回值，每次赋值前自动clearTimeout
 */
export function useTimeoutRef(initial:NodeJS.Timeout) {
    const ref = useRef(initial)
    const res:React.MutableRefObject<NodeJS.Timeout> = {
        current: ref.current,
    }

    Object.defineProperty(res, 'current', {
        get() {
            return ref.current
        },
        set(val) {
            clearTimeout(ref.current as unknown as number)
            ref.current = val
        },
    })

    return res
}
