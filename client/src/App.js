import React from 'react';
import './App.css';
import { useQuiz } from './hooks/useQuiz';
import UserDetailsPage from './components/UserDetailsPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { ROUTES } from './constants';

function App() {
  const {
    currentPage,
    questions,
    answers,
    results,
    loading,
    startQuiz,
    submitAnswers,
    resetQuiz,
    updateAnswer,
  } = useQuiz();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case ROUTES.USER_DETAILS:
        return (
          <UserDetailsPage 
            onStart={startQuiz} 
            loading={loading} 
          />
        );
      case ROUTES.QUIZ:
        return (
          <QuizPage
            questions={questions}
            answers={answers}
            onAnswerChange={updateAnswer}
            onSubmit={submitAnswers}
            loading={loading}
          />
        );
      case ROUTES.RESULTS:
        return (
          <ResultsPage
            results={results}
            questions={questions}
            onRestart={resetQuiz}
          />
        );
      default:
        return (
          <UserDetailsPage 
            onStart={startQuiz} 
            loading={loading} 
          />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;