import { UserAccount } from "@/app/types/user";

export function normalizeUserAccount(raw: any): UserAccount {
  // Map coms and user arrays: form -> type
  const mapComs = (arr: any[] = []) =>
    arr.map((c) => ({
      ...c,
      type: c.form || c.type || "other",
      nmbr: c.nmbr,
    }));

  return {
    ...raw,
    coms: mapComs(raw.coms),
    user: mapComs(raw.user),
    feat: raw.feat || {},
    onbd: raw.onbd || {},
    meta: raw.meta || { name: "" },
    actv: raw.actv !== undefined ? raw.actv : true,
    role: raw.role || "user",
    roletype: raw.roletype,
    avtr: raw.avtr?.link || raw.avatar?.link || raw.avtr || undefined,
  };
} 