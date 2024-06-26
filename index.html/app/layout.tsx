import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import React, { Suspense } from "react";
import Home1 from "@/components/layout/home";
import { Provider } from "react-redux";
import { store } from '../redux/store';
import { ReduxStoreProvider } from "./ReduxStoreProvider";

export const metadata = {
  title: "Food Management - Leading to a no hunger world",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxStoreProvider>
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        {/* <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" /> */}
        
      
        <Suspense fallback="...">
          <Nav />

        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Home1 />
        <Footer />
        <Analytics />
    
      </body>
    </html>
    </ReduxStoreProvider>
  );
}
