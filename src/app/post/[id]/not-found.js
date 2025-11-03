import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center py-20">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold mb-4 text-destiny-gold">
            Post Not Found
        </h1>
        <p className="text-xl text-gray-300 mb-8">
            Sorry! We couldnt find that post.
        </p>
        <Link href="/profile">
            <button className="btn-primary">
            Go back to Profile
            </button>
        </Link>
        </div>
    );
}