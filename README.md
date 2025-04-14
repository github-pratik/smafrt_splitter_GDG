# SmartSplit - AI-Powered Bill Splitting App

## Overview
SmartSplit is an intelligent bill-splitting application that uses AI and OCR technology to simplify the process of splitting bills among friends, family, or colleagues. With SmartSplit, you can easily scan receipts, automatically detect items and prices, assign items to different people, and calculate each person's share including tax and tip.

## Features
- **AI-Powered Receipt Scanning**: Take a photo of your receipt and let our AI instantly recognize all items and prices
- **Smart Item Assignment**: Easily assign items to different people with a simple tap
- **Automatic Calculations**: Automatically calculate tax and tip distribution
- **User-Friendly Interface**: Intuitive and responsive design for a seamless experience
- **Real-Time Updates**: See everyone's share update in real-time as you make assignments

## Technology Stack
- **Frontend**: React with TypeScript
- **Styling**: TailwindCSS for responsive design
- **Icons**: Lucide React for beautiful UI elements
- **Build Tool**: Vite for fast development and optimized production builds
- **Backend/Database**: Firebase (Authentication, Firestore, Storage)

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Firebase account and project

## Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd GDGAiathon_1
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   - Copy the `.env.example` file to a new file named `.env`
   - Replace the placeholder values with your Firebase project details

   ```
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID
   ```

## Running the Application

### Development Mode
```
npm run dev
```
This will start the development server, typically at http://localhost:5173

### Building for Production
```
npm run build
```

### Preview Production Build
```
npm run preview
```

## How to Use

1. **Start**: Click "Get Started" on the home page
2. **Scan**: Take a photo of your receipt or upload an image
3. **Split**: Assign items to people in your group
   - Add participants as needed
   - Tap on items to assign them to specific people
   - Adjust tip percentage if desired
4. **Review**: Check the summary of how much each person owes
5. **Share**: Share the results with your group

## Firebase Configuration

The app uses Firebase for backend services. The configuration is managed through environment variables for security. The Firebase services used include:

- **Authentication**: For user management
- **Firestore**: For storing bill data and user information
- **Storage**: For storing receipt images

The Firebase configuration is set up in `src/firebase/config.js`.

## Project Structure

```
├── src/
│   ├── components/       # Reusable UI components
│   ├── firebase/         # Firebase configuration and services
│   ├── pages/            # Main application pages
│   │   ├── Home.tsx      # Landing page
│   │   ├── ScanBill.tsx  # Receipt scanning page
│   │   ├── SplitBill.tsx # Bill splitting interface
│   │   └── Summary.tsx   # Final summary page
│   ├── utils/            # Utility functions and mock data
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Application entry point
├── public/               # Static assets
└── ...                   # Configuration files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- This project was bootstrapped with Vite
- UI components powered by TailwindCSS
- Icons provided by Lucide React
