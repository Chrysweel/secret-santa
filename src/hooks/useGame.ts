import { useLocalGame } from './useLocalGame';
import { useFirebaseGame } from './useFirebaseGame';

export const useGame = () => {
    // Check environment variable. Note: Vite env vars are strings.
    const useFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';

    // We can't conditionally call hooks, so we must call both or use a component wrapper.
    // However, calling both might trigger side effects (firebase listeners).
    // Better way: Render logic or separate components.
    // BUT, if we want a single 'useGame' hook, we have a problem with Rules of Hooks if we return different hooks.
    // Actually, we CANNOT conditionally call hooks.

    // Alternative:
    // Create a Context? Or simply instantiate the one we want?
    // Start with a simple component-level split?
    // Or... we can call both hooks but disable the firebase one if not active? 
    // `useFirebaseGame` takes an `enabled` prop?

    // Let's modify useFirebaseGame to accept an `enabled` flag.

    return useFirebase ? useFirebaseGame() : useLocalGame();
    // THIS VIOLATES RULES OF HOOKS if the condition changes (it won't, it's env var).
    // BUT React warns against it.

    // Safe approach: create two separate hooks and let the component choose, or modify useGame to be safe.
    // Since VITE_USE_FIREBASE is constant at build time (mostly) or init time, it strictly won't change during render lifecycle.
    // It is technically unsafe but practically works if constant.
    // A cleaner way for "The Right Way"™: 
    // Create a Context provider that checks the flag once and renders <LocalGameProvider> or <FirebaseGameProvider>.
    // Then useGame context.

    // For this prototype/MVP, and since the user asked for a "simple parameter", 
    // I will stick to the conditional return because the env var IS constant for the session.
    // If linter complains, I'll suppression it.
};
