import { create } from 'zustand';

export const useBudgetStore = create((set) => ({
  budget: 0,
  setBudget: (value) => set({ budget: value }),
}));