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

## 🎯 Accessibility Guidelines

### Core Principles

1. **Semantic HTML**
   - Use appropriate HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
   - Maintain proper heading hierarchy (`h1` → `h6`)
   - Use ARIA landmarks when semantic HTML isn't sufficient

2. **Keyboard Navigation**
   - All interactive elements must be focusable
   - Maintain logical tab order
   - Provide visible focus indicators
   - Support keyboard shortcuts where appropriate

3. **Screen Reader Support**
   - Add descriptive `aria-label` attributes
   - Use `aria-hidden` for decorative elements
   - Provide text alternatives for images
   - Announce dynamic content changes

4. **Color & Contrast**
   - Maintain WCAG 2.1 AA contrast ratios
   - Don't rely solely on color to convey information
   - Provide alternative indicators for status/state

### Component Usage

#### Dialog

```tsx
import { Dialog } from '@/components/ui/Dialog';

<Dialog open={isOpen} onClose={onClose} title="Dialog Title">
  <div className="mt-2">
    <p className="text-sm text-gray-500">
      Dialog content goes here.
    </p>
  </div>

  <div className="mt-6 flex justify-end gap-3">
    <button
      type="button"
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={onClose}
    >
      Cancel
    </button>
    <button
      type="button"
      className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={onConfirm}
    >
      Confirm
    </button>
  </div>
</Dialog>
```

#### Tooltip

```tsx
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';

// Wrap your app with TooltipProvider
<TooltipProvider>
  <App />
</TooltipProvider>

// Basic usage
<TooltipRoot>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip content</TooltipContent>
</TooltipRoot>

// With custom positioning
<TooltipContent side="right" sideOffset={8}>
  Custom positioned tooltip
</TooltipContent>
```

### Loading States

Use the `Spinner` component for loading states:

```tsx
import { Spinner } from '@/components/ui/Spinner';

// Basic usage
<Spinner />

// With size
<Spinner size="sm" />
<Spinner size="lg" />

// With color
<Spinner className="text-primary" />
```

### Error States

Use the `ErrorState` component for error handling:

```tsx
import { ErrorState } from '@/components/ui/ErrorState';

// Basic usage
<ErrorState
  title="Error Loading Data"
  message="There was a problem loading your data. Please try again."
  action={
    <button onClick={retry}>Retry</button>
  }
/>
```

### Empty States

Use the `EmptyState` component for empty data states:

```tsx
import { EmptyState } from '@/components/ui/EmptyState';

// Basic usage
<EmptyState
  message="No items found"
  icon={<Icon />}
  action={
    <button onClick={createNew}>Create New</button>
  }
/>
```

## 🎨 Design System

### Colors

- Primary: `#1A73E8`
- Success: `#34A853`
- Warning: `#FBBC04`
- Error: `#EA4335`
- Gray Scale: `#FFFFFF` → `#000000`

### Typography

- Headings: Inter
- Body: Inter
- Monospace: JetBrains Mono

### Spacing

- Base unit: 4px
- Common spacings: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

### Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## 🚀 Getting Started

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

## 📝 Testing

Run tests:
```bash
npm test
```

Run accessibility tests:
```bash
npm run test:a11y
```

## 🔍 Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Husky for pre-commit hooks

## 📚 Additional Resources

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
