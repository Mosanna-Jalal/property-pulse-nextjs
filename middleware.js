export {default} from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile",
    "/properties/saved",
    "/messages",
    "/properties/add",
    "/properties/:path*/edit",
  ],
};  
