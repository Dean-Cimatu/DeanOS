import { create } from "zustand"

type WindowState ={
    id: string
    title: string
    x: number
    y: number
    width: number
    height: number
    zIndex: number
    minimised: boolean
}
type StoreType ={
    windows: Record<string, WindowState>
    nextZIndex: number
    openWindow (window : windowState): void
    closeWindow (id: string): void
    focusWindow(id: string): void
    moveWindow(id: string, x: number, y: number): void
    minimiseWindow(id: string): void
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
            [id]: { ...state.windows[id],x, y } },
        }
    }))
    
}))