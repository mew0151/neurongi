import { useEffect, useState } from "react";

export type Folder = {
    id: string;
    name: string;
};

export function useFolderList() {
    const [folders, setFolders] = useState<Folder[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("folders");
        if (saved) setFolders(JSON.parse(saved));
    }, []);

    const save = (next: Folder[]) => {
        setFolders(next);
        localStorage.setItem("folders", JSON.stringify(next));
    };

    return {
        folders,
        addFolder: (name: string) =>
            save([...folders, { id: crypto.randomUUID(), name }]),
        updateFolder: (id: string, name: string) =>
            save(folders.map((f) => (f.id === id ? { ...f, name } : f))),
        deleteFolder: (id: string) => save(folders.filter((f) => f.id !== id))
    };
}
