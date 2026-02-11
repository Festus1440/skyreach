import type { Metadata } from "next"
import "./globals.css"
import { PostHogProvider } from "./providers"

export const metadata: Metadata = {
  metadataBase: new URL('https://skyreachair.com'),
  title: "Skyreach Heating & Cooling | Professional HVAC Services",
  description: "Skyreach Heating & Cooling provides professional HVAC services including AC repair, heating installation, and 24/7 emergency services.",
  keywords: "HVAC, air conditioning, heating, AC repair, furnace, cooling, emergency HVAC",
  openGraph: {
    title: "Skyreach Heating & Cooling",
    description: "Professional HVAC services for your home and business",
    type: "website",
    url: 'https://skyreachair.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
