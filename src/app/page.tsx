import { Switch } from "@/components/switch"
import { Terminal } from "@/components/terminal"

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black">
      <div
        data-id="computer-frame"
        style={{
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)",
        }}
        className="w-full min-h-[800px] bg-[url(/rough_plastic.webp)] brightness-75 bg-center bg-cover max-w-7xl aspect-video flex flex-col justify-center md:p-16 rounded-xl"
      >
        <div
          data-id="screen-frame"
          className="w-full h-full bg-radial from-black/40 from-40% to-black/80 p-6 rounded-4xl shadow-2xl border-8 border-transparent/5 flex flex-col justify-center"
        >
          <div
            data-id="screen"
            className="w-full h-full flex m-auto rounded-md noise brightness-125 opacity-100 flex-col p-10 bg-[#f0f0e8] dark:bg-[#0a0a0a] relative overflow-hidden"
            style={{
              boxShadow:
                "inset 0 0 10px rgba(0, 0, 0, 0.2), 0 0 15px 5px rgba(240, 240, 232, 0.5)",
              borderRadius: "20px / 20px",
              transform: "perspective(1000px)",
            }}
          >
            {/* CRT screen curvature overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 50%, rgba(0, 0, 0, 0.1) 100%)",
                boxShadow: "inset 0 0 50px 10px rgba(255, 255, 255, 0.1)",
                borderRadius: "20px / 20px",
              }}
            />

            {/* Screen vignette effect */}
            <div
              data-id="screen-vignette"
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 100px 5px rgba(0, 0, 0, 0.15)",
                borderRadius: "20px / 20px",
              }}
            />

            <div
              data-id="logo"
              className="flex items-center mb-6 relative z-10"
            >
              <img
                src="/logo-light.svg"
                alt="Drysdale Ventures Logo"
                width={400}
                height={400}
                className="mr-3 pb-4 block dark:hidden"
              />
              <img
                src="/logo-dark.svg"
                alt="Drysdale Ventures Logo"
                width={400}
                height={400}
                className="mr-3 pb-4 hidden dark:block"
              />
            </div>
            <div
              data-id="screen-content"
              className="flex-1 font-mono text-sm relative text-gray-800 dark:text-gray-200 flex flex-col justify-between z-10"
            >
              <div
                data-id="terminal-content"
                className="flex flex-col -mt-3 gap-4"
              >
                <Terminal />
              </div>
              <div className="flex flex-row justify-between w-full font-sans absolute z-10 -bottom-3">
                <div className="flex flex-row flex-wrap flex-1 gap-1">
                  <span>Drysdale Invest &copy; 2025 - Up to </span>
                  <span className="tabular-nums tracking-tight">
                    &euro;500,000
                  </span>
                  <span>in your pre-seed round</span>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <a href="https://www.linkedin.com/company/drysdaleventures/about/">
                    LinkedIn
                  </a>
                  <a href="https://linkedin.com">Assets</a>
                  <div className="flex flex-row gap-2 items-center">
                    <Switch />
                    <img
                      src="/sun.svg"
                      alt="Sun"
                      className="size-4 dark:invert"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
