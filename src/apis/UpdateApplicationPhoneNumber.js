import { fireDB } from '../firebaseConfig'; // Import Firebase config
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

export const updateApplicationPhoneNumber = async (userId, newPhoneNumber) => {
    try {
        const applicationsRef = collection(fireDB, "applications");
        const q = query(
            applicationsRef,
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);

        // Update the phone number in all applications related to the user
        querySnapshot.forEach(async (docSnap) => {
            await updateDoc(docSnap.ref, {
                phoneNumber: newPhoneNumber,
            });
        });
        console.log("Phone number updated in applications!");
    } catch (error) {
        console.error("Error updating phone number in applications:", error);
    }
};
