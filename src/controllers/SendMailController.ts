import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";

import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      return res.status(400).json({ error: "Survey doest not exist" });
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id,
    });

    await surveysUsersRepository.save(surveyUser);

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    };

    await SendMailService.execute(email, variables, npsPath);

    res.status(201).json(surveyUser);
  }
}

export { SendMailController };
