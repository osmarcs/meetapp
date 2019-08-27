import app from './app';
const port = process.env.PORT || 3333;

app.listen(port, _ => console.log(`app is running on port ${port}`));
