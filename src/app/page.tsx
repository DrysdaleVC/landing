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
        className="w-full h-screen md:h-auto md:aspect-video flex flex-col justify-center bg-[url(/rough_plastic.webp)] brightness-75 bg-center bg-cover max-w-7xl md:rounded-xl overflow-hidden"
      >
        <div
          data-id="screen-frame"
          className="w-full h-full bg-radial from-black/40 from-40% to-black/80 p-2 md:p-6 flex flex-col justify-center"
        >
          <div
            data-id="screen"
            className="w-full h-full flex m-auto rounded-md noise brightness-125 opacity-100 flex-col p-4 md:p-10 bg-[#f0f0e8] dark:bg-[#0a0a0a] relative overflow-hidden"
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
              className="flex items-center mb-4 relative z-10"
            >
              <img
                src="/logo-light.svg"
                alt="Drysdale Ventures Logo"
                className="mr-3 w-full max-w-[180px] md:max-w-[300px] h-auto block dark:hidden"
              />
              <img
                src="/logo-dark.svg"
                alt="Drysdale Ventures Logo"
                className="mr-3 w-full max-w-[180px] md:max-w-[300px] h-auto hidden dark:block"
              />
            </div>
            <div
              data-id="screen-content"
              className="flex-1 font-mono text-xs md:text-sm relative text-gray-800 dark:text-gray-200 flex flex-col z-10"
            >
              <div
                data-id="terminal-content"
                className="flex flex-col gap-2 md:gap-4 flex-1"
              >
                <Terminal />
              </div>
              <div className="font-sans text-xs md:text-sm mt-4 md:mt-6">
                <div className="flex flex-col md:flex-row md:justify-between w-full gap-3">
                  <div className="flex flex-row flex-wrap gap-1">
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
                    <div className="flex flex-row text-red-500 gap-2 items-center">
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
        <div className="size-8 md:size-12 hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 mb-2 mx-auto">
          <img
            src="/icon-dark.svg"
            alt="Drysdale Ventures Logo"
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  )
}
