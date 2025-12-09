export interface User {
    id: string;
    name: string;
}

export interface Assignment {
    giver: User;
    receiver: User;
}

/**
 * Performs the Secret Santa assignment.
 * @param users - List of participants.
 * @returns List of assignments.
 * @throws {Error} If there are fewer than 2 users.
 */
export const assignSecretSanta = (users: User[]): Assignment[] => {
    if (!users || users.length < 2) {
        throw new Error("Necesitas al menos 2 participantes.");
    }

    // Clone and shuffle users
    const shuffled = [...users].sort(() => Math.random() - 0.5);

    // Assign each user to the next one in the circle
    const assignments: Assignment[] = shuffled.map((giver, index) => {
        const receiver = shuffled[(index + 1) % shuffled.length];
        return { giver, receiver };
    });

    return assignments.sort(() => Math.random() - 0.5);
};
