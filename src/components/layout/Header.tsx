"use client";
import "@/styles/components/header.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

type HeaderProps = {
    pageName: string;
};

const Header = ({ pageName }: HeaderProps) => {
    const router = useRouter();

    const handleSelectFolder = (folder: string) => {
        router.push(`/${folder}`, { scroll: false });
    };
    return (
        <div className="header">
            <Image
                src="/images/icon/arrow-left.svg"
                alt="클릭 시 이전 페이지로 이동"
                width={32}
                height={32}
                onClick={() => router.back()}
            />
            <p className="weight-semibold size-m">{pageName}</p>

            <div
                className="sub-btn"
                onClick={() => handleSelectFolder("add-item")}
            >
                add-item
            </div>
        </div>
    );
};

export default Header;
