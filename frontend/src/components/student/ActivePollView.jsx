import React, { useState, useEffect } from 'react';

function ActivePollView({ poll, onAnswerSubmit }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!poll?.expiresAt) return;

        // Calculate the initial time remaining.
        const calculateTimeLeft = () => {
            const endTime = new Date(poll.expiresAt).getTime();
            const now = new Date().getTime();
            const difference = endTime - now;
            return Math.max(0, Math.floor(difference / 1000));
        };

        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [poll]);

    const handleSubmit = () => {
        if (selectedOption) {
            onAnswerSubmit(selectedOption);
        } else {
            alert("Please select an option before submitting.");
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full max-w-2xl">
                {/* --- Question Header --- */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Question 1</h2>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-500 font-semibold text-lg">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className='bg-white border-2 border-purple-200 rounded-2xl shadow-lg space-y-4'>
                    <div className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white p-2 rounded-tr-lg rounded-tl-lg mb-6">
                        <p className="text-lg text-center">{poll?.question || "Loading question..."}</p>
                    </div>

                    <div className="p-4">
                        {poll?.options?.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(option)}
                                className={`w-full text-left p-2 mb-2 rounded-xl transition-all duration-200 flex items-center space-x-4 border-2 ${selectedOption === option
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-sm ${selectedOption === option
                                        ? 'bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white'
                                        : 'bg-gray-300 text-gray-600'
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className={`font-medium ${selectedOption === option ? 'text-purple-800' : 'text-gray-700'}`}>
                                    {option}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Submit Button --- */}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white font-bold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedOption}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ActivePollView;

