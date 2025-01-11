# RPGme

RPGme is a social platform that lets people present themselves through customizable RPG-style character sheets. Express yourself, connect with others, and track your personal development in a fun, gamified way.

## Features (In Development)

- 🎮 Customizable RPG character sheet profiles
- 🎨 Multiple templates and themes
- 🤝 Social connections and networking
- 📊 Skill and achievement tracking
- 🛠️ Flexible layout customization
- 🔒 Privacy controls for profile sharing
- 🌐 Real-time collaboration
- 🎲 Interactive character builders

## Tech Stack

- **Frontend:**
  - SvelteKit
  - TypeScript
  - Tailwind CSS
  - Lucide Icons

- **Backend & Infrastructure:**
  - Supabase
    - PostgreSQL database
    - Authentication
    - Real-time subscriptions
  - Vercel (Deployment)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Git
- A Supabase account
- A Vercel account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rpgme.git
cd rpgme
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
- Create a new project in Supabase
- Copy the project URL and anon key
- Create a `.env` file:
```bash
PUBLIC_SUPABASE_URL="your-project-url"
PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

### Deployment

The project is configured for deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy!

## Development Status

🚧 This project is currently in early development. Initial features and architecture are being implemented.

### Current Progress
- Basic project structure with SvelteKit
- Template system implementation
- Character sheet editor
- Component library setup

See [CHANGELOG.md](CHANGELOG.md) for detailed progress updates.

## Features Coming Soon

- User authentication via Supabase
- Template sharing and discovery
- Real-time character sheet updates
- Social connections
- Achievement system
- Mobile responsiveness
- Dark mode support

## Contributing

We welcome contributions! Please feel free to open issues or submit pull requests.

### Development Guidelines
- Use TypeScript for type safety
- Follow Svelte best practices
- Maintain responsive design
- Write clear commit messages
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies
- Inspired by traditional RPG character sheets
- Powered by the Svelte ecosystem
- Enhanced by Supabase's real-time capabilities
- Community-driven development approach

---

For more information about the tools we use:
- [SvelteKit](https://kit.svelte.dev/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
