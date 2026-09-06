# Happy Ending Massage SPA

## Overview
This project is a Single Page Application (SPA) built with React and Vite. It is designed to provide a seamless user experience for booking massage services.

## Project Structure
- **src/**: Contains the main application code.
  - **App.tsx**: The main application component that defines the structure and routing logic.
  - **main.tsx**: The entry point for the React application, rendering the `App` component.
  - **components/**: Directory for various React components used throughout the application.
  
- **public/**: Holds static assets such as images and icons.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

- **vite.config.ts**: Configuration file for Vite, specifying build and serve settings.

- **netlify.toml**: Configuration file for Netlify deployment.

- **index.html**: The main HTML file serving as the entry point for the web application.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/davililo630-creator/happyendingmassegespa.git
   cd happyendingmassegespa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment on Netlify
To deploy this project on Netlify, ensure the following configurations are in place:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`

### netlify.toml Configuration
Make sure your `netlify.toml` file includes the following:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Additional Notes
- Ensure that the build output folder is `dist`, which is the default for Vite.
- If using React Router, the redirect rule in `netlify.toml` will handle refresh and deep links correctly.
- For any backend logic, consider using Netlify Functions or refactor the application to serve the frontend as static files.

By following these instructions, the project will be ready for deployment on Netlify.