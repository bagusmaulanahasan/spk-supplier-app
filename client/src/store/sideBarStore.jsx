import { create } from "zustand";

const useSidebarStore = create((set) => ({
    isOpen: true,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (value) => set({ isOpen: value }),
}));

export default useSidebarStore;
