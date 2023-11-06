const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const i18n = require('i18n');
const path = require('path');
const os = require('os');

//language
const { checkLanguage } = require('./middlewares/locales.middleware');
//Routers
const authRouter = require('./routers/auth.router');
const twoFWRouter = require('./routers/twoFW.router');

const staffRouter = require('./routers/staff.router');
const khanhHangRouter = require('./routers/khanhHang.router');
const donChinhRouter = require('./routers/donChinh.router');
const quyTrinhRouter = require('./routers/quyTrinh.router');
const chartRouter = require('./routers/chart.router');

dotenv.config();
//conet DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();
//===============================================================
const app = express();

//languages
i18n.configure({
    locales: ['en', 'vi'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    objectNotation: true,
});
//io
const http = require('http');
const { Server } = require('socket.io');
//
const cors = require('cors');
const { filter } = require('compression');
app.use(cors());
//socket
const server = http.createServer(app);
//
app.use(
    compression({
        level: 6,
        threshold: 100 * 1000,
        filter: (req, res) => {
            if (req.headers['x-no-compress']) {
                return false;
            }
            return compression.filter(req, res);
        },
    }),
);
//
process.env.UV_THREADPOOL_SIZE = os.cpus().length * 0.7;

module.exports = io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

io.on('connection', (socket) => {
    //   socket.id = "dawdhiuahidawd"+1;
    // console.log(`User Connected: ${socket.id}`);
    socket.on('disconnect', () => {
        // console.log("ngat ket noi: " + socket.id);
    });
});

//language
app.use(checkLanguage);

//Run Router
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', authRouter);
app.use('/api', twoFWRouter);

app.use('/api', khanhHangRouter);
app.use('/api', staffRouter);
app.use('/api', donChinhRouter);
app.use('/api', quyTrinhRouter);
app.use('/api', chartRouter);

//===============================================================
server.listen(process.env.PORT || process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.port}`);
});
