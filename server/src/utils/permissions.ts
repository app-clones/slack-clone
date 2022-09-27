import { ResolverUser } from "../types/types";

export const checkAuth = (user: ResolverUser) => {
    if (!user || !user.id) throw new Error("Unauthenticated");
};

export const checkAdmin = (user: ResolverUser) => {
    checkAuth(user);
    if (!user.isAdmin) throw new Error("Unauthorized");
};
