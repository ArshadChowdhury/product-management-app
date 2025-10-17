import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

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
