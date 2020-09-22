const { setupServer } = require("./app");
const app = setupServer();

const port = 9000 || process.env.PORT;

app.listen(port, () => {
  console.log(`We are lisning ${port}`);
});
