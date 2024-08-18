import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {ExperimentPanel} from "@/components/ExperimentPanel";
import { experiments} from "@/app/experiments";
import {TransitionContextProvider, TransitionWrapper} from "@/components/TransitionWrapper";
import {Leva} from "@/components/Leva";


const font = Plus_Jakarta_Sans({ 
   subsets: ["latin"], 
   variable: '--main-font',
 });

export const metadata: Metadata = {
  title: "Paweł Bród Experiments",
  description: "Space for training / experiments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
      <TransitionContextProvider>
        <ExperimentPanel experiments={experiments}/>
        <TransitionWrapper>
            <main>
              {children}
              <Leva/>
            </main>
        </TransitionWrapper>
      </TransitionContextProvider>
      </body>
    </html>
  );
}

