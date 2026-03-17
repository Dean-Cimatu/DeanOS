import { create } from 'zustand'

type SessionType={
    username: string,
    setUsername: (id: string) => void,
}

export const useSessionStore = create<SessionType>((set) => ({
    username: '',
    setUsername: (name) => set({username: name}),

}))