# Skyreach Frontend (Next.js + shadcn/ui)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Structure

```
app/
├── globals.css       # Global styles + Tailwind
├── layout.tsx        # Root layout
├── page.tsx          # Main website home
└── landing/
    └── page.tsx      # High-converting landing page

components/
├── ui/               # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   └── badge.tsx
├── Header.tsx
├── Hero.tsx
├── Services.tsx
├── WhyUs.tsx
├── Stats.tsx
├── Process.tsx
├── Testimonials.tsx
├── CTA.tsx
├── Contact.tsx
└── Footer.tsx

lib/
└── utils.ts          # Utility functions (cn)
```

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Main multi-page website |
| `/landing` | High-converting PPC landing page |

## 🎨 Customizing shadcn Components

Components are in `components/ui/` and can be modified directly.

## 📝 Adding New Components

```bash
npx shadcn-ui@latest add [component-name]
```

Available components: https://ui.shadcn.com/docs/components
