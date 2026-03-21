import { DesktopFile } from "../data/desktopFiles"

interface Props{
    file: DesktopFile
}

export default function FileIcon({file}: Props){
    return <div> {file.icon} {file.name}</div>
}