import { User } from "@clerk/backend";

export interface Post {
  id: string;
  username: string;
  name: string;
  profilePicture: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  numOfYears: number;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;   // foreign key
  user?: User;      // relation
}
