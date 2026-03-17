import { create } from "zustand"

type AppWindow ={
    id : string
    title : string
    x: number
    y: number
    isMinimised: boolean
}
type StoreType ={
 windows: AppWindow[]
 openWindow: (window: AppWindow) => void
 closeWindow: (id: string) => void
 minimiseWindow: (id: string) => void
}

export const useWindowStore = create<StoreType>((set) =>({
    windows: [] as AppWindow[],
    openWindow: (window) => set((state) => ({
        windows: [...state.windows, window]
    })),
    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter( w => w.id !==id)
    })),
    minimiseWindow: (id) => set((state) => ({
        windows: state.windows.map(w=>
            w.id === id? { ...w, isMinimised: true} :w
        )
    })),

}))