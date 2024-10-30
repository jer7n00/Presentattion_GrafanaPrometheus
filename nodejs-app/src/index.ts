import express from 'express';
import client from 'prom-client';
const cors = require('cors');


const app = express();
const port = 3001;
app.use(cors());

// Initialize Prometheus metrics registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Create a custom counter metric
const requestCounter = new client.Counter({
  name: 'api_request_count',
  help: 'Total number of requests to the API',
});
register.registerMetric(requestCounter);

// Endpoint that increments the counter and responds with a message
app.get('/message', (req, res) => {
  requestCounter.inc();  // Increment the request counter
  res.json({ message: 'Hello from Node.js API!' });
  
});

// Endpoint to expose metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
