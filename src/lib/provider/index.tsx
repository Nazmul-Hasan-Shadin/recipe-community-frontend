"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import UserProvider from "@/src/context/user.provider";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  // Set the initial theme to 'light'
  const themePropsWithLight = {
    ...themeProps,
    defaultTheme: "light", // Set default theme to light
    enableSystem: false, // Disable system preference
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themePropsWithLight}>
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
