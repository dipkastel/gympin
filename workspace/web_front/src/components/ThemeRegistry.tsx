"use client";
import {JSX, ReactNode} from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {ThemeProvider} from "@mui/material/styles";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {GympinTheme} from "@/lib/theme";

interface ThemeRegistryProps {
    children: ReactNode;
}

export default function ThemeRegistry({children}: ThemeRegistryProps): JSX.Element {
    return (
        <AppRouterCacheProvider options={{key: "muirtl", stylisPlugins: [prefixer, rtlPlugin]}}>
            <ThemeProvider theme={GympinTheme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
