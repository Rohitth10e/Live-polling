
function Results({ question = 'Loading Question...', options = [], results = {} }) {

    const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full max-w-2xl ">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Question 1</h2>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-500 font-semibold text-lg">00:00</span>
                    </div>
                </div>

                <div className='bg-white border-2 border-purple-200 rounded-2xl shadow-lg space-y-4'>
                    <div className="bg-gradient-to-r from-zinc-800 to-zinc-600 text-white p-3 rounded-tr-lg rounded-tl-lg mb-6">
                        <p className="text-lg text-center">{question}</p>
                    </div>
                    <div className="p-4">
                        {options.length === 0 ? <p className="text-center text-gray-500">Awaiting results...</p> :

                            options.map((option, index) => {
                                const voteCount = results[option] || 0;
                                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                                return (
                                    <div key={index} className="bg-zinc-100 border-[1px] border-zinc-200 rounded-xl p-1 relative flex items-center text-gray-800 font-medium overflow-hidden mb-3">
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



                <p className="text-center text-gray-600 mt-8 font-semibold">
                    Wait for the teacher to ask a new question...
                </p>
            </div>
        </div>
    );
}

export default Results;

