import ParticipantsPopup from './ParticipantsPopup';

function TeacherResultsView({ poll, results, participants, onAskNewQuestion, onKickStudent }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    const totalVotes = Object.values(results || {}).reduce((sum, count) => sum + count, 0);

    return (
        <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Question Results</h2>
                </div>

                <div className='bg-white border-2 border-purple-200 rounded-2xl shadow-lg'>
                    <div className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white p-4 rounded-t-xl">
                        <p className="text-lg text-center">{poll.question}</p>
                    </div>
                    <div className="p-6 space-y-3">
                        {poll.options.map((option, index) => {
                            const voteCount = results[option] || 0;
                            const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                            return (
                                <div key={index} className="bg-zinc-100 border border-zinc-200 rounded-xl p-1 relative flex items-center font-medium overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl transition-all duration-500 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    ></div>

                                    <div className="relative z-10 flex items-center w-full px-4 py-2">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white rounded-full text-sm font-bold shadow-sm">
                                            {index + 1}
                                        </div>
                                        <span className="ml-4 flex-grow text-gray-700">{option}</span>
                                        <span className="font-bold text-gray-800">{percentage.toFixed(0)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* "Ask a new question" button - only shows when the poll is over */}
                {!poll.isActive && (
                    <div className="text-center mt-8">
                        <button 
                            onClick={onAskNewQuestion}
                            className="bg-gradient-to-r from-[#7765DA] to-[#5767D0] px-8 py-3 rounded-full text-white font-bold shadow-lg hover:opacity-90 transition"
                        >
                            + Ask a new question
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Chat/Participants Icon */}
            <button 
                onClick={() => setIsPopupOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#7765DA] to-[#5767D0] rounded-full shadow-xl text-white flex items-center justify-center hover:scale-110 transition-transform"
            >
                <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z" />
                </svg>
            </button>
            
            {/* Participants Popup Modal */}
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
