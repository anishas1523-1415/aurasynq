import "./globals.css";
import { Inter } from "next/font/google";
import AuraDial from "@/components/AuraDial";
import MiniPlayer from "@/components/MiniPlayer";
import { AudioProvider } from "@/contexts/AudioContext";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AuraSynq",
  description: "Immersive Social Music App",
  manifest: "/manifest.json",
  themeColor: "#050505",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AudioProvider>
            <div className="app-container">
              <main className="main-content" style={{ paddingBottom: '0' }}>
                {children}
              </main>
              <MiniPlayer />
              <AuraDial />
            </div>
          </AudioProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
