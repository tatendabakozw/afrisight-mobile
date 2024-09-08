import React, { createContext, useContext } from 'react';

interface BottomSheetContextType {
    setHeight: (height: number) => void;
}

const CXBottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const useBottomSheetContext = () => {
    const context = useContext(CXBottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheetContext must be used within a BottomSheetProvider');
    }
    return context;
};

export const CXBottomSheetProvider = CXBottomSheetContext.Provider;