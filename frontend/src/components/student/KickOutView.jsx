import React from 'react';

function KickedOutView() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-12 text-center font-sans">
            <div className="header">
                <button className="px-4 py-1 bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white rounded-full text-sm mb-6 font-semibold shadow-md">
                    ✨ Intervue Poll
                </button>
                <h1 className="text-4xl font-bold text-gray-800">
                    You've been Kicked out !
                </h1>
                <p className="text-md text-zinc-500 mt-4 max-w-md">
                    Looks like the teacher had removed you from the poll system. Please Try again sometime.
                </p>
            </div>
        </div>
    );
}

export default KickedOutView;
