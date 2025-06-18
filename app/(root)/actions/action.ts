import { PrismaClient } from "@/generated/prisma";
import { User } from "@clerk/backend"
import VideoData from "../Types/VideoData";

const prisma = new PrismaClient();
export async function findUserById(userId: string) {

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (user) return true;
    return false;

}

export async function createUser(user: User) {

    console.log("Creating user in database:", user.id);

    await prisma.user.create({
        data: {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            profilePicture: user.imageUrl || "",
            createdAt: new Date(),
            updatedAt: new Date(),
            posts: {
                create: [] // Initialize with an empty array
            }
        }
    })
}

export async function createPost(userId: string, post: VideoData) {

    await prisma.post.create({
        data: {
            username: post.username,
            name: post.name,
            profilePicture: post.profilePicture,
            description: post.description,
            image: post.image,
            likes: post.likes,
            comments: post.comments,
            numOfYears: post.numOfYears,
            videoUrl: post.videoUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId
        }

    })
}

export async function getAllPosts(userId: string) {
    const posts = await prisma.post.findMany({
        where: {
            userId: userId
        }
    })
    return posts;
}