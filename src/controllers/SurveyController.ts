import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveyAlreadyExists = await surveyRepository.findOne({ title });

    if (surveyAlreadyExists) {
      return res.status(409).json({ error: "Survey title already exists" });
    }

    const newSurvey = surveyRepository.create({ title, description });

    await surveyRepository.save(newSurvey);

    return res.status(201).json(newSurvey);
  }

  async get(req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveyRepository.find();

    if (!surveys) return res.status(400).json({ error: "No surveys found" });

    return res.json(surveys);
  }
}

export { SurveyController };
