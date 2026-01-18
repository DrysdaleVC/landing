import { ScreenContent } from "@/components/screen-content";
import { Switch } from "@/components/switch";
import { getAllLandingData } from "@/lib/sanity";

export default async function Home() {
  // Fetch all CMS data
  const { team, batches } = await getAllLandingData();

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
          className="w-full h-full p-2 md:p-6 rounded-[20px] flex flex-col"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.50) 100%)",
            boxShadow:
              "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 16px 12px rgba(0,0,0, 0.90) inset, 0px 0px 64px 48px rgba(50,50,50, 0.2) inset",
          }}
        >
          <div
            data-id="screen"
            className="w-full h-full flex rounded-[16px] md:rounded-[24px] brightness-125 shadow-lg opacity-100 flex-col bg-[#f0f0e8] dark:bg-background relative overflow-hidden"
          >
            <div
              data-id="noise"
              className="absolute inset-0 bg-repeat z-10 bg-[6px] dark:bg-[2px] rounded-[16px] md:rounded-[24px] pointer-events-none opacity-20 md:opacity-50 invert dark:invert-0 dark:opacity-20 will-change-opacity"
              style={{
                backgroundImage: "url(/texture.png)",
                transform: "translateZ(0)",
              }}
            />

            {/* Screen content wrapper with padding */}
            <div className="flex flex-col h-full p-6 md:p-10 relative z-10">
              {/* Header with logo and navigation */}
              <div data-id="header" className="flex items-center justify-between mb-3 md:mb-6">
                <div data-id="logo">
                  <img
                    src="/logo-light.svg"
                    alt="Drysdale Ventures Logo"
                    width={400}
                    height={48}
                    className="w-48 md:w-auto block dark:hidden"
                  />
                  <img
                    src="/logo-dark.svg"
                    alt="Drysdale Ventures Logo"
                    width={400}
                    height={48}
                    className="w-48 md:w-auto hidden dark:block"
                  />
                </div>
                <div className="flex flex-row gap-4 items-center text-xs md:text-sm font-sans text-primary">
                  <a
                    href="https://www.linkedin.com/company/drysdaleventures/about/"
                    className="font-medium hidden md:block"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://drive.google.com/drive/folders/1ew3o4I_EQuCvN0lZD7uZ7Z2GZUhAqHvn?usp=sharing"
                    className="font-medium hidden md:block"
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

              {/* Main scrollable content area */}
              <div
                data-id="screen-content"
                className="flex-1 font-mono text-xs md:text-sm text-primary flex flex-col overflow-hidden"
              >
                <ScreenContent team={team} batches={batches} />
              </div>

              {/* Footer */}
              <div className="text-primary w-full px-1.5 font-sans pt-4 border-t border-primary/10 dark:border-white/10 mt-4">
                <span className="text-xs md:text-sm">
                  Drysdale Invest &copy; {new Date().getFullYear()} - Backing software companies from day 0
                </span>
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
  );
}
