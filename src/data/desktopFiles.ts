export interface DesktopFile {
  id: string
  name: string
  type: 'file' | 'folder' | 'app'
  iconId: string
  appId: string
  initialPage?: string
}

export const desktopFiles: DesktopFile[] = [
  { id: 'di-browser',  name: 'Browser',       type: 'app',  iconId: 'browser',  appId: 'browser' },
  { id: 'di-terminal', name: 'Terminal',       type: 'app',  iconId: 'terminal', appId: 'terminal' },
  { id: 'di-files',    name: 'Files',          type: 'app',  iconId: 'files',    appId: 'files' },
  { id: 'di-settings', name: 'Settings',       type: 'app',  iconId: 'settings', appId: 'settings' },
  { id: 'di-about',    name: 'About Me',       type: 'app',  iconId: 'about',    appId: 'browser',  initialPage: '/about' },
  { id: 'di-projects', name: 'Projects',       type: 'app',  iconId: 'projects', appId: 'browser',  initialPage: '/projects' },
  { id: 'di-resume',   name: 'Resume / CV',    type: 'file', iconId: 'resume',   appId: 'browser',  initialPage: '/cv' },
]
