import { currentUser } from "@clerk/nextjs/server";
import { createUser, findUserById, getAllPosts } from "./actions/action";
import { CardDemo } from "@/components/Card";
// import VideoData from "./Types/VideoData";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="justify-center text-center">
        <h1 className="text-2xl font-bold">Welcome to the App!</h1>
        <p>Please log in or sign up to continue.</p>
      </div>
    );
  }

  const isVerified = await findUserById(user.id);

  if (!isVerified) {
    await createUser(user);
  }

  const posts = await getAllPosts(user.id);

  return (
    <>
      <div className="justify-center text-center ">
        Welcome to the App, {user.firstName || "User"}
      </div>
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4">Number of Reels: {posts.length}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post.id}>
            <CardDemo
              result={{
                username: post.username,
                name: post.name,
                description: post.description,
                profilePicture: post.profilePicture,
                image: post.image,
                likes: post.likes,
                comments: post.comments,
                numOfYears: post.numOfYears,
                videoUrl: post.videoUrl,
              }}
            />
          </li>
        ))}
      </ul>

      </div>
      
    </>
  );
}
