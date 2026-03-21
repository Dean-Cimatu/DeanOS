import { DesktopFile } from "../data/desktopFiles"

interface Props {
  file: DesktopFile
}

export default function FileIcon({ file }: Props) {
  return <div style={{ color: "white", textAlign: "center" }}>
    <div style={{ fontSize: "32px" }}>{file.icon}</div>
    <div style={{ fontSize: "12px" }}>{file.name}</div>
  </div>
}