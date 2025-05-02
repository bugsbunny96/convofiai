# ConvofyAI Frontend

ConvofyAI is an AI-Powered Unified Communication SaaS Platform. This repository contains the frontend application built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

- Real-time chat with Socket.IO
- AI-powered conversation assistance
- Multi-channel communication
- Advanced analytics dashboard
- Mobile-first responsive design

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.1 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 3.3 + Forms Plugin
- **State Management**: Zustand
- **Real-time**: Socket.IO Client
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Authentication**: Clerk
- **Animations**: Framer Motion
- **Charts**: Chart.js via react-chartjs-2

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/convofyai/convofyai-frontend.git
   cd convofyai-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
frontend/
├── app/                 # Next.js app directory
├── components/          # Reusable components
├── contexts/           # React contexts
├── lib/               # Utility functions
├── public/            # Static assets
└── types/             # TypeScript types
```

## 🔧 Development

- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Testing**: Jest + React Testing Library

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@convofy.ai or join our [Discord community](https://discord.gg/convofy).
