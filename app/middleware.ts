// This middleware protects the specified routes from unauthenticated access.
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/add-product"] };
