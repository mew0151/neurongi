// "use client";

import "@/styles/components/home/webLanding.scss";
import AppMain from "./AppMain";

// let deferredPrompt: any;

export default function WebLanding() {
    // window.addEventListener("beforeinstallprompt", (e) => {
    //     e.preventDefault();
    //     deferredPrompt = e;
    // });
    // const handleInstall = async () => {
    //     if (deferredPrompt) {
    //         deferredPrompt.prompt();
    //         const { outcome } = await deferredPrompt.userChoice;
    //         console.log("User response to install:", outcome);
    //         deferredPrompt = null;
    //     }
    // };
    return (
        <div className="web-landing">
            <AppMain />
        </div>
    );
}
