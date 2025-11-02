import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold mb-6 text-destiny-gold">
        Welcome, Guardian
      </h1>
      
      <p className="text-xl mb-8 text-gray-300">
        Share your adventures, connect with fellow Guardians, and build your legend
      </p>
      
      <SignedOut>
        <div className="space-y-4">
          <p className="text-lg text-gray-400">
            Sign in to join the community and start sharing your Destiny journey
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in">
              <button className="btn-primary">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="btn-gold">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="space-y-6">
          <p className="text-lg text-gray-400">
            Ready to share your latest triumph?
          </p>
          <Link href="/profile">
            <button className="btn-gold text-lg px-8 py-3">
              Go to My Profile
            </button>
          </Link>
        </div>
      </SignedIn>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="card">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-semibold mb-2 text-destiny-blue">Create Your Profile</h3>
          <p className="text-gray-400">Build your Guardian identity with a custom biography</p>
        </div>
        
        <div className="card">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2 text-destiny-blue">Share Your Adventures</h3>
          <p className="text-gray-400">Post about your raids, strikes, and crucible victories</p>
        </div>
        
        <div className="card">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2 text-destiny-blue">Connect with Guardians</h3>
          <p className="text-gray-400">Find fireteam members and share your stories</p>
        </div>
      </div>
    </div>
  );
}