function ParticipantsPopup({ participants = [], onKick, onClose, isTeacher = false }) {
    return (
        <div 
            onClick={onClose} 
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 animate-fade-in"
        >

            <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Participants ({participants.length})</h2>
                    <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                
                <div className="p-4 max-h-80 overflow-y-auto">
                    {participants.length > 0 ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="py-2 text-gray-600">Name</th>
                                    {isTeacher && <th className="py-2 text-gray-600 text-right">Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {participants.map(p => (
                                    <tr key={p.id} className="border-t">
                                        <td className="py-3 font-medium text-gray-700">{p.name}</td>
                                        {isTeacher && (
                                            <td className="py-3 text-right">
                                                <button 
                                                    onClick={() => onKick(p.id)}
                                                    className="text-red-500 hover:text-red-700 font-semibold transition"
                                                >
                                                    Kick out
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No students have joined yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ParticipantsPopup;

