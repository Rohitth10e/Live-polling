import React, { useState, useEffect } from 'react';
import ParticipantsPopup from './ParticipantsPopup';


function TeacherResultsView({ poll, results, participants, onAskNewQuestion, onKickStudent }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);


    useEffect(() => {

        if (!poll?.expiresAt || !poll?.isActive) {
            setTimeLeft(0);
            return;
        }

        const calculateTimeLeft = () => {
            const difference = +new Date(poll.expiresAt) - +new Date();
            return difference > 0 ? Math.floor(difference / 1000) : 0;
        };


        setTimeLeft(calculateTimeLeft());


        const timerInterval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [poll]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };
    
    const totalVotes = Object.values(results || {}).reduce((sum, count) => sum + count, 0);

    return (
        <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-2xl">

                <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-2xl font-bold text-gray-800">Question</h2>
                    {poll.isActive && (
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {/* <span className="text-red-500 font-semibold text-lg">{formatTime(timeLeft)}</span> */}
                        </div>
                    )}
                </div>


                <div className='bg-white border-2 border-purple-200 rounded-2xl shadow-lg'>
                    <div className="bg-gray-700 text-white p-6 rounded-t-[14px]">
                        <p className="text-lg text-center font-medium">{poll.question}</p>
                    </div>

                    <div className="p-6 space-y-4">
                        {poll.options.map((option, index) => {
                            const voteCount = results[option] || 0;
                            const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                            return (
                                <div key={index} className="bg-gray-100 rounded-xl p-1 relative flex items-center text-gray-800 font-medium overflow-hidden border border-gray-200">

                                    <div
                                        className="absolute top-0 left-0 h-full bg-purple-500 rounded-lg transition-all duration-500 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    ></div>

                                    <div className="relative z-10 flex items-center w-full px-4 py-2">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full text-sm font-bold shadow-sm">
                                            {index + 1}
                                        </div>
                                        <span className="ml-4 flex-grow text-gray-800">{option}</span>
                                        <span className="font-bold text-gray-900">{percentage.toFixed(0)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {!poll.isActive && (
                    <div className="text-center mt-2">
                        <button 
                            onClick={onAskNewQuestion}
                            className="bg-gradient-to-r from-[#7765DA] to-[#5767D0] px-8 py-3 rounded-full text-white font-bold shadow-lg hover:opacity-90 transition"
                        >
                            + Ask a new question
                        </button>
                    </div>
                )}
            </div>

            <button 
                onClick={() => setIsPopupOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#7765DA] to-[#5767D0] rounded-full shadow-xl text-white flex items-center justify-center hover:scale-110 transition-transform"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z" />
                </svg>
            </button>
            

            {isPopupOpen && (
                <ParticipantsPopup 
                    participants={participants}
                    onKick={onKickStudent}
                    onClose={() => setIsPopupOpen(false)}
                    isTeacher={true}
                />
            )}
        </div>
    );
}

export default TeacherResultsView;

