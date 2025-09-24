import { useState } from "react"
import { useNavigate } from "react-router-dom";

function EnterName({ onSubmit = () => {} }) {

    const [name, setName] = useState("");
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
            console.log("not working?")
        }
        // if (typeof onSubmit === "function") {
        //     onSubmit(name.trim());
        // } else {
        //     console.warn("onSubmit is not a function");
        //     console.log("onSubmit type:", typeof onSubmit);
        // }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-12">
            <div className="header text-center">
                <button className="px-4 py-1 bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white rounded-full text-sm mb-4 font-semibold">
                    ✨ Intervue Poll
                </button>
                <h1 className="text-3xl">
                    Let's <span className="font-semibold">Get Started</span>
                </h1>
                <p className="text-md text-zinc-500 mt-5 font-jakarta">If you're a student you'll be able to <span className="font-bold font-jakarta text-black">submit your answers,</span> participate in live<br /> polls, and see how you'r responses compare with your classmates</p>
            </div>
            <div className="name-input-section mt-10">
                <div>
                    <h1 className="text-black font-semibold text-lg mb-2">Enter your name</h1>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-zinc-100 p-2 w-[320px] outline-none" placeholder="your name" />
                </div>
            </div>

            <div className="submit-button-container mt-16">
                <button className="bg-gradient-to-r from-[#7765DA] to-[#5767D0] px-6 py-2 rounded-3xl border border-transparent text-white font-medium shadow-sm hover:opacity-90 transition"
                    onClick={handleSubmit}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default EnterName