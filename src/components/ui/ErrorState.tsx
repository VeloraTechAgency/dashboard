interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl mb-4">⚠️</span>
      <h3 className="text-lg font-semibold text-red-400 font-display">
        Something went wrong
      </h3>
      <p className="mt-1 text-sm text-navy-400 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm rounded-lg bg-navy-700 text-navy-200 hover:bg-navy-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
