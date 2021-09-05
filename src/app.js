import express from 'express';
import routes from './routes/api/index.js';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`)
});

export default app;