# TikTok UI Clone

> 🎬 A complete TikTok clone application built with React.js, replicating all core features of the short-form video platform TikTok.

## 🌟 Live Demo

🔗 **[https://clone-tiktok-app.netlify.app/](https://clone-tiktok-app.netlify.app/)**

## 📋 Table of Contents

-   [Overview](#-overview)
-   [Key Features](#-key-features)
-   [Tech Stack](#-tech-stack)
-   [Project Structure](#-project-structure)
-   [Installation & Setup](#-installation--setup)
-   [API Endpoints](#-api-endpoints)
-   [Application Architecture](#-application-architecture)
-   [Contributing](#-contributing)
-   [License](#-license)

## 🎯 Overview

TikTok UI Clone is a modern web application that replicates TikTok's interface and functionality, developed for learning purposes and showcasing frontend development skills. The application is built with React.js and cutting-edge web technologies.

### 🎨 Design & UX

-   **Responsive Design**: Optimized display across all devices
-   **Modern UI**: Contemporary, intuitive interface matching original TikTok
-   **Smooth Animations**: Fluid effects with Lottie animations
-   **Custom Components**: Bespoke component system design

## ⭐ Key Features

### 🔐 User Authentication

-   **Registration/Login**: Authentication system with email/password
-   **Session Management**: JWT token with Redux Persist
-   **Security**: Token-based authentication with Axios interceptors

### 🎥 Video & Content

-   **Video Viewing**: Custom video player with full controls
-   **Autoplay**: Automatic video playback on scroll
-   **Volume Control**: Volume control and mute/unmute functionality
-   **Video Quality**: Support for multiple video formats
-   **Full Screen**: Full-screen viewing mode

### 📤 Upload & Management

-   **Video Upload**: Video upload with preview
-   **Video Editor**: Basic cutting and editing
-   **Thumbnail**: Automatic thumbnail generation
-   **Caption & Hashtags**: Add descriptions and hashtags
-   **Privacy Settings**: Privacy settings (Public/Private)

### 👥 Social Interactions

-   **Follow/Unfollow**: Follow other users
-   **Like/Unlike**: Like videos with animations
-   **Comments**: Real-time commenting system
-   **Share**: Share videos across platforms
-   **User Profiles**: Personal pages with detailed information

### 🔍 Discovery & Search

-   **Search**: Search users and videos with debounce
-   **For You Page**: Recommended video feed
-   **Following Feed**: Videos from followed users
-   **Trending**: Trending hashtags and videos
-   **Live Streaming**: Live stream page (UI)

### 📱 Additional Features

-   **Responsive**: Mobile, tablet, desktop support
-   **PWA Ready**: Progressive Web App capabilities
-   **Dark/Light Mode**: Theme switching
-   **Lazy Loading**: Performance optimization with lazy loading
-   **Infinite Scroll**: Infinite scrolling with Intersection Observer

## 🛠 Tech Stack

### Frontend Core

-   **React 18.2.0**: Main library for UI
-   **React Router Dom 6.8.1**: Routing and navigation
-   **Redux Toolkit 1.9.3**: State management
-   **Redux Persist 6.0.0**: Persist Redux state

### Styling & UI

-   **Sass**: CSS preprocessor
-   **CSS Modules**: Scoped styling
-   **Normalize.css**: CSS reset
-   **ClassNames**: Dynamic CSS classes
-   **FontAwesome**: Icon library

### Video & Media

-   **React Video Player**: Custom video controls
-   **Lottie React**: Animations
-   **React Draggable**: Drag and drop interactions

### Utilities & Performance

-   **Axios**: HTTP client
-   **Tippy.js**: Tooltips and popovers
-   **React Intersection Observer**: Viewport detection
-   **React Visibility Sensor**: Element visibility detection
-   **Lodash Debounce**: Performance optimization

### Development Tools

-   **React App Rewired**: Custom webpack config
-   **Babel Module Resolver**: Import path resolution
-   **ESLint**: Code linting
-   **SASS**: Advanced styling

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
│   ├── fonts/             # Custom fonts
│   ├── images/            # Images and icons
│   └── lotties/           # Lottie animation files
├── components/            # Reusable components
│   ├── AccountItem/       # User account display
│   ├── Button/           # Custom button component
│   ├── Follow/           # Follow/Unfollow functionality
│   ├── Icons/            # SVG icon components
│   ├── Image/            # Optimized image component
│   ├── Likes/            # Like/Unlike functionality
│   ├── Modal/            # Modal components
│   ├── Video/            # Video player component
│   ├── VideoList/        # Video list container
│   └── ...
├── config/               # App configuration
│   ├── index.js          # Main config
│   └── routes.js         # Route definitions
├── context/              # React Context
│   ├── ModalContext/     # Modal state management
│   └── VideoContext/     # Video state management
├── hooks/                # Custom React hooks
│   ├── useDebounce.js    # Debounce hook
│   ├── useModal.js       # Modal management hook
│   └── useVideoModal.js  # Video modal hook
├── layouts/              # Layout components
│   ├── DefaultLayout/    # Standard layout with sidebar
│   ├── FullScreenLayout/ # Full screen layout
│   ├── HeaderOnly/       # Header-only layout
│   └── UploadLayout/     # Upload page layout
├── pages/                # Page components
│   ├── Home/             # Homepage with video feed
│   ├── Following/        # Following page
│   ├── Profile/          # User profile page
│   ├── Upload/           # Video upload page
│   ├── Search/           # Search page
│   ├── Live/             # Live streaming page
│   └── DetailVideo/      # Video detail page
├── redux/                # Redux store
│   ├── authSlice.js      # Authentication state
│   ├── videoSlice.js     # Video state
│   ├── likesSlice.js     # Likes state
│   ├── followSlice.js    # Follow state
│   └── store.js          # Redux store config
├── routes/               # Routing configuration
├── services/             # API services
│   ├── userService.js    # User-related APIs
│   ├── videoService.js   # Video-related APIs
│   ├── commentService.js # Comment APIs
│   ├── followService.js  # Follow APIs
│   └── uploadService.js  # Upload APIs
└── utils/                # Utility functions
    └── httpRequest.js    # Axios configuration
```

## 🚀 Installation & Setup

### System Requirements

-   **Node.js**: >= 14.0.0
-   **npm**: >= 6.0.0 or **yarn**: >= 1.22.0

### 1. Clone repository

```bash
git clone https://github.com/your-username/tiktok-ui.git
cd tiktok-ui
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment configuration

Create a `.env` file in the root directory:

```env
REACT_APP_BASE_URL=https://tiktok.fullstack.edu.vn/api/
FAKE_TOKEN_AUTH=your_fake_token_here
```

### 4. Run the application

#### Development mode

```bash
npm start
# or
yarn start
```

The application will run at [http://localhost:3000](http://localhost:3000)

#### Production build

```bash
npm run build
# or
yarn build
```

#### Run tests

```bash
npm test
# or
yarn test
```

## 🔗 API Endpoints

### Authentication

-   `POST /auth/login` - User login
-   `POST /auth/register` - User registration
-   `PATCH /auth/me` - Update user information

### Users

-   `GET /users/suggested` - Get suggested users list
-   `GET /me/followings` - Get following list

### Videos

-   `GET /videos` - Get video list (for-you/following)
-   `GET /videos/:id` - Get video information by ID
-   `DELETE /videos/:id` - Delete video

### Social Features

-   `POST /videos/:id/like` - Like video
-   `DELETE /videos/:id/unlike` - Unlike video
-   `POST /users/:id/follow` - Follow user
-   `DELETE /users/:id/unfollow` - Unfollow user

## 🏗 Application Architecture

### State Management (Redux)

```javascript
store: {
  auth: {
    login: { currentUser, isLogin },
    register: { ... }
  },
  video: {
    defaultVolume, isMuted, searchQuery,
    isUploadFetching, isUploaded
  },
  like: {
    isLiked, currentVideoId, isChangeStateLike
  },
  follow: {
    stateFollow, isChangeFollow, currentUserId
  }
}
```

### Context API

-   **VideoContext**: Global video state management
-   **ModalContext**: Modal state management

### Custom Hooks

-   **useDebounce**: Optimize search performance
-   **useModal**: Modal state management
-   **useVideoModal**: Video modal management
-   **useLocalStorage**: Persist data locally

### Component Pattern

-   **Container/Presenter**: Separate logic and UI
-   **Compound Components**: Composite components
-   **Render Props**: Share logic between components
-   **Higher-Order Components**: Enhance component functionality

## 🎨 Theme & Styling

### SCSS Architecture

```scss
// Variables
$primary-color: #fe2c55;
$text-color: #333;
$border-color: #e1e1e1;

// Mixins
@mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

// Components
.component {
    @include flex-center;
    // styles...
}
```

### CSS Modules

```javascript
import styles from './Component.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Component() {
    return <div className={cx('wrapper', 'active')} />;
}
```

## 📱 Responsive Design

### Breakpoints

-   **Mobile**: < 768px
-   **Tablet**: 768px - 1024px
-   **Desktop**: > 1024px

### Mobile Features

-   Touch gestures
-   Swipe navigation
-   Mobile-optimized video player
-   Responsive layouts

## ⚡ Performance Optimizations

### Code Splitting

```javascript
// Lazy loading components
const Home = lazy(() => import('~/pages/Home'));
const Profile = lazy(() => import('~/pages/Profile'));
```

### Memoization

```javascript
// React.memo for expensive components
export default memo(VideoComponent);

// useMemo for expensive calculations
const expensiveValue = useMemo(() => {
    return expensiveCalculation(data);
}, [data]);
```

### Virtual Scrolling

-   Infinite scroll with Intersection Observer
-   Lazy loading images
-   Video lazy loading

## 🧪 Testing

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── hooks/
```

### Testing Tools

-   **Jest**: Test runner
-   **React Testing Library**: Component testing
-   **User Event**: User interaction testing

## 🚀 Deployment

### Netlify (Recommended)

1. Build project: `npm run build`
2. Deploy `build` folder to Netlify
3. Configure redirects in `public/_redirects`

### Other Platforms

-   **Vercel**: Zero-config deployment
-   **GitHub Pages**: Static hosting
-   **Firebase Hosting**: Google's hosting service

## 🔧 Configuration

### Webpack Customization

```javascript
// config-overrides.js
const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
    addBabelPlugin([
        'module-resolver',
        {
            alias: {
                '~': './src',
            },
        },
    ]),
);
```

### Path Aliases

```javascript
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

## 🤝 Contributing

We welcome all contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

### Contribution Process

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Code Style

-   Use existing ESLint configuration
-   Follow React best practices
-   Write tests for new features
-   Update documentation when necessary

## 📄 License

This project is distributed under the MIT License. See [LICENSE](LICENSE) file for more details.

## 📞 Contact

-   **Email**: your.email@example.com
-   **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/your-profile)
-   **GitHub**: [@your-username](https://github.com/your-username)

## 🙏 Acknowledgments

-   [TikTok](https://tiktok.com) - Inspiration for UI/UX design
-   [F8 Education](https://fullstack.edu.vn) - API and learning resources
-   [React Community](https://reactjs.org/community) - Documentation and support
-   All contributors who contributed to this project

---

⭐ **If you find this project useful, please star this repository!** ⭐
