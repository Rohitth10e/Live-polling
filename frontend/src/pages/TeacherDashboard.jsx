import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActivePoll, setResults } from '../store/pollSlice';
import socket from '../api/socket';

import TeacherResultsView from '../components/teacher/TeacherResultsView';
import CreatePollForm from '../components/teacher/CreatePollForm';
import ParticipantsPopup from '../components/teacher/ParticipantsPopup';

export function TeacherDashboard() {
    const dispatch = useDispatch();
    const activePoll = useSelector((state) => state.poll.activePoll);
    const results = useSelector((state) => state.poll.results);

    const [participants, setParticipants] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        socket.connect();
        socket.emit('teacher_join');

        socket.on('newPoll', (pollData) => {
            dispatch(setActivePoll(pollData));
            dispatch(setResults({}));
        });

        socket.on('updateResults', (pollData) => {
            const voteCounts = pollData.options.reduce((acc, option) => {
                acc[option] = 0;
                return acc;
            }, {});
            pollData.answers.forEach(answer => {
                if (voteCounts[answer.option] !== undefined) {
                    voteCounts[answer.option]++;
                }
            });
            dispatch(setResults(voteCounts));
        });

        socket.on('pollEnded', (endedPoll) => {
            dispatch(setActivePoll({ ...endedPoll, isActive: false }));
        });

        socket.on('update_participants', (participantList) => {
            setParticipants(participantList);
        });
        return () => {
            socket.off('newPoll');
            socket.off('updateResults');
            socket.off('pollEnded');
            socket.off('update_participants');
        };
    }, [dispatch]);

    const handleAskNewQuestion = () => {
        dispatch(setActivePoll(null));
        dispatch(setResults({}));
    };

    const handleKickStudent = (studentId) => {
        if (window.confirm("Are you sure you want to kick this student?")) {
            socket.emit('kick_student', studentId);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50 p-8">
            <div className="w-full max-w-4xl mx-auto">
                {activePoll ? (
                    <div className="animate-fade-in">
                        <TeacherResultsView
                            poll={activePoll}
                            results={results}
                            participants={participants}
                            onAskNewQuestion={handleAskNewQuestion}
                            onKickStudent={handleKickStudent}
                            socket={socket}
                        />


                        {/* {!activePoll.isActive && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={handleAskNewQuestion}
                                    className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white font-bold shadow-lg hover:opacity-90 transition-opacity"
                                >
                                    + Ask a new question
                                </button>
                            </div>
                        )} */}
                    </div>
                ) : (
                    <CreatePollForm />
                )}
            </div>

            {/* <button
                onClick={() => setIsPopupOpen(true)}
                className="fixed bottom-8 right-8 w-8 h-8 bg-gradient-to-r from-[#7765DA] to-[#5767D0] rounded-full shadow-xl text-white flex items-center justify-center hover:scale-110 transition-transform"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z" />
                </svg>
            </button> */}
            {/* {isPopupOpen && (
                <ParticipantsPopup
                    participants={participants}
                    onKick={handleKickStudent}
                    onClose={() => setIsPopupOpen(false)}
                    isTeacher={true}
                />
            )} */}
        </div>
    );
}

