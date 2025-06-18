import { currentUser } from '@clerk/nextjs/server'
import { createUser, findUserById } from './actions/action';

export default async function Home() {

  const user = await currentUser();


  if(!user) {
    return (
      <div className="justify-center text-center">
        <h1 className="text-2xl font-bold">Welcome to the App!</h1>
        <p>Please log in to continue.</p>
      </div>
    );
  }

  const isVerified = await findUserById(user.id);

  if(!isVerified) {
    await createUser(user);
  }

  return (
    
    <div className="justify-center text-center ">
      Welcome to the App, {user.primaryEmailAddress?.emailAddress || 'User'}
    </div>

  );
}
