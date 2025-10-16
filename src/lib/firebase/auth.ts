import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

// export class AuthService {
//   // Sign in with email and password
//   // static async signIn(email: string, password: string) {
//   //   try {
//   //     const userCredential = await signInWithEmailAndPassword(
//   //       auth,
//   //       email,
//   //       password
//   //     );

//   //     console.log(email, password);

//   //     const token = await userCredential.user.getIdToken();
//   //     return { user: userCredential.user, token };
//   //   } catch (error: any) {
//   //     throw new Error(error.message);
//   //   }
//   // }

//   // Sign up with email and password
//   static async signUp(email: string, password: string, displayName?: string) {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       if (displayName) {
//         await updateProfile(userCredential.user, { displayName });
//       }

//       const token = await userCredential.user.getIdToken();
//       return { user: userCredential.user, token };
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }

//   // Sign out
//   static async signOut() {
//     try {
//       await signOut(auth);
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }

//   // Get current user token
//   static async getCurrentUserToken() {
//     const user = auth.currentUser;
//     if (!user) return null;
//     return await user.getIdToken();
//   }

//   // Listen to auth state changes
//   static onAuthChange(callback: (user: User | null) => void) {
//     return onAuthStateChanged(auth, callback);
//   }

//   // Send password reset email
//   static async resetPassword(email: string) {
//     try {
//       await sendPasswordResetEmail(auth, email);
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }
// }

export const AuthService = {
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      return { user: userCredential.user, token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async signOut() {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
