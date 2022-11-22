type TaskError = Error | string | null;
export type TaskResult<T> = [TaskError, T];