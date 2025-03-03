"use client"
import { Switch as SwitchBase } from "@base-ui-components/react/switch"
import { useEffect, useState } from "react"

export function Switch() {
  const [checked, setChecked] = useState(true)
  let off = new Audio("/off.mp3")
  let on = new Audio("/on.mp3")

  useEffect(() => {
    if (checked) {
      document.documentElement.classList.remove("dark")
      on.play()
    } else {
      document.documentElement.classList.add("dark")
      off.play()
    }
  }, [checked])

  return (
    <SwitchBase.Root
      checked={checked}
      onCheckedChange={() => setChecked(p => !p)}
      className="relative flex h-4 w-7 rounded-full bg-gradient-to-r from-gray-700 from-35% to-gray-400 to-65% bg-[length:6.5rem_100%] bg-[100%_0%] bg-no-repeat p-px outline-1 -outline-offset-1 outline-transparent transition-[background-position,box-shadow] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full before:outline-offset-2 before:outline-blue-800 focus-visible:before:inset-0 focus-visible:before:outline-2 active:bg-gray-100 data-[checked]:bg-[0%_0%] data-[checked]:active:bg-gray-800 dark:from-gray-800 dark:shadow-black/75 dark:outline-white/15 dark:data-[checked]:shadow-none"
    >
      <SwitchBase.Thumb className="aspect-square h-full rounded-full bg-gray-300 border-[0.5px] border-gray-400 shadow-md transition-transform duration-150 data-[checked]:translate-x-3 dark:shadow-black/25" />
    </SwitchBase.Root>
  )
}
