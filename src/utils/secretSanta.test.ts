
import { describe, it, expect } from 'vitest';
import { assignSecretSanta } from './secretSanta';

describe('assignSecretSanta', () => {
    it('should throw error with less than 2 users', () => {
        expect(() => assignSecretSanta([])).toThrow();
        expect(() => assignSecretSanta([{ id: '1', name: 'A' }])).toThrow();
    });

    it('should assign a unique receiver to each user', () => {
        const users = [
            { id: '1', name: 'A' },
            { id: '2', name: 'B' },
            { id: '3', name: 'C' }
        ];
        const assignments = assignSecretSanta(users);

        expect(assignments).toHaveLength(users.length);

        const givers = assignments.map(a => a.giver.id);
        const receivers = assignments.map(a => a.receiver.id);

        // Each user is a giver exactly once
        expect(new Set(givers).size).toBe(users.length);
        // Each user is a receiver exactly once
        expect(new Set(receivers).size).toBe(users.length);

        // No one gives to themselves
        assignments.forEach(assignment => {
            expect(assignment.giver.id).not.toBe(assignment.receiver.id);
        });
    });

    it('should randomize the order of assignments (discovery order)', () => {
        const users = Array.from({ length: 10 }, (_, i) => ({ id: `${i}`, name: `User ${i}` }));

        // Run multiple times to ensure it's not just a fluke coincidence with the circle order
        let differentOrderCount = 0;
        const iterations = 20;

        for (let i = 0; i < iterations; i++) {
            const assignments = assignSecretSanta(users);

            // Reconstruct the "circle" order from the assignments
            // In the naive implementation, assignments[i].receiver is assignments[i+1].giver (roughly)
            // We want to check if the returned array order is DIFFERENT from the circle order

            // Let's check if the array is simply shifted by 1 (which is what the original implementation does effectively, 
            // since it returns the map of the shuffled array)

            // Actually, the original implementation:
            // shuffled = [A, B, C]
            // assignments[0] = {giver: A, receiver: B}
            // assignments[1] = {giver: B, receiver: C}
            // assignments[2] = {giver: C, receiver: A}
            // So assignments[i].receiver.id === assignments[i+1].giver.id is NOT true necessarily if shuffled differently?
            // Wait. 
            // assignments[0].receiver is B. assignments[1].giver is B.
            // So yes, in the original implementation, assignments[i].receiver === assignments[i+1].giver (with wrap around).

            let isSequential = true;
            for (let j = 0; j < assignments.length; j++) {
                const currentReceiverId = assignments[j].receiver.id;
                const nextGiverId = assignments[(j + 1) % assignments.length].giver.id;

                if (currentReceiverId !== nextGiverId) {
                    isSequential = false;
                    break;
                }
            }

            if (!isSequential) {
                differentOrderCount++;
            }
        }

        // We expect that MOST of the time, it is NOT sequential.
        // It's possible randomly it is, but very unlikely for 10 users.
        expect(differentOrderCount).toBeGreaterThan(0);
    });
});
