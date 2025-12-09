import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, orderBy, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { assignSecretSanta, User, Assignment } from '../utils/secretSanta';

// Using a fixed game ID for simplicity as per plan, or ideally a dynamic one.
// For now, we'll use a constant document ID 'default_game' in a 'games' collection.
const GAME_ID = 'default_game';

export const useFirebaseGame = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [revealed, setRevealed] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    // Subscribe to users
    useEffect(() => {
        const usersRef = collection(db, 'games', GAME_ID, 'users');
        const q = query(usersRef, orderBy('createdAt'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as User[];
            setUsers(usersData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Subscribe to assignments and revealed state
    useEffect(() => {
        const gameRef = doc(db, 'games', GAME_ID);
        const unsubscribe = onSnapshot(gameRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setAssignments((data.assignments as Assignment[]) || []);
                setRevealed(new Set((data.revealed as string[]) || []));
            }
        }, (error) => {
            console.error("Error fetching game data:", error);
        });

        return () => unsubscribe();
    }, []);

    const addUser = async (name: string) => {
        try {
            const usersRef = collection(db, 'games', GAME_ID, 'users');
            await addDoc(usersRef, {
                name,
                createdAt: new Date().toISOString()
            });
        } catch (error: any) {
            console.error("Error adding user:", error);
            alert("Error al añadir usuario: " + error.message);
        }
    };

    const removeUser = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'games', GAME_ID, 'users', id));
        } catch (error: any) {
            console.error("Error removing user:", error);
            alert("Error al eliminar usuario: " + error.message);
        }
    };

    const assign = async () => {
        try {
            const newAssignments = assignSecretSanta(users);
            // Save assignments to the game document and reset revealed
            const gameRef = doc(db, 'games', GAME_ID);
            // Use setDoc with merge 
            await setDoc(gameRef, {
                assignments: newAssignments,
                revealed: []
            }, { merge: true });
        } catch (error: any) {
            alert(error.message);
        }
    };

    const reset = async () => {
        try {
            const gameRef = doc(db, 'games', GAME_ID);
            await setDoc(gameRef, {
                assignments: [],
                revealed: []
            }, { merge: true });
        } catch (error) {
            console.error("Error resetting game:", error);
        }
    };

    const markAsRevealed = async (userId: string) => {
        try {
            const gameRef = doc(db, 'games', GAME_ID);
            await updateDoc(gameRef, {
                revealed: arrayUnion(userId)
            });
        } catch (error) {
            console.error("Error marking as revealed:", error);
        }
    };

    return {
        users,
        assignments,
        revealed,
        addUser,
        removeUser,
        assign,
        reset,
        markAsRevealed,
        loading
    };
};
