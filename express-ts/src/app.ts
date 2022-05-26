import express, {Request, Response} from "express";
import {createConnection} from "typeorm";
import {User} from "./entity/user";
import cors from "cors";

// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(express.json());
  app.use(cors({origin: true, credentials: true}))

  // register routes

  app.get("/users", async function(req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  app.get("/users/:id", async function(req: Request, res: Response) {
    const results = await userRepository.findOne(req.params.id);
    return res.send(results);
  });

  app.post("/users", async function(req: Request, res: Response) {
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.put("/users/:id", async function(req: Request, res: Response) {
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.delete("/users/:id", async function(req: Request, res: Response) {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  });
  app.get('/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.post('/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.put('/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.delete('/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.trace('/cookie/tst', (eq: Request, res: Response) => {
    res.json({message: `success ${eq.method}`});
  })
  app.post('/setcookie', (eq: Request, res: Response) => {
    res.cookie('strictCookie', 'strictCookie', {
      httpOnly: true,
      secure: true,
      maxAge: 3600*100,
      sameSite: 'strict',
      domain: '.express-ts.com'
    });
    res.cookie('laxSiteCookie', 'laxSiteCookie', {
      httpOnly: true,
      secure: true,
      maxAge: 3600*100,
      sameSite: 'lax',
      domain: '.express-ts.com'
    });
    res.cookie('laxUnsecureSiteCookie', 'sameSiteval', {
      httpOnly: true,
      secure: true,
      maxAge: 3600*100,
      sameSite: 'lax',
      domain: '.express-ts.com'
    });
    res.cookie('noneSecureSiteCookie', 'noneSiteCookie', {
      httpOnly: true,
      secure: true,
      maxAge: 3600*100,
      sameSite: 'none',
      domain: '.express-ts.com'
    });
    res.cookie('noneSiteCookie', 'noneSiteCookie', {
      secure: true,
      maxAge: 3600*100,
      sameSite: 'none',
      domain: '.express-ts.com'
    });
  });

  console.log('service start at 80')
  // start express server
  app.listen(80);
});
