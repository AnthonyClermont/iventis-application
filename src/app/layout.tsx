import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const pressStart = Space_Grotesk({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Pokemon Assignment",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStart.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <MaxWidthWrapper>
            <Header />
            
            {children}
          </MaxWidthWrapper>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
