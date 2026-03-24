# GymTracker Frontend

React-based frontend for GymTracker application.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The development server will typically start on `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

- `src/pages/` - Page components (Login, Dashboard, etc.)
- `src/components/` - Reusable components
- `src/services/` - API service calls
- `src/context/` or `src/store/` - State management
- `src/hooks/` - Custom React hooks
- `src/styles/` - CSS/styling

## Environment Variables

Create a `.env` file for API configuration:
```
VITE_API_URL=http://localhost:5000
```

## Next Steps

Phase 5 will build out the complete React component structure.
