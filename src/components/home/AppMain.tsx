// "use client";

import "@/styles/components/home/appMain.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AppMain() {
    const router = useRouter();

    const handleSelectFolder = (folder: string) => {
        console.log(folder);
        router.push(`/${folder}`, { scroll: false });
    };

    return (
        <div className="app-main">
            <div className="app-main-container">
                <div className="folders">
                    <div
                        className="folder-component"
                        onClick={() => handleSelectFolder("all-items")}
                    >
                        <Image
                            src="/images/folder.png"
                            alt="folder img"
                            width={88}
                            height={72}
                            priority={true}
                        />
                        <p className="weight-semibold">folder-123</p>
                    </div>
                </div>

                <div className="folder-controls">
                    <div className="folder-component">
                        <Image
                            src="/images/foldercat.png"
                            alt="folder cat img"
                            width={76}
                            height={76}
                            priority={true}
                        />
                        <p className="weight-semibold">folder cat</p>
                    </div>
                    <div className="folder-component">
                        <Image
                            src="/images/add-folder.png"
                            alt="add folder img"
                            width={72}
                            height={72}
                            priority={true}
                        />
                        <p className="weight-semibold">add folder</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
