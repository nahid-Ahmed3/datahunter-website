import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataHunter - Discover Amazing Apps & Stay Updated",
  description: "Your ultimate destination for the latest applications and technology news. Download premium apps and read the most up-to-date articles in the tech world.",
  keywords: ["DataHunter", "app downloads", "technology news", "software", "applications", "tech news"],
  authors: [{ name: "DataHunter Team" }],
  icons: {
    icon: "/datahunter-icon.png",
    apple: "/datahunter-icon.png",
  },
  openGraph: {
    title: "DataHunter",
    description: "Discover amazing apps and stay updated with the latest technology news",
    url: "https://datahunter.example.com",
    siteName: "DataHunter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataHunter",
    description: "Discover amazing apps and stay updated with the latest technology news",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var noop = function() {};
                window.console.log = noop;
                window.console.error = noop;
                window.console.warn = noop;
                window.console.info = noop;
                window.console.debug = noop;
                window.console.trace = noop;
                window.console.table = noop;
              })();
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
