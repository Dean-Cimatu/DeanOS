import { DesktopFile } from "../data/desktopFiles"

interface Props{
    file: DesktopFile
}

export default function FileIcon({file}: Props){
    return <div style={{ color: "white" }}>TEST {file.name}</div>
}