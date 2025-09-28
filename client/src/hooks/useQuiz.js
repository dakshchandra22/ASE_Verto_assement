import { useState, useCallback } from 'react';
import ApiService from '../utils/api';
import { ROUTES } from '../constants';

export const useQuiz = () => {
  const [currentPage, setCurrentPage] = useState(ROUTES.USER_DETAILS);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const startQuiz = useCallback(async (userData) => {
    setLoading(true);
    setUserDetails(userData);
    
    try {
      const data = await ApiService.startQuiz(userData);
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
      setSessionId(data.sessionId);
      setCurrentPage(ROUTES.QUIZ);
    } catch (error) {
      console.error('Error starting quiz:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ApiService.submitAnswers(answers, sessionId);
      setResults(data);
      setCurrentPage(ROUTES.RESULTS);
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [answers, sessionId]);

  const resetQuiz = useCallback(() => {
    setCurrentPage(ROUTES.USER_DETAILS);
    setQuestions([]);
    setAnswers([]);
    setResults(null);
    setSessionId(null);
    setUserDetails(null);
  }, []);

  const updateAnswer = useCallback((questionIndex, optionId) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = {
        questionId: questions[questionIndex].id,
        optionId: optionId
      };
      return newAnswers;
    });
  }, [questions]);

  return {
    currentPage,
    questions,
    answers,
    results,
    loading,
    sessionId,
    userDetails,
    startQuiz,
    submitAnswers,
    resetQuiz,
    updateAnswer,
  };
};

