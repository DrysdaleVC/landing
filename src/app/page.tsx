import { Switch } from "@/components/switch"
import { Terminal } from "@/components/terminal"

export default function Home() {
  return (
    <main className="min-h-[100vh] w-full flex items-center p-0 justify-center md:bg-background md:bg-none sm:bg-[url(/rough_plastic.webp)] bg-cover">
      <div
        data-id="computer-frame"
        className="w-full h-[100svh] overflow-y-hidden md:h-auto relative min-h-screen md:min-h-[800px] bg-[url(/rough_plastic.webp)] brightness-75 bg-center bg-cover max-w-7xl md:aspect-video flex flex-col md:justify-center p-6 md:p-16 md:rounded-xl"
        style={{
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div
          data-id="screen-frame"
          className="w-full h-full p-4 md:p-10 rounded-[20px] flex flex-col justify-center"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.50) 100%)",
            boxShadow:
              "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 16px 12px rgba(0,0,0, 0.90) inset, 0px 0px 64px 48px rgba(50,50,50, 0.2) inset",
          }}
        >
          <div
            data-id="screen"
            className="w-full h-full flex rounded-[16px] md:rounded-[24px] brightness-125 shadow-lg opacity-100 flex-col p-6 md:p-10 bg-[#f0f0e8] dark:bg-background relative overflow-hidden"
            style={
              {
                // boxShadow:
                //   "inset 0 0 10px rgba(0, 0, 0, 0.2), 0 0 15px 5px rgba(240, 240, 232, 0.15)",
                // transform: "perspective(1000px)",
              }
            }
          >
            <div
              data-id="noise"
              className="absolute inset-0 rounded-[16px] md:rounded-[24px] pointer-events-none opacity-20 md:opacity-30 invert dark:invert-0 dark:opacity-20"
              style={{
                background:
                  "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=)",
              }}
            />
            {/* CRT screen curvature overlay */}
            <div
              className="absolute rounded-[20px] inset-0 pointer-events-none"
              style={
                {
                  // background:
                  //   "radial-gradient(circle at center, transparent 50%, rgba(0, 0, 0, 0.1) 100%)",
                  // boxShadow: "inset 0 0 50px 10px rgba(255, 255, 255, 0.1)",
                }
              }
            />

            {/* Screen vignette effect */}
            <div
              data-id="screen-vignette"
              className="absolute inset-0 pointer-events-none rounded-[20px]"
              style={{
                boxShadow: "inset 0 0 100px 5px rgba(0, 0, 0, 0.1)",
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
                height={48}
                className="w-48 md:w-auto md:pb-4 block dark:hidden"
              />
              <img
                src="/logo-dark.svg"
                alt="Drysdale Ventures Logo"
                width={400}
                height={48}
                className="w-48 md:w-auto md:pb-4 hidden dark:block"
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
              <div className="flex flex-col md:flex-row text-primary justify-between w-full px-1.5 font-sans absolute z-10 -bottom-2 gap-4 md:gap-0">
                <div className="flex flex-row flex-wrap flex-1 gap-1 text-xs md:text-sm">
                  <span>
                    Drysdale Invest &copy; 2025 - Backing software companies
                    from day 0
                  </span>
                </div>
                <div className="flex flex-row gap-4 items-center text-xs md:text-sm">
                  <a
                    href="https://www.linkedin.com/company/drysdaleventures/about/"
                    className="font-medium"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://drive.google.com/drive/folders/1ew3o4I_EQuCvN0lZD7uZ7Z2GZUhAqHvn?usp=sharing"
                    className="font-medium"
                  >
                    Media Kit
                  </a>
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
