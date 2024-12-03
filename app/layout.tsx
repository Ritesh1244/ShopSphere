import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider
} from '@clerk/nextjs'
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from '@/providers/theme-provider'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce-Admin",
  description: "An ecommerce-admin pannelAn e-commerce admin panel is a centralized dashboard where administrators can manage product listings, process orders, track inventory, handle customer queries, and analyze sales data, ensuring efficient and streamlined online store operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}> 
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
          >
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
