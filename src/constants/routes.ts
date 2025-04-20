export const routes = {
  private: [
    "/checkout",
    "/user",
  ],
  adminOnly: ["/admin"],
  auth: [
    "/log-in",
    "/sign-up",
    "/reset-password",
    "/forget-password",
    "/new-verification",
  ],
  apiAuthPrefix: "/api/auth",
  defaultLoginRedirect: "/",
  defaultLogoutRedirect: "/",
  defaultSignUpRedirect: "/",
};
