import { db } from "@/utils/dbConn";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreatePostDialog from "@/app/create-post/page";

export default async function ProfilePage() {
    const { userId } = await auth();
    
    //get user's profile
    const profile = (
        await db.query("SELECT * FROM profiles WHERE clerk_user_id = $1", [userId])
    ).rows[0];
    
    // if no profile, redirect to create one
    if (!profile) {
        redirect("/create-profile");
    }
    
    // get user's posts
    const posts = (
        await db.query(
        "SELECT * FROM posts WHERE clerk_user_id = $1 ORDER BY created_at DESC", 
        [userId]
        )
    ).rows;
    
    return (
        <div>
        <div className="card mb-8">
            <h1 className="text-4xl font-bold text-destiny-gold mb-2">
            {profile.username}
            </h1>
            <p className="text-gray-400 text-sm mb-4">
            Guardian since {new Date(profile.created_at).toLocaleDateString()}
            </p>
            
            <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-destiny-blue">Biography</h2>
            <p className="text-gray-300">{profile.bio}</p>
            </div>
        </div>
        
        <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-destiny-gold">My Adventures</h2>
            <CreatePostDialog />
        </div>
        
        <div className="space-y-6">
            {posts.length === 0 ? (
            <div className="card text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                No posts yet. Share your first adventure!
                </p>
            </div>
            ) : (
            posts.map((post) => (
                <div key={post.id} className="card">
                <h3 className="text-2xl font-bold mb-2 text-destiny-blue">
                    {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                    Posted on {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-300">{post.content}</p>
                </div>
            ))
            )}
        </div>
        </div>
    );
}