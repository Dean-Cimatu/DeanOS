import { useState } from 'react'


export default function Terminal(){
    const [output, setOutput]=useState<string[]>([])
    const [input, setInput]= useState<string>("")
    const [currentDir, setCurrentDir]= useState<string>("/home")
    const [history, setHistory]= useState<string[]>([])
    const [historyIndex, setHistoryIndex]= useState<number>(-1)

    const parseCommand = (input: string): {command: string, args: string[]} {
        const parts= input.split(" ")
        const command = parts[0]
        const args = parts.slice(1)
        return {command,args}
    }

    const processCommand = (cmd:string,args: string[], dir: string): string[] => {
        switch(cmd){
            case "help":
                return["Available commands: help, clear, whoami, date, pwd, ls, cd, echo"]
            case "clear":
                return[]
            case "whoami":
                return["Current user: Dean"]
            case "date":
                return[new Date().toString()]
            case "neofetch":
                return [
                    "█████████████████████████",
                    "█████████████████████████",
                    "▀▀▀▀▀   ▀▀▀▀  ▀▀▀▀▀  ▀▀▀▀",
                    "███    █ DeanOS ███  ███",
                    "▀▀               ▀▀▀  ▀▀",
                    "|                       |",
                    "|                       |",
                    "|                       |",
                    "________________________",
                    "",
                    "OS: DeanOS Linux",
                    "Kernel: 5.15.0",
                    "CPU: Intel i9-13900K",
                    "RAM: 32GB",
                    "Shell: /bin/bash",
                    "Terminal: DeanOS Terminal"
  ]
            case "pwd":
                return[dir]
            case "ls":
                if (dir === "/home") return ["projects", "about", "resume.txt"]
                if (dir === "/projects") return ["deanos", "carhire", "designpatterns"]
                if (dir === "/about") return ["bio.txt", "skills.txt"]
                return ["(empty)"]
            case "cd":
                if (args[0] === "/home" || args[0] === "/projects" || args[0] === "/about") {
                    return [`Changed directory to ${args[0]}`]
                }
                return [`Directory not found: ${args[0]}`]
            case "echo":
                return[args.join(" ")]
            default :
                return [`Command not found: ${cmd}`]

        }
    }
}