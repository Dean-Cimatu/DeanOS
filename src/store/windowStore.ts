import { StatementSync } from "node:sqlite"
import { isInternalThread } from "worker_threads"
import { create } from "zustand"

export type WindowState ={
    id: string
    title: string
    x: number
    y: number
    width: number
    height: number
    zIndex: number
    minimised: boolean
    maximised: boolean
    preMaxX: number,
    preMaxY: number,
    preMaxWidth: number,
    preMaxHeight: number,
}
type StoreType ={
    windows: Record<string, WindowState>
    nextZIndex: number
    openWindow (window : WindowState): void
    closeWindow (id: string): void
    focusWindow(id: string): void
    moveWindow(id: string, x: number, y: number): void
    minimiseWindow(id: string): void
    maximiseWindow(id: string):void
}

export const useWindowStore = create<StoreType>((set) => ({
    windows: {} as Record<string, WindowState>,
    nextZIndex: 1,

    openWindow: (window) => set((state) => ({
        windows: {...state.windows, [window.id]: window}
    })),
    closeWindow: (id) => set((state) => {
        const { [id]: _, ...rest } = state.windows
            return { windows: rest }
    }),
    focusWindow: (id) => set((state) => ({
        windows: {
            ...state.windows,
            [id]: { ...state.windows[id], zIndex: state.nextZIndex }
        },
        nextZIndex: state.nextZIndex + 1
    })),
    moveWindow: (id, x, y) => set((state) => ({
        windows: {
            ...state.windows,
            [id]: { ...state.windows[id],x, y },
        },
    })),
    minimiseWindow: (id) => set((state) => ({
        windows: {
            ...state.windows,
            [id]: {...state.windows[id], minimised: !state.windows[id].minimised,}
        }
    })),
    maximiseWindow: (id) => set((state) => {
    const isCurrentlyMaximised = state.windows[id].maximised
    const preMaxX = state.windows[id].x
    const preMaxY = state.windows[id].y
    const preMaxWidth = state.windows[id].width
    const preMaxHeight = state.windows[id].height
    
    let newX, newY, newWidth, newHeight, newPreMaxX, newPreMaxY, newPreMaxWidth, newPreMaxHeight
    
    if (isCurrentlyMaximised) {
        // Unmaximize — restore from preMax
        newX = state.windows[id].preMaxX
        newY = state.windows[id].preMaxY
        newWidth = state.windows[id].preMaxWidth
        newHeight = state.windows[id].preMaxHeight
        newPreMaxX = preMaxX
        newPreMaxY = preMaxY
        newPreMaxWidth = preMaxWidth
        newPreMaxHeight = preMaxHeight
    } else {
        // Maximize — save current and expand
        newX = 0
        newY = 0
        newWidth = window.innerWidth
        newHeight = window.innerHeight - 40
        newPreMaxX = preMaxX
        newPreMaxY = preMaxY
        newPreMaxWidth = preMaxWidth
        newPreMaxHeight = preMaxHeight
    }
    
    return {
        windows: {
            ...state.windows,
            [id]: {
                ...state.windows[id],
                maximised: !isCurrentlyMaximised,
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight,
                preMaxX: newPreMaxX,
                preMaxY: newPreMaxY,
                preMaxWidth: newPreMaxWidth,
                preMaxHeight: newPreMaxHeight,
            }
        }
    }
})
}))
