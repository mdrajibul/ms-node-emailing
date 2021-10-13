import cors from 'cors';
import express from 'express';
import expressOasGenerator from 'express-oas-generator';
import swaggerUi from 'swagger-ui-express';

import specs from '../swagger-api.json';
import router from './routes';
import Startup from './startup';

const app = express();

expressOasGenerator.handleResponses(app, {
  specOutputPath: './swagger-api.json',
  alwaysServeDocs: true,
  specOutputFileBehavior: 'RECREATE',
  swaggerDocumentOptions: null
});

/** add cors middleware */
app.use(cors());

/** add router as middleware */
app.use(router);

expressOasGenerator.handleRequests();

/** add swagger explorer as default route */
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

/** start application */
Startup.start(app);

export default app;

