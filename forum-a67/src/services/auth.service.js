import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase-config";

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// export const registerUser = (email, password, displayName) => {
//   return createUserWithEmailAndPassword(auth, email, password).then(
//     (userCredential) => {
//       // Update the user's profile with the display name
//       return updateProfile(userCredential.user, {
//         displayName: displayName,
//       }).then(() => {
//         console.log("User profile updated:", userCredential.user);
//         return userCredential;
//       });
//     }
//   );
// };

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
