import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="card">
            <h2 className="text-3xl font-bold text-center mb-6 text-destiny-gold">
            Welcome Back, Guardian
            </h2>
            <SignIn />
        </div>
        </div>
    );
}