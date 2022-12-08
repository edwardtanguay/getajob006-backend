import express from 'express';
import cors from 'cors';
import * as model from './model.js';

const app = express();
app.use(cors());
const port = 3011;

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructionsHtml());
});

app.get('/jobs', (req: express.Request, res: express.Response) => {
	res.json(model.getJobs());
});

app.get('/todos', (req: express.Request, res: express.Response) => {
	res.json(model.getTodos());
});

app.get('/totaledSkills', (req: express.Request, res: express.Response) => {
	res.json(model.getTotaledSkills());
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});