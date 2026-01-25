import { create } from 'zustand';

interface PrepData {
    point1: string;
    reason: string;
    example: string;
    point2: string;
}

interface PrepStore {
    currentStep: number;
    data: PrepData;
    setStep: (step: number) => void;
    updateData: (data: Partial<PrepData>) => void;
    reset: () => void;
}

const initialData: PrepData = {
    point1: '',
    reason: '',
    example: '',
    point2: '',
};

export const usePrepStore = create<PrepStore>((set) => ({
    currentStep: 1,
    data: initialData,
    setStep: (step) => set({ currentStep: step }),
    updateData: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
    reset: () => set({ currentStep: 1, data: initialData }),
}));
