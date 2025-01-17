# Changelog

All notable changes to RPGme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-17

### Added
- Initial project setup with SvelteKit, TypeScript, and TailwindCSS
- Template system foundation
  - Developer template as first example template
  - Template editor component with live preview
  - Template renderer with field type support
- Basic character sheet functionality
  - Sheet creation and editing
  - Multiple field types (text, number, progress, skills, lists, etc.)
- Component library setup
  - Base field components
  - Form controls and inputs
  - Layout components
- Internationalization support
  - English and Swedish translations
  - Language selector component
- Database schema setup with Prisma
  - User model
  - Character sheets
  - Templates
  - Achievements
- Basic routing structure
  - Home page
  - Template browsing
  - Sheet editor
  - Template editor
- UI/UX foundations
  - Responsive layout
  - Modern design system
  - Lucide icons integration
- Development infrastructure
  - ESLint configuration
  - Prettier setup
  - TypeScript configuration
  - Initial test setup with Playwright

### Infrastructure
- Project documentation
  - README with setup instructions
  - Technical stack overview
  - Development guidelines
- Development environment configuration
  - NPM scripts
  - Development database setup
  - Environment variables structure