import { db } from "@/utils/dbConn";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SinglePostPage({ params }) {
    const { id } = params;
    
    // post from database
    const post = (
        await db.query("SELECT * FROM posts WHERE id = $1", [id])
    ).rows[0];
    
    // show not found if post is non existent
    if (!post) {
        notFound();
    }
    
    // get username of whoever posted
    const profile = (
        await db.query("SELECT username FROM profiles WHERE clerk_user_id = $1", [post.clerk_user_id])
    ).rows[0];
    
    return (
        <div className="max-w-3xl mx-auto">
        <Link href="/profile" className="text-destiny-blue hover:text-destiny-gold mb-4 inline-block">
            ← Back to Profile
        </Link>
        
        <div className="card">
            <h1 className="text-4xl font-bold mb-4 text-destiny-gold">
            {post.title}
            </h1>
            
            <p className="text-gray-400 text-sm mb-6">
            Posted by {profile?.username || "Guardian"} on {new Date(post.created_at).toLocaleDateString()}
            </p>
            
            <p className="text-gray-300 text-lg whitespace-pre-wrap">
            {post.content}
            </p>
        </div>
        </div>
    );
}