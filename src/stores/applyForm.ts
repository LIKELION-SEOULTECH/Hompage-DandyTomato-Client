import { create } from 'zustand';

interface ApplyFormData {
    name: string;
    studentId: string;
    department: string;
    phone: string;
    email: string;
    selectedPart: string;
    answers: string[];
    portfolioLinks: string[];
}

interface ApplyFormStore {
    formData: ApplyFormData;
    updateFormData: (data: Partial<ApplyFormData>) => void;
    updateAnswer: (index: number, answer: string) => void;
    updatePortfolioLink: (index: number, link: string) => void;
    resetFormData: () => void;
}

const defaultFormData: ApplyFormData = {
    name: '',
    studentId: '',
    department: '',
    phone: '',
    email: '',
    selectedPart: '기획 PM',
    answers: [],
    portfolioLinks: Array(3).fill(''),
};

export const useApplyFormStore = create<ApplyFormStore>((set) => ({
    formData: defaultFormData,
    
    updateFormData: (data) => 
        set((state) => ({
            formData: { ...state.formData, ...data }
        })),
    
    updateAnswer: (index, answer) =>
        set((state) => {
            const newAnswers = [...state.formData.answers];
            newAnswers[index] = answer;
            return {
                formData: { ...state.formData, answers: newAnswers }
            };
        }),
    
    updatePortfolioLink: (index, link) =>
        set((state) => {
            const newPortfolioLinks = [...state.formData.portfolioLinks];
            newPortfolioLinks[index] = link;
            return {
                formData: { ...state.formData, portfolioLinks: newPortfolioLinks }
            };
        }),
    
    resetFormData: () => set({ formData: defaultFormData }),
})); 