# URL Performance Analyzer

A professional React web application that analyzes website performance metrics using Google PageSpeed Insights API. Built for demonstrating clean code architecture, modern React patterns, and real-world performance measurement capabilities.

## 🚀 Features

- **Real Performance Analysis**: Uses Google PageSpeed Insights API for accurate, real-world performance data
- **Comprehensive Metrics**: Measures load time, page size, request count, and additional performance indicators
- **Modern React Architecture**: Built with functional components, custom hooks, and TypeScript
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Professional UI**: Clean, intuitive interface with loading states and error handling
- **Modular Code Structure**: Well-organized components and services for maintainability

## 📊 Measured Metrics

### Core Performance Metrics
- **Load Time**: First Contentful Paint, Largest Contentful Paint, Speed Index, Time to Interactive
- **Page Size**: Total size breakdown by resource type (HTML, CSS, JavaScript, Images)
- **Request Count**: Number of HTTP requests categorized by resource type
- **Performance Scores**: Overall performance, accessibility, and SEO scores (0-100)

### Additional Metrics
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to Interactive (TTI)
- Resource-specific analysis

## 🛠 Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **API**: Google PageSpeed Insights API v5
- **State Management**: React hooks (useState, useEffect, custom hooks)

## 🏗 Architecture & Design Decisions

### Component Architecture
\`\`\`
app/
├── page.tsx                 # Main application component
├── components/
│   ├── url-analyzer.tsx     # URL input and validation
│   ├── performance-results.tsx # Results display
│   ├── loading-spinner.tsx  # Loading state
│   └── error-display.tsx    # Error handling
├── hooks/
│   └── use-performance-analysis.ts # Custom hook for API logic
├── services/
│   └── performance-service.ts # API service layer
└── types/
    └── performance.ts       # TypeScript interfaces
\`\`\`

### Key Design Decisions

1. **Separation of Concerns**: Clear separation between UI components, business logic (hooks), and data services
2. **Custom Hooks**: Encapsulated API logic in `usePerformanceAnalysis` hook for reusability and testing
3. **Service Layer**: Dedicated `PerformanceService` class for API interactions and data transformation
4. **TypeScript**: Strong typing throughout for better developer experience and fewer runtime errors
5. **Error Handling**: Comprehensive error handling with user-friendly messages and retry mechanisms
6. **Responsive Design**: Mobile-first approach with Tailwind CSS utilities
7. **Performance**: Optimized bundle size and lazy loading where appropriate

### State Management Strategy
- **Local State**: Using `useState` for component-specific state
- **Custom Hooks**: `usePerformanceAnalysis` hook manages API state (loading, error, results)
- **Props Drilling**: Minimal and intentional - kept component tree shallow
- **No External State Library**: React's built-in state management sufficient for this application's scope

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd url-performance-analyzer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup (Optional)**
   
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_PAGESPEED_API_KEY=your_google_pagespeed_api_key
   \`\`\`
   
   **Note**: The app works without an API key using realistic mock data for demonstration purposes.

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting a Google PageSpeed Insights API Key (Optional)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the PageSpeed Insights API
4. Create credentials (API Key)
5. Add the API key to your \`.env.local\` file

## 🧪 Usage

1. **Enter a URL**: Input any valid website URL (must include http:// or https://)
2. **Analyze**: Click "Analyze Performance" to start the analysis
3. **View Results**: Review comprehensive performance metrics including:
   - Performance, Accessibility, and SEO scores
   - Detailed load time breakdown
   - Resource size analysis
   - Network request statistics
4. **Try Examples**: Use the provided example URLs for quick testing

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-width layout with multi-column grids
- **Tablet**: Adapted layouts with appropriate spacing
- **Mobile**: Single-column layout with touch-friendly interactions

## 🔧 Performance Measurement Approach

### Real-World Data
- Uses Google PageSpeed Insights API for lab and field data
- Measures actual user experience metrics (Core Web Vitals)
- Provides both synthetic and real user monitoring data

### Metrics Explanation
- **First Contentful Paint (FCP)**: Time until first content appears
- **Largest Contentful Paint (LCP)**: Time until largest content element loads
- **Cumulative Layout Shift (CLS)**: Visual stability measurement
- **First Input Delay (FID)**: Interactivity responsiveness
- **Speed Index**: How quickly content is visually displayed

### Fallback Strategy
- Mock data generation when API key is not available
- Realistic performance ranges based on typical website patterns
- Maintains full functionality for demonstration purposes

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] URL validation works correctly
- [ ] Loading states display properly
- [ ] Error handling shows appropriate messages
- [ ] Results display all required metrics
- [ ] Responsive design works on all screen sizes
- [ ] API integration functions correctly

### Automated Testing (Future Enhancement)
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for API service
- E2E tests with Playwright

## 🔮 Future Enhancements

### Technical Improvements
- [ ] Add comprehensive test suite
- [ ] Implement caching for repeated URL analyses
- [ ] Add performance comparison features
- [ ] Export results to PDF/CSV
- [ ] Historical performance tracking
- [ ] Batch URL analysis

### UI/UX Enhancements
- [ ] Dark mode support
- [ ] Performance recommendations
- [ ] Interactive charts and graphs
- [ ] Performance budgets and alerts
- [ ] Social sharing of results

### Advanced Features
- [ ] Lighthouse audit details
- [ ] Mobile vs Desktop comparison
- [ ] Competitive analysis
- [ ] Performance monitoring dashboard
- [ ] API rate limiting and queuing

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📞 Contact

For questions about this project or my development approach, please reach out through the repository issues or contact information provided.

---

**Built with ❤️ using React, Next.js, and modern web development best practices.**
