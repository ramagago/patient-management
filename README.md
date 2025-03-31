# Patient Management System

A modern React application for managing patient records with a clean and intuitive user interface.

## Features

- View a list of patient records in a card-based layout
- Add new patients with detailed information
- Edit existing patient records
- Delete patient records
- Expandable patient cards with additional details
- Form validation for accurate data entry
- Responsive design for all screen sizes
- Smooth animations and transitions

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Yup (form validation)
- Framer Motion (animations)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd patient-management
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
patient-management/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── PatientCard.tsx
│   │   └── PatientForm.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── patient.ts
│   ├── App.tsx
│   └── index.css
├── package.json
└── README.md
```

## Development

- The application uses TypeScript for type safety
- Tailwind CSS for styling
- React Hook Form with Yup for form handling and validation
- Framer Motion for smooth animations
- Mock API service for data management

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
