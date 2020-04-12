import React, { useRef, useEffect } from 'react'

import './style.less'

import './interface'

document.addEventListener('click', () => {
    let els = document.querySelectorAll('.click-flash, .out-line') as unknown as Array<Element>
    els = els.length ? [...els] : []

    els.map(el => el.classList.remove('click-flash', 'out-line'))
}, {
    passive: true,
    capture: false,
})

export default function Anchor(props:AnchorProps) {
    const domRef = useRef(null as unknown as HTMLAnchorElement)

    useEffect(() => {
        const handler = (add:boolean, toclass:string, fromclass?:string) => (evt:any) => {
            if (props.href?.[0] === '#') {
                const el = document.querySelector(props.href)

                if (add) {
                    let els = document.querySelectorAll(`.${toclass}, .${fromclass}`) as unknown as Array<Element>
                    els = els.length ? [...els] : []

                    els.map(el => {
                        el.classList.remove(toclass, fromclass as string)
                    })
                    el?.classList.add(toclass)
                    fromclass && evt.currentTarget.classList.add(fromclass)
                } else {
                    el?.classList.remove(toclass)
                }

                evt.stopPropagation()
            }
        }
        const hoverAdd = handler(true, 'hover-flash')
        const hoverRemove = handler(false, 'hover-flash')
        const clickAdd = handler(true, 'click-flash', 'out-line')
        const option = {
            passive: true,
            capture: true,
        }

        domRef.current.addEventListener('mouseover', hoverAdd, option)
        domRef.current.addEventListener('mouseout', hoverRemove, option)
        domRef.current.addEventListener('click', clickAdd, option)
        
        return () => {
            domRef.current.removeEventListener('mouseover', hoverAdd)
            domRef.current.removeEventListener('mouseout', hoverRemove)
            domRef.current.removeEventListener('click', clickAdd)
        }
    }, [])
    return (<a href={props.href} id={props.id} ref={domRef}>
        { props.children }
    </a>)
}
