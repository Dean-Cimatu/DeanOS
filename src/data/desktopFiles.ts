export interface DesktopFile {
  id: string
  name: string
  type: 'file' | 'folder' | 'app'
  iconId: string
  appId: string
  /** For browser windows: the page path. For fileviewer: the filename. */
  initialPage?: string
}

export const desktopFiles: DesktopFile[] = [
  { id: 'di-browser',   name: 'Browser',              type: 'app',  iconId: 'browser',  appId: 'browser' },
  { id: 'di-terminal',  name: 'Terminal',              type: 'app',  iconId: 'terminal', appId: 'terminal' },
  { id: 'di-files',     name: 'Files',                 type: 'app',  iconId: 'files',    appId: 'files' },
  { id: 'di-settings',  name: 'Settings',              type: 'app',  iconId: 'settings', appId: 'settings' },
  { id: 'di-music',     name: 'Music',                 type: 'app',  iconId: 'music',    appId: 'music' },
  { id: 'di-photos',      name: 'Photos',      type: 'app',  iconId: 'photos',     appId: 'photos' },
  { id: 'di-calculator',  name: 'Calculator',  type: 'app',  iconId: 'calculator',   appId: 'calculator' },
  { id: 'di-games',       name: 'Games',       type: 'folder', iconId: 'games',      appId: 'gamelibrary' },
  { id: 'di-helloworld',name: 'hello_world.js',        type: 'file', iconId: 'code',     appId: 'coderunner' },
  { id: 'di-deanos',    name: 'DeanOS.md',             type: 'file', iconId: 'document', appId: 'fileviewer',  initialPage: 'DeanOS.md' },
  { id: 'di-studybuddy',name: 'StudyBuddy.md',         type: 'file', iconId: 'document', appId: 'fileviewer',  initialPage: 'StudyBuddy.md' },
  { id: 'di-dpcli',     name: 'DesignPatternCLI.md',   type: 'file', iconId: 'document', appId: 'fileviewer',  initialPage: 'DesignPatternCLI.md' },
]
