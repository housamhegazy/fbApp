import { createSlice } from '@reduxjs/toolkit'
import { getDownloadURL, uploadBytes } from 'firebase/storage';

const initialState = {
  profileImage: null,
  profileUrl : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
}

export const counterSlice = createSlice({
  
  name: 'counter',
  initialState,
  reducers: {
    
    setProfileImage: (state,action) => {
      if(state.profileImage === null){
        return;
      }
      state.profileImage = action.payload
    },


    sendProfileImage: (state,action) => {
      uploadBytes(action.payload, state.profileImage)
      .then((snapshot) => {
        // هنا بنحصل على الرابط حتى يحدث تحديث فوري للصوره
        // getDownloadURL(ref(storage, `profile/profimage.jpg`)).then((url) => {
        //   setprofileUrl(url);
        // });
      })
      .then(() => console.log("uploaded"));
    },
    importProfileImage: (state, action) => {
      // state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfileImage,sendProfileImage } = counterSlice.actions

export default counterSlice.reducer