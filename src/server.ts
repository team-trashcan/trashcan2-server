import config from "./config";
import app from "./app";

const server = async (): Promise<void> => {
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

server().catch((error: Error) => {
  setTimeout(server, 5000);
  console.log(error);
});
