import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import swaggerUi from 'swagger-ui-express';

import specs from '../swagger-api.json';
import router from './routes';
import Startup from './startup';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: false,
  specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
  swaggerDocumentOptions: null,
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

