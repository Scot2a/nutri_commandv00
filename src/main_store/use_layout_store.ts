import { create } from "zustand";

interface layoutState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: ()=> void;

}

export const useLayoutStore = create<layoutState>((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set ((state) => ({ isSidebarOpen: !state.isSidebarOpen})),
    closeSidebar: () => set ({ isSidebarOpen: false }),
    openSidebar: () => set ({ isSidebarOpen: true}),

}))

