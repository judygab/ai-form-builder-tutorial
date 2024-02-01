import Header from "@/components/ui/header";
import { SessionProvider } from 'next-auth/react';
import LandingPage from './landing-page';

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <LandingPage />
      </main>
    </SessionProvider>
  )
}
