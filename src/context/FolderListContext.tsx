"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Folder = {
    id: string;
    name: string;
};

type FolderListContextType = {
    folders: Folder[];
    addFolder: (name: string) => void;
    updateFolder: (id: string, name: string) => void;
    deleteFolder: (id: string) => void;
};

const FolderListContext = createContext<FolderListContextType | null>(null);

export const useFolderList = () => {
    const context = useContext(FolderListContext);
    if (!context)
        throw new Error("useFolderList must be used within FolderListProvider");
    return context;
};

export const FolderListProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [folders, setFolders] = useState<Folder[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("folders");
        if (saved) setFolders(JSON.parse(saved));
    }, []);

    const save = (next: Folder[]) => {
        setFolders(next);
        localStorage.setItem("folders", JSON.stringify(next));
    };

    const addFolder = (name: string) => {
        save([...folders, { id: crypto.randomUUID(), name }]);
    };

    const updateFolder = (id: string, name: string) => {
        save(folders.map((f) => (f.id === id ? { ...f, name } : f)));
    };

    const deleteFolder = (id: string) => {
        save(folders.filter((f) => f.id !== id));
    };

    return (
        <FolderListContext.Provider
            value={{ folders, addFolder, updateFolder, deleteFolder }}
        >
            {children}
        </FolderListContext.Provider>
    );
};
