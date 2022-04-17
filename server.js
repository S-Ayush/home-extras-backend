import 'dotenv/config';
import app from './src/app';

import { connectDb } from './src/lib/mongo';

const startServer = () => {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
  });
};

(async () => {
  await connectDb();
  startServer();
})();
