"use client"
import { Switch as SwitchBase } from "@base-ui-components/react/switch"
import { useEffect, useRef, useState } from "react"

export function Switch() {
  // Don't set initial state yet - we'll do this after randomly deciding dark mode
  const [checked, setChecked] = useState(false)
  const [initialRender, setInitialRender] = useState(true)
  const onRef = useRef<HTMLAudioElement>(null)
  const offRef = useRef<HTMLAudioElement>(null)

  // This effect runs only once on mount to set up initial dark mode randomly
  useEffect(() => {
    // Randomly decide if dark mode should be on
    const darkModeOn = Math.random() >= 0.5

    if (darkModeOn) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Set the switch state to reflect dark mode (switch is OFF when dark mode is ON)
    setChecked(!darkModeOn)

    // No longer initial render
    setInitialRender(false)
  }, []) // Empty dependency array ensures this only runs once on mount

  // This effect handles changes to the switch after initial setup
  useEffect(() => {
    // Skip on first render since the mount effect handles it
    if (!initialRender) {
      if (!checked) {
        document.documentElement.classList.add("dark")
        onRef.current?.play()
      } else {
        document.documentElement.classList.remove("dark")
        offRef.current?.play()
      }
    }
  }, [checked, initialRender])

  return (
    <>
      <audio ref={onRef} src="/on.mp3" style={{ display: "none" }} />
      <audio ref={offRef} src="/off.mp3" style={{ display: "none" }} />
      <SwitchBase.Root
        checked={checked}
        onCheckedChange={() => setChecked(p => !p)}
        className="relative flex h-4 w-7 rounded-full bg-secondary bg-[length:6.5rem_100%] bg-[100%_0%] bg-no-repeat p-px outline-1 -outline-offset-1 outline-transparent transition-[background-position,box-shadow] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full before:outline-offset-2 before:outline-blue-800 focus-visible:before:inset-0 focus-visible:before:outline-2 active:bg-gray-100 data-[checked]:bg-[0%_0%] data-[checked]:active:bg-primary dark:from-gray-800 dark:shadow-black/75 dark:outline-white/15 dark:data-[checked]:shadow-none"
      >
        <SwitchBase.Thumb className="aspect-square h-full rounded-full bg-gray-300 border-[0.5px] border-gray-400 shadow-md transition-transform duration-150 data-[checked]:translate-x-3 dark:shadow-black/25" />
      </SwitchBase.Root>
    </>
  )
}
