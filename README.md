# Professional Bio Generator

A modern web application that helps users generate professional bios and summaries based on their personal information, skills, career history, and education.

## Features

- Interactive form to input personal information
- Skills management
- Career history tracking
- Education history tracking
- AI-powered professional bio generation
- Modern, responsive UI
- Real-time form validation
- Clean and intuitive user interface

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls

### Backend
- FastAPI (Python)
- Ollama for AI text generation
- CORS middleware for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- Ollama installed and running locally

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### POST /getSummary
Generates a professional bio based on user input.

**Request Body:**
```json
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "about": "string"
  },
  "skills": "string",
  "career": [
    {
      "company": "string",
      "position": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "graduationYear": "string",
      "description": "string"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Generated professional bio"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ollama for providing the AI text generation capabilities
- FastAPI for the robust backend framework
- React and Tailwind CSS for the modern frontend implementation 