import { Switch } from "@/components/switch"
import { Terminal } from "@/components/terminal"

export default function Home() {
  return (
    <main className="min-h-[100vh] w-full flex items-center p-0 justify-center md:bg-background md:bg-none sm:bg-[url(/rough_plastic.webp)] bg-cover">
      <div
        data-id="computer-frame"
        style={{
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)",
        }}
        className="w-full h-[100svh] overflow-y-hidden md:h-auto relative min-h-screen md:min-h-[800px] bg-[url(/rough_plastic.webp)] brightness-75 bg-center bg-cover max-w-7xl md:aspect-video flex flex-col md:justify-center p-4 md:p-16 rounded-xl"
      >
        <div
          data-id="screen-frame"
          className="w-full h-full bg-radial from-black/20 from-10% to-black/80 p-4 md:p-6 rounded-4xl shadow-2xl border-[4px] md:border-8 border-transparent/5 flex flex-col justify-center"
        >
          <div
            data-id="screen"
            className="w-full h-full flex rounded-md noise brightness-125 opacity-100 flex-col p-4 md:p-10 bg-[#f0f0e8] dark:bg-[#0a0a0a] relative overflow-hidden"
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
              className="flex items-center mb-3 md:mb-6 relative z-10"
            >
              <img
                src="/logo-light.svg"
                alt="Drysdale Ventures Logo"
                width={400}
                height={400}
                className="w-48 md:w-auto mr-3 pb-4 block dark:hidden"
              />
              <img
                src="/logo-dark.svg"
                alt="Drysdale Ventures Logo"
                width={400}
                height={400}
                className="w-48 md:w-auto mr-3 pb-4 hidden dark:block"
              />
            </div>
            <div
              data-id="screen-content"
              className="flex-1 font-mono text-xs md:text-sm relative text-primary flex flex-col justify-between z-10"
            >
              <div
                data-id="terminal-content"
                className="flex flex-col -mt-3 gap-4"
              >
                <Terminal />
              </div>
              <div className="flex flex-col md:flex-row text-primary justify-between w-full font-sans absolute z-10 bottom-0 gap-4 md:gap-0">
                <div className="flex flex-row flex-wrap flex-1 gap-1 text-xs md:text-sm">
                  <span>Drysdale Invest &copy; 2025 - Up to </span>
                  <span className="tabular-nums tracking-tight">
                    &euro;500,000
                  </span>
                  <span>in your pre-seed round</span>
                </div>
                <div className="flex flex-row gap-4 items-center text-xs md:text-sm">
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
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px",
          }}
          className="absolute size-3 bg-green-400 hidden md:block rounded-full bottom-0 right-12 mb-6"
        />
      </div>
    </main>
  )
}
