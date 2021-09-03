import express from 'express';
import routes from './routes/api/index.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`)
});

export default app;