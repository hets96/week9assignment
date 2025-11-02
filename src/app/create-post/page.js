import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function CreatePost() {
    const { userId } = await auth();
    
    async function handlePost(formData) {
        "use server";
        const { title, content } = Object.fromEntries(formData);
        
        await db.query(
        "INSERT INTO posts (clerk_user_id, title, content) VALUES ($1, $2, $3)", 
        [userId, title, content]
        );
        
        revalidatePath("/profile");
        redirect("/profile");
    }
    
    return (
        <div className="max-w-2xl mx-auto">
        <div className="card">
            <h1 className="text-3xl font-bold mb-6 text-destiny-gold">
            Share Your Adventure
            </h1>
            
            <form action={handlePost} className="space-y-4">
            <div>
                <label htmlFor="title" className="block mb-2 font-semibold">
                Title
                </label>
                <input 
                type="text" 
                name="title" 
                id="title"
                required
                className="input-field"
                />
            </div>
            
            <div>
                <label htmlFor="content" className="block mb-2 font-semibold">
                Content
                </label>
                <textarea 
                name="content" 
                id="content"
                required
                rows="6"
                className="textarea-field"
                />
            </div>
            
            <button type="submit" className="btn-gold w-full">
                Post Adventure
            </button>
            </form>
        </div>
        </div>
    );
}