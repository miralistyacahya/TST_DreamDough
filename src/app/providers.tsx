"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { usePathname, useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const path = usePathname();

  React.useEffect(() => {
    if (path === "/") {
      router.push("/cakes");
    }
  }, []);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}