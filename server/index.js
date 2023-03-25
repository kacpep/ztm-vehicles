const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(helmet());

app.get("/api/tabel", require("./tabels/tabel"));
app.get("/api/tabels", require("./tabels/all"));

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});