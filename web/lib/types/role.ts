export type Role = "READ_ONLY" | "READ_AND_WRITE";

export const toString = (p: Role) => {
  if (p === "READ_ONLY") {
    return "Read Only";
  }

  return "Read & Write";
};
