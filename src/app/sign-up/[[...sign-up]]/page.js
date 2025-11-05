import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="card">
            <h2 className="text-3xl font-bold text-center mb-6 text-destiny-gold">
            Join the Guardians
            </h2>
            <SignUp />
        </div>
        </div>
    );
}