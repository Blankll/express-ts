import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {User} from "./entity/user";

// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(express.json());

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
  console.log('service start at 3000')
  // start express server
  app.listen(3000);
});

// // create and setup express app
// const app = express();
// app.use(express.json());
//
// // register routes
//
// app.get("/users", function(req: Request, res: Response) {
//   // here we will have logic to return all users
// });
//
// app.get("/users/:id", function(req: Request, res: Response) {
//   // here we will have logic to return user by id
// });
//
// app.post("/users", function(req: Request, res: Response) {
//   // here we will have logic to save a user
// });
//
// app.put("/users/:id", function(req: Request, res: Response) {
//   // here we will have logic to update a user by a given user id
// });
//
// app.delete("/users/:id", function(req: Request, res: Response) {
//   // here we will have logic to delete a user by a given user id
// });
//
// // start express server
// app.listen(3000);
