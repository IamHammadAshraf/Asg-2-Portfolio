# Portfolio Builder

## Installation
Run these commands to set up the project:

```
npm install tailwindcss postcss autoprefixer
npm install bootstrap
npm install react-draggable framer-motion
npx tailwindcss init
npm install react-router-dom
npm install react-icons
```

## Required package.json versions
Make sure your package.json includes these dependencies:

```json
{
  "name": "asg-2",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^13.5.0",
    "autoprefixer": "^10.4.21",
    "bootstrap": "^5.3.3",
    "framer-motion": "^12.5.0",
    "postcss": "^8.5.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-draggable": "^4.4.6",
    "react-router-dom": "^7.4.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.3.5",
    "web-vitals": "^2.1.4"
  }
}
```

## Troubleshooting
If you encounter issues:
1. Delete node_modules folder and package-lock.json
2. Copy the package.json above
3. Run:
```
npm install
```

## Running the Project
Start the development server with:
```
npm start
```

📂 File Structure
markdown
Copy
src/
├── pages/
│   ├── DataEntryPage.js  # Form to input portfolio data
│   └── PortfolioPage.js  # Display portfolio with draggable projects
├── App.js               # Main router
└── index.js             # React entry point
