# QuizLab Application

A web-based quiz application that allows users to register, login, create quizzes, take quizzes, and view results. The app supports both multiple-choice and open-ended questions, with automatic grading for multiple-choice questions and manual grading for open-ended questions.
## Technologies Used:
- **Node.js**: Backend runtime environment for JavaScript.
- **Express.js**: Framework for building the server-side of the app.
- **MongoDB**: NoSQL database for storing user data, quizzes, and results.
- **React**: Frontend framework for building the user interface.
- **bcrypt**: Used for securely hashing passwords.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Mongoose**: MongoDB object modeling for Node.js.
## Features

### User Features:
1. **Sign Up**:
   - Users can create a new account by providing essential information such as username, password, full name, and date of birth.
   
2. **Sign In**:
   - Users can log in to their account using their registered username and password.

3. **Search Quizzes**:
   - Users can search for quizzes using filters such as topic, quiz name, quiz creator's name, and number of questions.
   - The search system prioritizes results by quiz name, followed by topic, quiz creator, and number of questions.

4. **Create Quizzes**:
   - Users (admins) can create quizzes with the following options:
     - Define quiz format (e.g., multiple-choice questions only).
     - Add quiz topics and manage them in groups for better search results.
     - Add individual questions and answers.
     - Users can upload quizzes in Excel format, and the system will automatically create a quiz based on the uploaded questions and answers.

5. **Take Quizzes**:
   - Users can take quizzes, answering questions one at a time, and skip questions if desired.
   - Timers can be set for each quiz, and the system automatically ends the quiz when time runs out.

6. **Automatic Grading**:
   - Multiple-choice quizzes are automatically graded by the system.
   - Short-answer questions (e.g., math quizzes) are automatically graded based on predefined correct answers.
   - Long-answer questions are manually graded by the quiz creator.

7. **View Results**:
   - Users can view their results once they complete a quiz.
   - For multiple-choice quizzes, results are shown immediately after submission.
   - For long-answer questions, results are shown once the quiz creator manually grades the answers.

8. **Timer**:
   - A countdown timer is displayed while taking a quiz, and the time spent on the quiz is shown after the quiz is completed.

9. **AI Integration**:
   - The system integrates AI to automatically generate quizzes based on selected topics and the number of questions provided by users.

### Admin Features:
1. **Manage Users**:
   - Admins can view a list of users and assign roles (admin or regular user).
   - Admins can delete user accounts if necessary.

2. **Manage Quizzes**:
   - Admins can add, edit, and delete quizzes.

3. **View Results and Statistics**:
   - Admins can view the results of quizzes, see statistics on user participation, and track users' scores.

## Installation

### Prerequisites:
- **Node.js** (version 14 or higher)
- **MongoDB** (for database storage)

### Steps to Run the Application:
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your MongoDB database:
   - Create a `.env` file in the root directory and add the following:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=3000
     ```

4. Run the application:
   ```bash
   npm run dev
   ```

5. Visit the app in your browser at `http://localhost:3000`.

## Folder Structure

```
quiz-app/
├── config/                # Database connection and configuration
├── controllers/           # Logic for handling user and quiz requests
├── models/                # Mongoose models for MongoDB
├── routes/                # API route handlers
├── public/                # Static assets (images, CSS, etc.)
├── src/                   # Frontend React components
├── server.js              # Main server file
├── .env                   # Environment variables (MongoDB URI, etc.)
├── README.md              # This file
└── package.json           # Project metadata and dependencies
```

## Future Improvements
- Add real-time features (e.g., multiplayer quizzes).
- Implement more advanced AI features for generating personalized quizzes.
- Add support for more question types (e.g., drag-and-drop, fill-in-the-blank).

