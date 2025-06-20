# AI Recipe Generator

A web application that creates personalized recipes based on available ingredients, dietary constraints, and user preferences using artificial intelligence.

## 🌟 Features

- **Ingredient-Based Recipe Generation**: Simply enter what ingredients you have, and get recipe suggestions.
- **Dietary Preference Support**: Filter recipes by dietary restrictions (vegan, vegetarian, gluten-free, etc.).
- **Customization Options**: Specify cooking time, difficulty level, and cuisine preferences.
- **Recipe Management**: Save favorite recipes, create collections, and build meal plans.
- **Nutritional Information**: View calorie count and macronutrient breakdown for each recipe.
- **User Accounts**: Create a profile to save preferences and recipe history.

## 🚀 Tech Stack

### Frontend
- React.js with Next.js
- TypeScript
- Redux Toolkit for state management
- Material UI & Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- OpenAI API for recipe generation
- JWT for authentication
- Jest for testing

### Infrastructure
- Vercel (Frontend hosting)
- Heroku (Backend hosting)
- MongoDB Atlas (Database)
- GitHub Actions (CI/CD)

## 📋 Project Structure

```
ai-recipe-generator/
├── client/                   # Frontend React application
│   ├── public/               # Static files
│   ├── src/                  # Source files
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Next.js pages
│   │   ├── redux/            # Redux state management
│   │   ├── services/         # API services
│   │   ├── styles/           # Global styles
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   ├── .env.example          # Environment variables example
│   └── package.json          # Frontend dependencies
│
├── server/                   # Backend Node.js application
│   ├── src/                  # Source files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   ├── .env.example          # Environment variables example
│   └── package.json          # Backend dependencies
│
├── .github/                  # GitHub Actions workflows
├── .gitignore                # Git ignore file
├── README.md                 # Project documentation
└── package.json              # Root dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB instance
- OpenAI API key

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/dxaginfo/ai-recipe-generator-web-2025.git
   cd ai-recipe-generator-web-2025
   ```

2. **Install dependencies**
   ```bash
   # Root dependencies
   npm install

   # Frontend dependencies
   cd client
   npm install

   # Backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In the client directory
   cp .env.example .env.local

   # In the server directory
   cp .env.example .env
   ```

4. **Start development servers**
   ```bash
   # Start backend server
   cd server
   npm run dev

   # In another terminal, start frontend server
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api

## 📝 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Recipes
- `POST /api/recipes/generate` - Generate recipes from ingredients
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get specific recipe
- `GET /api/recipes/user` - Get user's saved recipes
- `POST /api/recipes/save/:id` - Save recipe to user profile

### Ingredients
- `GET /api/ingredients/search` - Search for ingredients
- `GET /api/ingredients/user` - Get user's saved ingredients

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/preferences` - Get dietary preferences

## 📦 Deployment

### Frontend (Vercel)
```bash
cd client
vercel
```

### Backend (Heroku)
```bash
cd server
heroku create
git push heroku main
```

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## 📈 Roadmap

- **Phase 1**: Basic recipe generation and user accounts
- **Phase 2**: Advanced filtering, nutritional analysis, and recipe rating
- **Phase 3**: Meal planning, shopping list generation, and social sharing
- **Phase 4**: Mobile app, voice interface, and smart device integration

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- All open-source libraries used in this project