import {ChoiceType} from "./choice.type";

export type AnswerResponse = {
    correct: boolean;
    correctAnswer: ChoiceType;
}