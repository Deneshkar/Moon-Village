const LoadingSpinner = ({ fullScreen = false }) => {
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-primary-light animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 rounded-full border-b-2 border-white animate-spin" style={{ animationDuration: '2s' }}></div>
      </div>
      <p className="text-primary font-medium tracking-widest text-sm uppercase animate-pulse">
        Loading...
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="w-full py-12 flex justify-center items-center">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
