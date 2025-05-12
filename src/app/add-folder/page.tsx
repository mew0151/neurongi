"use client";

import Header from "@/components/layout/Header";
import { useFolderList } from "@/hooks/folderList";
import { useState } from "react";
import "@/styles/pages/add-folder.scss";
const FolderManager = () => {
    const { folders, addFolder, updateFolder, deleteFolder } = useFolderList();
    const [input, setInput] = useState("");

    return (
        <div className="add-folder">
            <Header pageName="add folder" />

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="새 폴더 이름"
            />
            <button
                onClick={() => {
                    addFolder(input);
                    setInput("");
                }}
            >
                추가
            </button>

            <ul>
                {folders.map((folder) => (
                    <li key={folder.id}>
                        {folder.name}
                        <button
                            onClick={() =>
                                updateFolder(
                                    folder.id,
                                    prompt(
                                        "수정...하시겟어요...?",
                                        folder.name
                                    ) || folder.name
                                )
                            }
                        >
                            ✏️
                        </button>
                        <button onClick={() => deleteFolder(folder.id)}>
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FolderManager;
