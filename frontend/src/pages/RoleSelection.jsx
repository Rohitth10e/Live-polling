import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);


  const navigate = useNavigate();

  function handleClick() {
    if (selectedRole === "student") {
      navigate("/student")
    } else if (selectedRole === "teacher") {
      navigate("/teacher-dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightGray">
      {/* Header */}
      <div className="text-center mb-12 w-1/2">
        <button className="px-4 py-1 bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white rounded-full text-sm mb-4">
          ✨ Intervue Poll
        </button>
        <h1 className="font-montserrat text-3xl font-semibold text-darkGray">
          Welcome to the <span className="text-black">Live Polling System</span>
        </h1>
        <p className="text-mediumGray text-md">
          Please select the role that best describes you to begin using the live polling <br /> system
        </p>
      </div>

      {/* Role Cards */}
      <div className="flex gap-6 mb-8 w-full justify-center">
        <div
          className={`border rounded-lg p-6 w-1/5 cursor-pointer ${selectedRole === "student"
              ? "border-accentViolet shadow-lg"
              : "border-zinc-300 border-[1.75px]"
            }`}
          onClick={() => setSelectedRole("student")}
        >
          <h2 className="text-lg font-semibold">I’m a Student</h2>
          <p className="text-sm text-mediumGray mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </p>
        </div>

        <div
          className={`border rounded-lg p-6  w-1/5 cursor-pointer ${selectedRole === "teacher"
              ? "border-primaryPurple shadow-lg"
              : "border-zinc-300 border-[1.75px]"
            }`}
          onClick={() => setSelectedRole("teacher")}
        >
          <h2 className="text-lg font-semibold">I’m a Teacher</h2>
          <p className="text-sm text-mediumGray mt-2">
            Submit answers and view live poll results in real-time.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <button
        disabled={!selectedRole}
        onClick={handleClick}
        className={`px-10 py-3 rounded-full text-white font-medium transition 
          ${selectedRole
            ? "bg-gradient-to-r from-primaryPurple to-secondaryBlue hover:opacity-90"
            : "bg-mediumGray cursor-not-allowed"
          }`}
      >
        Continue
      </button>
    </div>
  );
};

export default RoleSelection;
