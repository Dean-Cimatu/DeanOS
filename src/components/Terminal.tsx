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
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            const {command, args} =parseCommand(input)
            const result = processCommand(command, args, currentDir)

            setOutput([...output, "> " +input,...result ])
            setHistory([...history, input])
            setInput("")

            if (command === "cd" && args[0]) {
                if (args[0] === "/home" || args[0] === "/projects" || args[0] === "/about")
                    setCurrentDir(args[0])
            }

        }
        if (e.key === "ArrowUp"){

            if (historyIndex === -1) {
                const newIndex = history.length - 1
                setHistoryIndex(newIndex)
                setInput(history[newIndex])
            } else {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setInput(history[newIndex])
            }
        }

        if (e.key === "ArrowDown"){
            const newIndex = historyIndex +1
            if (newIndex >= history.length) {
                setHistoryIndex(-1)
                setInput("")
            } else {
                setHistoryIndex(newIndex)
                setInput(history[newIndex])
            }
        }

    }
   return(
        <div style={{
            backgroundColor: "black",
            color: "cyan",
            fontFamily: "monospace",
            padding: "30px"
        }}>
            {output.map((line, i) => <div key={i}>{line}</div>)}
            <div>user@deanos:{currentDir}$</div>
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{backgroundColor: "black", color: "cyan", border: "none", outline: "none"}}
            />
        </div>
        ) 
    }

