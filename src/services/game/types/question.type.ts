import {ChoiceType} from "./choice.type";

export type QuestionType = {
    choices: ChoiceType[];
    answer: ChoiceType | null;
    trackUrl: string;
}