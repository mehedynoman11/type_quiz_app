import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div className="card">
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <div key={answer} className="answer-wrapper">
          <button
            disabled={!!userAnswer}
            value={answer}
            onClick={callback}
            className="answer-button"
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
          {userAnswer &&
            userAnswer.correctAnswer === answer &&
            userAnswer.correct && (
              <span style={{ color: "green", marginLeft: "10px" }}>
                &#10004;
              </span>
            )}
          {userAnswer &&
            userAnswer.answer === answer &&
            !userAnswer.correct && (
              <span style={{ color: "red", marginLeft: "10px" }}>&#10060;</span>
            )}
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
