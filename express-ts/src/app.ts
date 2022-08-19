import express, {Request, Response} from "express";
import {createConnection} from "typeorm";
import {User} from "./entity/user";
import cors from "cors";
import moment from "moment";

// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(express.json());
  app.use(cors({origin: true, credentials: true}))

  // register routes

  app.get("/api/users", async function(req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });
  
  app.get("/api/moment", async function(req: Request, res: Response) {
    const dateTimeString = '2018-04-12T03:55:58.998Z';
    const is2Valid = moment(dateTimeString, "YY-MM-DDTHH:mm:ss.SSSZ", true).isValid();
    const is3Valid = moment(dateTimeString, "YYY-MM-DDTHH:mm:ss.SSSZ", true).isValid();
    const is4Valid = moment(dateTimeString, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid();

    res.json({is2Valid, is3Valid, is4Valid });
  });

  app.get("/api/users/:id", async function(req: Request, res: Response) {
    const results = await userRepository.findOne(req.params.id);
    return res.send(results);
  });

  app.post("/api/users", async function(req: Request, res: Response) {
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.put("/api/users/:id", async function(req: Request, res: Response) {
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.delete("/api/users/:id", async function(req: Request, res: Response) {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  });
  app.get('/api/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.post('/api/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.put('/api/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.delete('/api/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.trace('/api/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.post('/api/setcookie', (eq: Request, res: Response) => {
    res.cookie('strictCookie', 'strictCookie', {
      httpOnly: true,
      maxAge: 3600*100,
      sameSite: 'strict',
      domain: '.express-ts.com'
    });
    res.cookie('laxSiteCookie', 'laxSiteCookie', {
      httpOnly: true,
      maxAge: 3600*100,
      sameSite: 'lax',
      domain: '.express-ts.com'
    });
    res.cookie('noneSecureSiteCookie', 'noneSiteCookie', {
      httpOnly: true,
      maxAge: 3600*100,
      sameSite: 'none',
      domain: '.express-ts.com'
    });
    res.cookie('noneSiteCookie', 'noneSiteCookie', {
      maxAge: 3600*100,
      sameSite: 'none',
      domain: '.express-ts.com'
    });
    res.cookie('strictOtherSiteCookie', 'strictOtherSiteCookie', {
      httpOnly: true,
      maxAge: 3600*100,
      sameSite: 'strict',
      domain: '.google.com'
    });
    res.cookie('laxOtherSiteCookie', 'laxOtherSiteCookie', {
      httpOnly: true,
      maxAge: 3600*100,
      sameSite: 'lax',
      domain: '.google.com'
    });
    res.send()
  });

  console.log('service start at 80')
  // start express server
  app.listen(80);
});
