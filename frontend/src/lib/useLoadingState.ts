import { useState, useCallback } from 'react';
import { ApiError } from './api';
import { getErrorMessage, isRetryableError, getRetryDelay } from './errorHandling';

export interface LoadingState<T = any> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  isSuccess: boolean;
}

export interface UseLoadingStateOptions {
  autoReset?: boolean;
  resetDelay?: number;
  maxRetries?: number;
}

export function useLoadingState<T = any>(options: UseLoadingStateOptions = {}) {
  const {
    autoReset = false,
    resetDelay = 5000,
    maxRetries = 3,
  } = options;

  const [state, setState] = useState<LoadingState<T>>({
    isLoading: false,
    error: null,
    data: null,
    isSuccess: false,
  });

  const [retryCount, setRetryCount] = useState(0);

  // Reset state
  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      data: null,
      isSuccess: false,
    });
    setRetryCount(0);
  }, []);

  // Set loading
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
      error: loading ? null : prev.error,
    }));
  }, []);

  // Set error
  const setError = useCallback((error: unknown) => {
    const errorMessage = getErrorMessage(error);
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: errorMessage,
      isSuccess: false,
    }));

    // Auto reset error after delay
    if (autoReset && resetDelay > 0) {
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          error: null,
        }));
      }, resetDelay);
    }
  }, [autoReset, resetDelay]);

  // Set success
  const setSuccess = useCallback((data: T) => {
    setState({
      isLoading: false,
      error: null,
      data,
      isSuccess: true,
    });

    // Auto reset success after delay
    if (autoReset && resetDelay > 0) {
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          isSuccess: false,
        }));
      }, resetDelay);
    }
  }, [autoReset, resetDelay]);

  // Execute async operation with loading state
  const execute = useCallback(async <R>(
    operation: () => Promise<R>,
    options?: {
      onSuccess?: (data: R) => void;
      onError?: (error: unknown) => void;
      retryOnError?: boolean;
    }
  ) => {
    const { onSuccess, onError, retryOnError = false } = options || {};

    setLoading(true);
    setError(null);

    try {
      const result = await operation();
      setSuccess(result as T);
      onSuccess?.(result);
      return result;
    } catch (error) {
      const shouldRetry = retryOnError && 
        retryCount < maxRetries && 
        isRetryableError(error);

      if (shouldRetry) {
        const delay = getRetryDelay(error, retryCount + 1);
        setRetryCount(prev => prev + 1);
        
        setTimeout(() => {
          execute(operation, options);
        }, delay);
        
        return;
      }

      setError(error);
      onError?.(error);
      throw error;
    }
  }, [retryCount, maxRetries, setLoading, setError, setSuccess]);

  // Retry last operation
  const retry = useCallback(() => {
    if (state.error && retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      // Note: This would need the last operation to be stored
      // For now, just reset the error
      setState(prev => ({
        ...prev,
        error: null,
      }));
    }
  }, [state.error, retryCount, maxRetries]);

  return {
    ...state,
    retryCount,
    setLoading,
    setError,
    setSuccess,
    execute,
    retry,
    reset,
  };
}
