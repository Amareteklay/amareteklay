"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

type SpatialWrapperProps = {
    children: ReactNode;
};

export default function SpatialWrapper({ children }: SpatialWrapperProps) {
    useEffect(() => {
        // Add the class to body when mounted
        document.body.classList.add("spatial-mode");

        // Remove when unmounted
        return () => {
            document.body.classList.remove("spatial-mode");
        };
    }, []);

    return <>{children}</>;
}
