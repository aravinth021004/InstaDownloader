import { Post } from "./Post";

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profilePicture?: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[]; // relation
}
