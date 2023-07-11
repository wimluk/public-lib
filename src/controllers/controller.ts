import { Request, Response } from 'express';

class Controller {
  public getIndex = async (req: Request, res: Response) => {
    try {
      res.status(200).send('Hello World!');
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  public getApi = async (req: Request, res: Response) => {
    try {
      res.status(200).send('This is an API endpoint!');
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  public getApibyId = async (req: Request, res: Response) => {
    try {
      res.status(200).json({ id: req.params.id });
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

export default Controller;
