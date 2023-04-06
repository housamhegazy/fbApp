import { auth } from "firebase/config";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

const Url = 'http://localhost:5000'

const storage = getStorage();
const [user, loading, error] = useAuthState(auth);

export const listRef = ref(storage, `postImage/${user.uid}/`);
const list = listAll(listRef).then((res) => {
    res.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        if (!imageList.includes(url)) {
          setimageList((prev) => [...prev, url]);
        }
      });
    });
  });