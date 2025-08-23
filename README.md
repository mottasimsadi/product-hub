# Product Hub - A Full-Stack Next.js 15 Application

Product Hub is a modern, full-stack web application built with the latest Next.js 15 App Router. It features a responsive design, light and dark modes, and a complete authentication system using NextAuth.js. Users can browse products, view details, and authenticated users can access a protected dashboard to add new products to the database.

This project serves as a comprehensive template for building production-ready applications, focusing on type-safety, modern tooling, and a great developer experience.

## Live Links
- **Live Website Link:** [Vercel Live Site](https://product-hub-blush.vercel.app/)

## Key Features

-   **Modern Tech Stack:** Next.js 15, Tailwind CSS, TypeScript, and MongoDB.
-   **Full Authentication:** Secure credential-based and Google social login powered by NextAuth.js.
-   **Protected Routes:** Middleware to protect dashboard pages from unauthenticated access.
-   **Dynamic Content:** Products are fetched directly from a MongoDB Atlas database.
-   **Professional UI/UX:**
    -   Built with the popular `shadcn/ui` component library.
    -   Fully responsive design with a mobile-first approach.
    -   Seamless light and dark mode theming with `next-themes`.
    -   Interactive notifications using Sonner toasts.

## Technologies Used

| Category          | Technology                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Framework**     | [Next.js 15](https://nextjs.org/) (App Router)                                                            |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                                                               |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Button, Card, Sonner, etc.)                       |
| **Authentication**| [NextAuth.js](https://next-auth.js.org/)                                                                  |
| **Database**      | [MongoDB Atlas](https://www.mongodb.com/atlas) (with the native `mongodb` driver)                         |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                                             |
| **Theming**       | [next-themes](https://github.com/pacocoursey/next-themes)                                                 |
| **Icons**         | [Lucide React](https://lucide.dev/)                                                                       |

## Setup and Installation

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/mottasimsadi/product-hub
cd product-hub
```
### 2. Install Dependencies
This project uses npm as the package manager.
```bash
npm install
```
### 3. Set Up Environment Variables
Create a file named `.env.local` in the root of your project. Copy the contents below and fill in your own credentials.
```Ini
# .env.local

# MongoDB Atlas
MONGODB_URI="your_mongodb_atlas_connection_string"
MONGODB_DB_NAME="your_database_name"

# NextAuth.js Core
# The base URL of your application
NEXTAUTH_URL="http://localhost:3000"
# A strong, random secret key for session encryption. Generate one: https://generate-secret.vercel.app/32
NEXTAUTH_SECRET="your_strong_random_secret_key"

# Google OAuth Provider Credentials
GOOGLE_CLIENT_ID="your_google_client_id_from_google_console"
GOOGLE_CLIENT_SECRET="your_google_client_secret_from_google_console"
```
### 4. Run the Development Server
The application will start on http://localhost:3000.
```bash
npm run dev
```
# Route Summary
## Public Routes
- `/`: The main landing page with a hero section and product highlights.
- `/login`: User login page with both credential and Google sign-in options.
- `/signup`: User registration page for creating a new account with email and password.
- `/products`: A public page displaying a list of all products.
- `/products/[id]`: A public page showing the full details of a single product.
## Protected Routes
- `/dashboard/add-product`: A form to add a new product. This route is only accessible to authenticated users and will redirect to `/login` if accessed while signed out.
## API Routes
- `/api/auth/[...nextauth]`: Handles all NextAuth.js authentication logic (sign-in, sign-out, session management).
- `/api/auth/register`:
  - `POST`: Handles new user registration (for credential-based signup).
- `/api/products`:
  - `GET`: Fetches all products from the database.
  - `POST`: Creates a new product in the database.
## Deployment
This application is ready to be deployed on [Vercel](https://vercel.com/).

Before deploying, ensure you have:

1. Pushed your code to a GitHub repository.
2. Added all the environment variables from your .env.local file to the Vercel project settings. Important: Set NEXTAUTH_URL to your production URL (e.g., https://your-app-name.vercel.app).
3. Updated your Google OAuth credentials with the production redirect URI: https://your-app-name.vercel.app/api/auth/callback/google.