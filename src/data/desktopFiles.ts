export interface DesktopFile{
    id: string
    name: string
    type: "file" | "folder"
    icon: string
    path?: string 
}

export const desktopFiles: DesktopFile[] = []