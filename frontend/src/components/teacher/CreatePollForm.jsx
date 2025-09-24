import { useState } from "react";
import api from "../../api/axios";
import { DashBoardHeader } from "../header/DashBoardHeader";
import { toast } from "react-toastify";

// This component now uses your original Figma-based design.
export default function CreatePollForm() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [timeLimit, setTimeLimit] = useState(60); // State to hold the selected time limit
    const [charCount, setCharCount] = useState(0);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 6) {
            setOptions([...options, { text: "" }]);
        }
    };

    const handleAskQuestion = async () => {
        if (!question.trim() || options.some(o => !o.text.trim()) || correctOptionIndex === null) {
            toast.warn("Please fill out the question, all options, and select a correct answer.")
            return;
        }

        try {
            await api.post("/polls", {
                question,
                options: options.map(o => o.text),
                correctOption: options[correctOptionIndex].text,
                createdBy: "teacher",
                // Use the timeLimit from state to calculate the expiration
                expiresAt: new Date(Date.now() + timeLimit * 1000)
            });
            // Reset the form after successful submission
            setQuestion("");
            setOptions([{ text: "" }, { text: "" }]);
            setCorrectOptionIndex(null);
            setCharCount(0);
        } catch (err) {
            console.error(err);
            toast.error("Error creating poll")
        }
    };

    return (
        <div className="w-full flex flex-col py-12 px-20">
            <DashBoardHeader />
            <div className="question-container mt-16 w-full">
                <div className="question-container-header flex justify-between items-center mb-6">
                    <h1 className="text-md font-semibold">Enter your question</h1>
                    <div className="relative inline-block">
                        {/* The select element is now a controlled component */}
                        <select 
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(Number(e.target.value))}
                            className="bg-zinc-200 text-black font-semibold text-sm px-5 py-2 pr-8 rounded-md outline-none appearance-none"
                        >
                            <option value={30}>30 seconds</option>
                            <option value={60}>60 seconds</option>
                            <option value={90}>90 seconds</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5.25 7.5L10 12.5L14.75 7.5H5.25Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="question-input w-full">
                    <div className="relative w-[681px]">
                        <textarea
                            className="w-full resize-none bg-zinc-100 p-5 min-h-36 outline-none text-sm font-semibold rounded-lg"
                            onChange={(e) => {
                                setCharCount(e.target.value.length);
                                setQuestion(e.target.value);
                            }}
                            value={question}
                            placeholder="Type your question here"
                            maxLength="100"
                        />
                        <span id="charCount" className="absolute bottom-3 right-5 text-xs text-gray-500">
                            {charCount}/100
                        </span>
                    </div>
                </div>
                <div className="question-choice-container mt-5 w-[660px]">
                    <div className="header flex justify-between my-4 font-semibold">
                        <h1>Edit options</h1>
                        <h1>Is it correct?</h1>
                    </div>
                    <ul className="space-y-2">
                        {options.map((option, index) => (
                            <li key={index} className="flex w-full justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <span className="flex-shrink-0 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm bg-gradient-to-r from-[#7765DA] to-[#5767D0]">{index + 1}</span>
                                    <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="p-2 bg-zinc-100 rounded-md outline-none w-80 text-sm font-semibold"
                                        placeholder="Enter option"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="correct-option"
                                            className="accent-purple-500 w-4 h-4"
                                            checked={correctOptionIndex === index}
                                            onChange={() => setCorrectOptionIndex(index)}
                                        /> Yes
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <button className="text-purple-600 p-2 rounded-md border-[1px] border-purple-600 font-semibold hover:bg-purple-50 transition" onClick={addOption}>
                        + Add more options
                    </button>
                </div>
                <div className="footer w-full mt-4 py-4 flex justify-end">
                    <button 
                        className="bg-gradient-to-r from-[#7765DA] to-[#5767D0] px-6 py-2 rounded-3xl text-white font-medium shadow-sm hover:opacity-90 transition"
                        onClick={handleAskQuestion}
                    >
                        Ask Question
                    </button>
                </div>
            </div>
        </div>
    );
}

