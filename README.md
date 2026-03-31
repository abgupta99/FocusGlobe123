# Focus Globe 🌍

**Focus Globe** is an interactive web application that connects students and learners around the world in real-time. Visualize people studying together on a beautiful 3D globe, join study sessions, and stay motivated through a global community of focused individuals.

## ✨ Features

- **Interactive 3D Globe**: View active study sessions from around the world on an interactive globe powered by Three.js
- **Real-time Updates**: See users join and leave study sessions in real-time using Supabase real-time subscriptions
- **Privacy-First**: User locations are fuzzed by approximately 50km to protect privacy
- **Study Sessions**: Start studying with customizable name, subject, and optional message
- **Global Chat**: Connect with other students through a live global chat feature
- **Active Users List**: See who's currently studying and what they're working on
- **Session Management**: Automatic session cleanup and heartbeat monitoring to keep the globe accurate

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Supabase](https://supabase.com/) account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abgupta99/FocusGlobe123.git
   cd FocusGlobe123
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Create the following tables in your Supabase project:
   - `active_sessions`: For tracking active study sessions
   - `messages`: For the global chat feature
   
   (Refer to the database schema in your Supabase dashboard)

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## 🛠️ Technology Stack

### Frontend
- **React** (v19.2.0) - UI library for building the interface
- **Vite** (v7.2.4) - Fast build tool and development server
- **Three.js** (v0.182.0) - 3D graphics library
- **react-globe.gl** (v2.37.0) - React component for rendering the 3D globe

### UI Components
- **Material-UI** (v7.3.7) - Component library for modern UI elements
- **@emotion** - CSS-in-JS styling solution

### Backend & Database
- **Supabase** (v2.90.1) - Backend-as-a-Service for real-time database and authentication
  - Real-time subscriptions for live updates
  - PostgreSQL database
  - Row-level security

### Development Tools
- **ESLint** - Code linting and quality checks
- **Vite Plugin React** - Fast Refresh for React development

## 📁 Project Structure

```
FocusGlobe123/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── StudyGlobe.jsx
│   │   ├── HUD.jsx
│   │   ├── GlobalChat.jsx
│   │   ├── StartStudyingDialog.jsx
│   │   ├── ActiveUsersList.jsx
│   │   └── UserDetailDialog.jsx
│   ├── assets/          # Images and other assets
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── theme.js         # Material-UI theme configuration
│   ├── supabaseClient.js # Supabase client setup
│   └── index.css        # Global styles
├── .env.example         # Example environment variables
├── index.html           # HTML template
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## 🤝 Contributing

We welcome contributions to Focus Globe! Here's how you can help:

1. **Fork the repository**
   
   Click the "Fork" button at the top right of this repository

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Test your changes thoroughly

4. **Run linting**
   ```bash
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add your descriptive commit message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   
   Go to the original repository and click "New Pull Request"

### Development Guidelines

- Keep components modular and reusable
- Maintain consistent code formatting (ESLint will help with this)
- Update documentation when adding new features
- Respect user privacy - location data should remain fuzzed
- Ensure real-time features are efficient and don't cause unnecessary database calls

### Reporting Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/abgupta99/FocusGlobe123/issues) with:
- A clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- 3D globe powered by [globe.gl](https://github.com/vasturiano/globe.gl)
- Backend infrastructure by [Supabase](https://supabase.com/)
- UI components from [Material-UI](https://mui.com/)

---

Made with ❤️ by the Focus Globe community
