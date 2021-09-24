// Snoozing in TS is dumb, make a utility
export const snooze = async(ms: number) => new Promise(resolve => setTimeout(resolve, ms));
