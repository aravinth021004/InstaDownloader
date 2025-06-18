"use server";
import { PrismaClient } from "@/generated/prisma";
import { User } from "@clerk/backend"
import VideoData from "../Types/VideoData";
import { revalidatePath } from "next/cache";

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

    const tempPost = await getPostByVideoUrl(post.videoUrl);

    if(tempPost) return;

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

export async function deletePostByResult(result: VideoData | null) {

    await prisma.post.delete({
        where: {
            videoUrl: result?.videoUrl,
        }
    })
    revalidatePath('/')
}

export async function getPostByVideoUrl(videoUrl: string) {
    const post = await prisma.post.findUnique({
        where: {
            videoUrl: videoUrl
        }
    })
    return post;
}