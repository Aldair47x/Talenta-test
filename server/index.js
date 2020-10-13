import bodyParser from 'body-parser';
import resultRoutes from './routes/ResultRoutes';
import config from 'dotenv';
const express = require('express');
const path = require('path'); 

config.config();

const app = express();

const DIST_DIR = path.join(__dirname, '../dist'); 
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(DIST_DIR)); 





app.use('/api/v1/results', resultRoutes);

app.get('*', function (req, res) {
   res.redirect('/');
});

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});


export default app;