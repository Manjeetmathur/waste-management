# CleanConnect - Waste Management Platform

CleanConnect is a comprehensive waste management platform designed specifically for India, addressing the country's trash management challenges through a unified web-based solution. The platform connects users with recyclers while promoting waste segregation through education and gamification.

## 🌟 Features

### Core Features
- **Recycle Pickup Scheduler**: Connect with local recyclers and kabadiwalas for easy waste pickup
- **Segregation Quiz Game**: Interactive quizzes about waste segregation with multilingual support
- **Recycler Hub**: Directory of local recyclers with contact details and specialties
- **Community Challenges**: Monthly challenges with progress tracking and leaderboards
- **Educational Tips**: Bite-sized tips on waste segregation and recycling

### Key Highlights
- 🌍 **Multilingual Support**: Available in English and Hindi (expandable to other Indian languages)
- 📱 **Mobile-First Design**: Responsive design optimized for mobile devices
- 🎮 **Gamification**: Points, rewards, and challenges to encourage participation
- 🔒 **Secure Authentication**: Firebase Authentication with user profiles
- 💰 **Transparent Pricing**: Real-time price estimates for different waste types
- ✅ **Verified Recyclers**: Verified recycler network for trusted transactions

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Image Management**: Cloudinary
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Firebase project set up
- Cloudinary account (for image management)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cleanconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your actual values:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Other Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration and update the environment variables

5. **Set up Cloudinary**
   - Create a Cloudinary account at [Cloudinary](https://cloudinary.com/)
   - Go to your Dashboard to find:
     - Cloud Name (visible in the dashboard)
     - API Key (in the API Keys section)
     - API Secret (in the API Keys section)
   - Create an upload preset:
     - Go to Settings → Upload
     - Click "Add upload preset"
     - Set preset name to "cleanconnect"
     - Set signing mode to "Unsigned"
     - Configure folder and transformations as needed
   - Update the environment variables with your credentials

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
cleanconnect/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── pickup/            # Pickup scheduling
│   │   ├── quiz/              # Quiz functionality
│   │   ├── recyclers/         # Recycler directory
│   │   ├── challenges/        # Community challenges
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Navigation header
│   │   └── Footer.tsx         # Site footer
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/                   # Utility libraries
│   │   ├── firebase.ts        # Firebase configuration
│   │   └── cloudinary.ts      # Cloudinary configuration
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # Main type definitions
├── public/                    # Static assets
├── .env.local.example         # Environment variables template
└── README.md                  # Project documentation
```

## 🎯 Target Users

- **Households**: Urban/rural residents disposing of waste responsibly
- **Recyclers**: Informal kabadiwalas and formal recycling firms
- **Communities**: RWAs, schools, and NGOs for group efforts
- **Businesses**: Small shops or offices needing recycling services

## 📸 Image Upload Features

CleanConnect uses Cloudinary for robust image management:

- **Profile Pictures**: Users can upload and manage profile photos
- **Waste Documentation**: Upload images during pickup scheduling to help recyclers understand waste type and quantity
- **Automatic Optimization**: Images are automatically compressed and optimized for web delivery
- **Multiple Formats**: Supports JPEG, PNG, and WebP formats
- **Size Validation**: Automatic file size validation (configurable limits)
- **Fallback Support**: Client-side upload fallback if server-side upload fails

### Image Upload Locations:
- **Profile Page**: Upload/update profile pictures
- **Pickup Scheduling**: Add up to 3 images of waste for better recycler matching
- **Future Features**: Community challenges, recycler verification, etc.

## 🌍 Impact Goals

- **Recycling Boost**: Increase India's recycling rate from current 13%
- **Awareness**: Educate users on proper waste segregation
- **Support**: Assist India's 4+ million informal waste pickers
- **Alignment**: Support Swachh Bharat Mission objectives

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by India's Swachh Bharat Mission
- Built to support informal waste pickers and recyclers
- Designed for India's diverse linguistic and cultural landscape

## 📞 Support

For support, email support@cleanconnect.in or create an issue in this repository.

---

**CleanConnect** - *Connecting India for a Cleaner Tomorrow* 🌱