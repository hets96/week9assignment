import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";

export default async function CreateProfile() {
    const { userId } = await auth();
    
    // Check if user already has a profile
    const user = (
        await db.query("SELECT * FROM profiles WHERE clerk_user_id = $1", [userId])
    ).rows[0];
    
    if (user) {
        return <p>Sorry! You already have a profile!</p>;
    }
    
    async function handleSubmit(formData) {
        "use server";
        const { username, bio } = Object.fromEntries(formData);
        await db.query(
        "INSERT INTO profiles (clerk_user_id, username, bio) VALUES ($1, $2, $3)",
        [userId, username, bio]
        );
    }
    
    return (
        <div className="max-w-2xl mx-auto">
        <div className="card">
            <h1 className="text-3xl font-bold mb-6 text-destiny-gold">
            Create Your Guardian Profile
            </h1>
            
            <form action={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="block mb-2 font-semibold">
                Guardian Name
                </label>
                <input 
                name="username" 
                id="username"
                required
                className="input-field"
                />
            </div>
            
            <div>
                <label htmlFor="bio" className="block mb-2 font-semibold">
                Biography
                </label>
                <textarea 
                name="bio" 
                id="bio"
                required
                rows="6"
                className="textarea-field"
                />
            </div>
            
            <button type="submit" className="btn-gold w-full">
                Create Profile
            </button>
            </form>
        </div>
        </div>
    );
}