# Online College Transfer System (OCTS)


This project is an Online College Transfer System developed for Pokhara University. The system allows everyone to view the seats in respective colleges without requiring user authentication. It allows students to apply for transfer from one college to another within the university based on the availability of seats in specific programs and semesters. The system includes a user-friendly dashboard and a multi-level approval process to ensure a smooth transfer experience.

## Live Demo

Check out the live demo of the Online College Transfer System (OCTS) here: [Live Demo](https://octs-finalproject.web.app)

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Setup](#admin-setup)
- [Contributing](#contributing)
- [Team Members](#team-members)
- [License](#license)

## Project Overview

Pokhara University consists of multiple constituent colleges, each offering various programs with 8 semesters. This system provides a dashboard accessible to everyone, displaying the available seats in each semester of each program at every college within the university. Students can initiate a transfer from their source college to a destination college if seats are available in their desired program and semester. The application then goes through the following approval process:

1. Student initiates the transfer request.
2. Program Coordinator of the source college reviews and approves/rejects the application.
3. College Head of the source college reviews and approves/rejects the application.
4. Program Coordinator of the destination college reviews and approves/rejects.
5. College Head of the Destination college reviews and approves/rejects the application.
6. The dean will approves/rejects the application.
7. After the deans approval, student will go to destination college for admission.
8. After sucessful admission of student to destination college, the seats are updated automatically.

The system also includes an admin panel to manage user accounts, including Program Coordinators, College Heads, and the dean. College Heads can update the number of available seats in various programs in Pokhara University.

## Technology Stack

- Frontend:
  - React
  - Material-UI (MUI)
<br></br>
- Backend:
  - Firebase
    - Firestore Database
    - Authentication
    - Storage
<br></br>
- Development Tools:
  - Vite (to set up frontend development environment)
<br></br>
- Version Control
  - Git

## Installation

1. **Clone the repository:**

   ```shell
   git clone https://github.com/sudippokhrel/OCTS-Frontend.git
   ```

2. **Install dependencies for the project:**

   ```shell
   cd OCTS-Frontend
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Configure Firebase Authentication, Firestore Database, and Firebase Storage according to your needs.
   - Update the Firebase configuration in the appropriate files (e.g., `.env`) in the given directory.

## Usage

1. **Start the project:**

   ```shell
   npm run dev
   ```

2. **Access the application in your web browser at `http://localhost:5173/`.**

## Admin Setup

1. **To create admin accounts (Admin and the dean):**
   - Use the Firebase Console to manually create user accounts with the necessary roles and permissions.

2. **Admins can log in to their respective accounts using their email and password.**
<br></br>

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Submit a pull request with a clear description of your changes.


## Team Members
Our Team comprises dedicated individuals, including [me](https://github.com/sudippokhrel) and the following members:

- [Niroj Sedhai](https://github.com/nirojfloyd)
- [Samiksha Paudel](https://github.com/Samikshap85)
- [Shristi Joshi](https://github.com/ShristiJoshi)
- [Sushil Dahal](https://github.com/Sushildahal2056)

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as needed.

---
