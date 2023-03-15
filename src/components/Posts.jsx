
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import GetPosts from "./Getpost";

export default function Posts() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <GetPosts user={user}/>
  );
}
