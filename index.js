const dotenv = require('dotenv');
const EventEmitter = require('events');

dotenv.config();

class JobProcessor extends EventEmitter {
  constructor(concurrency = 1) {
    super();
    this.concurrency = concurrency;
    this.jobQueue = [];
    this.activeJobs = 0;
  }

  addJob(jobFunction, ...args) {
    return new Promise((resolve, reject) => {
      const job = { jobFunction, args, resolve, reject };
      this.jobQueue.push(job);
      this.emit('jobAdded');
    });
  }

  start() {
    this.on('jobAdded', this.processQueue.bind(this));
    this.on('jobCompleted', this.processQueue.bind(this));
    this.processQueue();
  }

  async processQueue() {
    while (this.jobQueue.length > 0 && this.activeJobs < this.concurrency) {
      const { jobFunction, args, resolve, reject } = this.jobQueue.shift();
      this.activeJobs++;
      try {
        const result = await jobFunction(...args);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.activeJobs--;
        this.emit('jobCompleted');
      }
    }
  }
}

module.exports = JobProcessor;
