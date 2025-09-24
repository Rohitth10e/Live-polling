export function DashBoardHeader() {
    return (
        <div className="w-full">
            <div className="header tracking-tight flex-col justify-center items-center">
                <button className="px-4 py-1 bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white rounded-full text-sm mb-4 font-semibold">
                    ✨ Intervue Poll
                </button>
                <h1 className="text-3xl">Let's <span className="font-semibold">Get started</span></h1>
                <p className="text-zinc-500 text-sm tracking-tight">you'll have the ability to create and manage polls, ask questions, and monitor<br /> your students resonse in real-time. </p>
            </div>
        </div>
    );
}