const async = require('async');
let queueSize = 0;
let q_maxQueueSize = 2;
let q_concurrentRequests = 1;

const requestsQueue = async.queue((task, callback) => {
  dummyFunction(task, callback);
}, q_concurrentRequests);

const addToRequestsQueue = (req, res, next) => {
  if (queueSize > q_maxQueueSize) {
    res.status(400).json({ err: 'Request Queue Limit Reached.' });
  }
  queueSize++;
  const task = {
    req,
    res,
    next,
  };
  requestsQueue.push(task, (err) => {
    if (err) {
      return console.log('Error in adding task to queue');
    }
  });
};

const dummyFunction = async (task, callback) => {
  const { next } = task;
  next();
  queueSize--;
  callback();
};

const rateLimiter = (concurrentRequests, maxQueueSize) => async (req, res, next) => {
  q_concurrentRequests = concurrentRequests;
  q_maxQueueSize = maxQueueSize;
  addToRequestsQueue(req, res, next);
};

module.exports = { rateLimiter };
