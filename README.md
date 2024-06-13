# Dicoding Jobs Capstone Frontend
This project is a web application built using JavaScript, Next.js, and Tailwind CSS. It leverages the power of Google Cloud Run for deployment, ensuring a scalable and reliable infrastructure. The project also utilizes Docker for containerization and Git for version control.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Libraries](#libraries)
3. [Tools](#tools)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Docker Setup](#docker-setup)
8. [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Google Cloud SDK](https://cloud.google.com/sdk)

And also ensrue you have deployed the backend service:

- [Dicoding Jobs Capstone Backend API](https://github.com/CapstoneDicoding/backend-capstone-dicoding)

## Libraries

These are main libraries that are used to create the frontend service

- [Next.Js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Tools

- **Git:** Version control system.
- **Docker:** Containerization platform.
- **Google Cloud SDK:** CLI tools for interacting with Google Cloud services.


## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/CapstoneDicoding/frontend-dicoding-jobs
    cd frontend-dicoding-jobs
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

## Configuration

**Update Backend url**

Update variable `BASE_API_URL` in `config/index.js` file with your backend service url.


## Running the Application


1. **Start the application:**

    ```sh
    npm run build
    npm run start
    ```
2. **Development Mode:**

    ```sh
    npm run dev
    ```

## Docker Setup

1. **Build the Docker image:**

    ```sh
    docker build -t your-app-name .
    ```

2. **Run the Docker container:**

    ```sh
    docker run -p 3000:3000 your-app-name
    ```

## Deployment

### Cloud Run

1. **Create new Arifacts repository**
    ```sh
    gcloud artifacts repositories create your-repository-name --repository-format=docker --location=asia-southeast2 --async
    ```

2. **Build and push your Docker image to Google Container Registry:**

    ```sh
    gcloud builds submit --tag asia-southeast2-docker.pkg.dev/your-project-id/your-repository-name/your-app-name:tag
    ```

3. **Deploy to Cloud Run:**

    ```sh
    gcloud run deploy --image asia-southeast2-docker.pkg.dev/your-project-id/your-repository-name/your-app-name:tag
    ```

    Follow the prompts to set the region and allow unauthenticated invocations if required.

