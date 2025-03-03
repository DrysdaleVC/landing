"use client"
import { Switch as SwitchBase } from "@base-ui-components/react/switch"
import { useEffect, useRef, useState } from "react"

export function Switch() {
  const [checked, setChecked] = useState<boolean>(() => Math.random() > 0.5)
  const [initialRender, setInitialRender] = useState(true)
  const onRef = useRef<HTMLAudioElement>(null)
  const offRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (initialRender) setInitialRender(false)
    if (checked) {
      document.documentElement.classList.remove("dark")
      if (!initialRender) onRef.current?.play()
    } else {
      document.documentElement.classList.add("dark")
      if (!initialRender) offRef.current?.play()
    }
  }, [checked])

  return (
    <>
      <audio ref={onRef} src="/on.mp3" style={{ display: "none" }} />
      <audio ref={offRef} src="/off.mp3" style={{ display: "none" }} />
      <SwitchBase.Root
        checked={checked}
        onCheckedChange={() => setChecked(p => !p)}
        className="relative flex h-4 w-7 rounded-full bg-gradient-to-r from-gray-700 from-35% to-gray-400 to-65% bg-[length:6.5rem_100%] bg-[100%_0%] bg-no-repeat p-px outline-1 -outline-offset-1 outline-transparent transition-[background-position,box-shadow] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full before:outline-offset-2 before:outline-blue-800 focus-visible:before:inset-0 focus-visible:before:outline-2 active:bg-gray-100 data-[checked]:bg-[0%_0%] data-[checked]:active:bg-gray-800 dark:from-gray-800 dark:shadow-black/75 dark:outline-white/15 dark:data-[checked]:shadow-none"
      >
        <SwitchBase.Thumb className="aspect-square h-full rounded-full bg-gray-300 border-[0.5px] border-gray-400 shadow-md transition-transform duration-150 data-[checked]:translate-x-3 dark:shadow-black/25" />
      </SwitchBase.Root>
    </>
  )
}
