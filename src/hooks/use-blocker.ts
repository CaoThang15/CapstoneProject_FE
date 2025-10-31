import React from "react";
import { useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router";

export const useBlocker = (blocker: (tx: any) => void, when = true) => {
    const { navigator }: any = React.useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const push = navigator.push;
        const replace = navigator.replace;

        const patch = (method: any) => {
            return (...args: any[]) => {
                const tx = { retry: () => method.apply(navigator, args) };
                blocker(tx);
            };
        };

        navigator.push = patch(push);
        navigator.replace = patch(replace);

        return () => {
            navigator.push = push;
            navigator.replace = replace;
        };
    }, [navigator, blocker, when]);
};
