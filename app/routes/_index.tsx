import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { redirect, type LoaderFunction, type V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  console.log('userId (Roy): ', userId); // THIS RETURNS NULL even though I am signed in(?) (see client side below)

  // If including this, I am redirected the sign in page, with the following message:
  //   The <SignUp/> and <SignIn/> components cannot render when a user is already signed in, unless the application allows multiple sessions. Since a user is signed in and this application only allows a single session, Clerk is redirecting to the Home URL instead.
  // (This notice only appears in development)
  if (!userId) {
    return redirect("/sign-in");
  }
  return {};
}

export default function Index() {

  // ON THE CLIENT SIDE, I AM SHOWN AS SIGNED IN
  return (
    <div>
      <SignedIn>
        <h1>Index route</h1>
        <p>You are signed in!</p>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
