import { withAuth } from "next-auth/middleware";

// Define the middleware function
export default withAuth(
  async function middleware(request) {
    // Access the token in the authorized callback to ensure it's correct
    console.log(request.nextUrl.pathname); // Logs the requested path

    // You don't need to manually access `request.nextauth.token` here
    // The logic for authorization is handled in the callback function
  },
  {
    callbacks: {
      // Ensure the user has 'ADMIN' or 'superadmin' role to access this route
      authorized: ({ token }) => {
        // Check if the token's role is either 'ADMIN' or 'superadmin'
        return token?.role === "ADMIN" || token?.role === "SUPERADMIN";
      },
    },
  }
);

// Specify the matcher to apply this middleware to the '/admin' route
export const config = {
  matcher: ["/admin"],
};
