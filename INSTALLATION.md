## Local Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/)
- A NeonDB account ([Sign up here](https://neon.tech/))
- A `.env` file with the required environment variables (described below).

---

### 1. Clone the Repository

```bash
git clone https://github.com/akash0708/vrv-rbac.git
cd vrv-rbac
```

### 2. Install the dependencies

```bash
npm install

# if npm install doesn't work, try this since a lot of dependencies are not compatible with Next.js v15
npm install --legacy-peer-deps
```

### 3. Create a `.env` file in the root directory

```bash
DATABASE_URL=your_neon_db_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
# Replace your_neon_db_connection_string with your actual NeonDB connection URL.
```

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev --name name-you-want
npx prisma studio
# prisma studio will help you to change the role to SUPERADMIN
```

### 5. Run the development server

```bash
npm run dev
```

### Visit live website at https://localhost:3000

To access the complete website, after signing up, change the user role from default `USER` to `SUPERADMIN` in `prisma studio`
