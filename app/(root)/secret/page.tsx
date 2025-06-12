import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Secret() {

    // const { userId } = await auth();

    // console.log(userId);

      const user = await currentUser()

    // console.log(user);


    return (
        <div>
            This is secret page... {user?.firstName}
        </div>
    );
}