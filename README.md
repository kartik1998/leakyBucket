## leakybucket

![](https://img.shields.io/badge/npm-v1.0.0-green) ![](https://img.shields.io/badge/leakyBucket-rate%20limit-red) ![](https://img.shields.io/badge/async-queue-orange)

#### Leaky Bucket Algorithm :

Leaky Bucket Algorithm uses a bucket or queue to hold the incoming requests. Whenever a new request arrives, it is appended to the rear of the queue, until the queue is not full.

The requests are processed at fixed time intervals in the first come first serve (FCFS) manner, i.e. old requests are the one to be executed first. If the queue is full, the remaining are dropped or leaked with a proper message or notification to the client.

## Usage

```
const express = require('express');
const app = express();
const { rateLimiter } = require('leakybucket-rate-limiter');

const concurrentRequests = 5;
const queueLengthLimit = 15;

app.use(rateLimiter(concurrentRequests, queueLengthLimit));

// By default concurrentRequests = 1 and queueLengthLimit = 2

app.get('/', (req, res) => {
  res.json({ msg: 'AoK' });
});

app.listen(5000, () => {
  console.log('Server setup on PORT', 5000);
});

```
