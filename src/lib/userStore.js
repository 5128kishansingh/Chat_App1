// this is state-management part of the app

import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null, isLoading: false }); // if uid is not provided then currentUser is set to null

        // other wise data of user with provided uid is fetched and set as current user
        try {

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false }); // is user exists 

            }
            else {
                set({ currentUser: null, isLoading: false })   // if user doesnot exists
            }
        } catch (err) {
            console.log(err) // if error occured then current user is set to null
            return set({ currentUser: null, isLoading: false });
        }
    }

}))