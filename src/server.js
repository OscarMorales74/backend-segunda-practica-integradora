import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './passport/github.strategies.js';
// import productsRouter from './routes/products.router.js';
import apiRouter from './routes/index.js';
// import cartsRouter from './routes/carts.router.js';
// import usersRouter from './routes/users.router.js';
// import viewsRouter from './routes/views.router.js';
import mongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './path.js';
import './db/db.js';
import 'dotenv/config';
// import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(session(storeOptions));
app.use(
    session({
      secret: 'sessionKey',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 10000
      },
      store: new mongoStore({
        mongoUrl: 'mongodb+srv://OscarMor4les:f5m73booh@cluster0scarmorales.k9d156s.mongodb.net/ecommerce',
        ttl: 10,
      }),
    })
  )
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set ('views', __dirname + '/views');

//aca ingresa peticion y va a products.router.js
// app.use('/products', productsRouter);
app.use('/api', apiRouter);
// app.use('/carts', cartsRouter);
// app.use('/users', usersRouter)
// app.use('/views', viewsRouter)
// app.use('/messages', viewsRouter)

app.use(errorHandler);
//inicializamos passport a nivel de aplicacion
app.use(passport.initialize());
//vinculamos passport con express-session
app.use(passport.session());

//puerto llamado desde .env
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>
console.log(`server de 2da Practica Integradora ok on port ${PORT}`)
);



