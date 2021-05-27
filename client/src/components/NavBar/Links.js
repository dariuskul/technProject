export const Links = [
  {
    path: "/admin",
    role: "Admin",
    label: "Admin zone",
  },
  {
    path: "/myposts",
    role: ["User", "Admin"],
    label: "My posts",
  },
  {
    path: "/carrers",
    label: "Careers",
    role: "any",
  },
  {
    path: "/tweets",
    label: "Tweets",
    role: "any",
  },
  {
    path: "/auth/login",
    label: "Login",
    role: "notUser",
  },
  {
    path: "/auth/register",
    label: "Register",
    role: "notUser",
  },
  {
    label: "Logout",
    role: ["User", "Admin"],
  },
];
