import path from 'node:path';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
