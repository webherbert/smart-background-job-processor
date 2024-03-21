# Smart Background Job Processor

Smart Background Job Processor is a lightweight, flexible Node.js library for managing background jobs with configurable concurrency. It allows you to queue up tasks to be executed asynchronously, managing multiple tasks in parallel while keeping your application responsive.

## Installation

To install the library, run the following command in your Node.js project:

```bash
npm install smart-background-job-processor
```

## Usage

First, require the `SmartBackgroundJobProcessor` in your project:

```javascript
const JobProcessor = require('smart-background-job-processor');
```

Create an instance of the job processor, specifying the desired concurrency level:

```javascript
const processor = new JobProcessor(2); // Allows up to 2 jobs to run concurrently
```

Define a job function that returns a promise. For example, a function that simulates a long-running task:

```javascript
const exampleJob = (x) => new Promise(resolve => setTimeout(() => resolve(x * 2), 1000));
```

Add jobs to the processor and start it:

```javascript
async function runJobs() {
processor.start();

    const results = await Promise.all([
        processor.addJob(exampleJob, 1),
        processor.addJob(exampleJob, 2),
        processor.addJob(exampleJob, 3),
    ]);

    console.log(results); // Expected output: [2, 4, 6] after approx. 2 seconds
}

runJobs();
```

## Features

- Simple API for adding jobs and managing execution.
- Configurable concurrency level.
- Asynchronous job processing with Promises.
- Event-driven architecture.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Write or adapt tests as needed.
5. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
