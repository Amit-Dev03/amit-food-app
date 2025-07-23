// OfflineIndicator component displays a message when the user is offline.
const OfflineIndicator = () => {
  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* SVG icon for visual indication of offline status */}
        <svg
          className="mx-auto h-16 w-16 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>

        {/* Heading for the offline message */}
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          Looks like you're offline 🤨
        </h1>

        {/* Descriptive paragraph for the user */}
        <p className="mt-2 text-base text-gray-600">
          Check your internet connection and try again!
        </p>
      </div>
    </div>
  );
};

export default OfflineIndicator;
