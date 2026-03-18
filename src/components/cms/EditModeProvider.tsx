import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
  saveChanges: () => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const saveChanges = useCallback(() => {
    setHasChanges(false);
    // Trigger a custom event to notify components to save
    window.dispatchEvent(new CustomEvent('portfolio-save'));
  }, []);

  return (
    <EditModeContext.Provider value={{
      isEditMode,
      toggleEditMode,
      hasChanges,
      setHasChanges,
      saveChanges,
    }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
}
