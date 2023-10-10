// actions.ts
export const increment = () => ({
  type: "INCREMENT" as const,
});

export const decrement = () => ({
  type: "DECREMENT" as const,
});

export type ActionTypes = ReturnType<typeof increment | typeof decrement>;
