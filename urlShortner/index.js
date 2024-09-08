const express = require('express');
const path = require('path');
const app = express();
const PORT = 2003;
const { handleConnection } = require('./connect');
const URL = require('./model/url');
const urlRoute = require('./routes/url'); 
const staticRoute = require('./routes/staticRouter'); 
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middleware/auth');

// Connect to MongoDB
handleConnection('mongodb://localhost:27017/shorted-url')
    .then(() => console.log('Mongodb Connected successfully'))
    .catch((error) => console.log("Error occurred:", error));

// Set up view engine and static file directory
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Use routers
app.use('/url',restrictToLoggedInUserOnly, urlRoute);
app.use('/user', userRoute);
app.use("/", staticRoute);

// Redirect based on shortId
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timeStamp: Date.now(),
            },
        },
    });
    if (!entry) return res.json({ message: "No entry" });
    res.redirect(entry.redirectUrl);
});

// Start the server
app.listen(PORT, () => console.log(`Server is connected at port : ${PORT}`));
