import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export const metadata = {
  title: "Destiny Guardians Social",
  description: "Connect with fellow Guardians and share your adventures",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-destiny-dark text-white min-h-screen">
          <header className="bg-gray-900 border-b border-destiny-blue p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-destiny-gold">
                Destiny Guardians
              </Link>
              
              <div className="flex gap-4 items-center">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton>
                    <button className="bg-destiny-blue text-white rounded px-4 py-2 hover:bg-blue-600 transition">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                
                <SignedIn>
                  <Link href="/profile" className="hover:text-destiny-gold transition">
                    My Profile
                  </Link>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          
          <main className="max-w-6xl mx-auto p-6">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}