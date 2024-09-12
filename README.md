# 📝 JAGNTA (Just Another Generic Note-Taking App)

Welcome to **JAGNTA**, the app that allows you to create, search, and manage any note synced online! Built with **MySQL** and **Next.js**, JAGNTA provides an efficient note-taking experience for users who need a simple yet powerful tool to organize their thoughts and tasks.

![JAGNTA Screenshot](https://github.com/user-attachments/assets/4b6bc084-b067-448e-a53b-b37fdc3f5eb4)

## 🚀 Getting Started

Follow the steps below to set up and run JAGNTA locally on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [MySQL](https://dev.mysql.com/downloads/) Server

### Installation

1. **Clone the Repository**

   Start by cloning the repository from GitHub:

   ```bash
   git clone https://github.com/drew-beamer/JAGNTA.git
   cd JAGNTA```
  
2. **Ensure MySQL is Installed**

   Make sure you have **MySQL** installed and running on your machine. If not, download it from the [official MySQL website](https://dev.mysql.com/downloads/) and follow the installation instructions.

3. **Configure the Database Schema**

   Run the `NoteAppSchema.sql` file on your local MySQL database to set up the schema:

   ```bash
   mysql -u <your_mysql_user> -p <your_database_name> < NoteAppSchema.sql
   ```

   Replace `<your_mysql_user>` with your MySQL username, and `<your_database_name>` with the name of the database you want to use for JAGNTA.

4. **Seed the Test Data (Optional)**

   You can seed the database with test data using the `seed.mjs` file. Run this command to seed data:

   ```bash
   node seed.mjs
   ```

   Ensure the database connection details are correctly set in `seed.mjs`.

### 3. Frontend Setup (Next.js)

1. **Navigate to the `web-app` directory and install dependencies:**

   ```bash
   cd web-app
   npm install
   ```

2. **Run the Development Server:**

   Start the Next.js development server:

   ```bash
   npm run dev
   ```

   The app will be running locally, and you can access it at `http://localhost:3000`.


