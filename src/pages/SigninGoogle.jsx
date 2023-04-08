import { Box, Button, Stack } from "@mui/material";
import { auth, googleProvider } from "../firebase/config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { GitHub, Google } from "@mui/icons-material";
export default function SigninGoogle() {
  const provider = new GithubAuthProvider();
  provider.addScope("repo");
  provider.setCustomParameters({
    allow_signup: "false",
  });
  const GoogleSignFunc = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const singinWithGitHub = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode);
      });
  };
  return (
    <Stack sx={{my:2}}>
        <Button
          onClick={() => {
            GoogleSignFunc();
          }}
          variant="outlined"
          sx={{ textTransform: "capitalize" ,my:1}}
        >
          <Google sx={{ mr: 1 }} />
          log in with google
        </Button>
        <Button
          onClick={() => {
            singinWithGitHub();
          }}
          sx={{ textTransform: "capitalize" ,my:1}}
          variant="outlined"
        >
          <GitHub sx={{ mr: 1 }} />
          log in with Github
        </Button>
    </Stack>
  );
}
