import { Moon, Sun } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
      aria-label="Toggle theme"
    >
      {/* Moon icon: Visible in Light mode (default), Hidden in Dark mode */}
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-stone-900 dark:text-stone-100" />
      
      {/* Sun icon: Hidden in Light mode, Visible in Dark mode */}
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-stone-900 dark:text-stone-100" />
      
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
