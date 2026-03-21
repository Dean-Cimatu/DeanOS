export interface DesktopFile{
    id: string
    name: string
    type: "file" | "folder"
    icon: string
    path?: string 
}

export const desktopFiles: DesktopFile[]=[
    {id: "resume", name: "resume.txt", type: "file",icon:"📄",path:"/resume"},
    {id: "deanOS", name: "DeanOs.md", type: "file", icon: "📄", path:"/deanos"},
    {id: "studybuddy", name:"StudyBuddy.md", type: "file", icon: "📄", path: "/studybuddy"},
    {id: "colosseum", name: "Colosseum_Fighters.md", type: "file", icon:"📄", path: "/colosseum"},
    {id: "designpatternscli", name: "DesignPatternCli.md", type: "file", icon: "📄", path: "/designpatternscli"},
    {id: "photos", name: "Project_Photos", type: "folder", icon: "📁", path: "/photos"},
    {id: "games", name: "Games", type: "folder", icon: "📁", path: "/games"}
]