import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import socket from '../api/socket'
import { setActivePoll, setResults } from '../store/pollSlice';
import EnterName from '../components/student/EnterName';
import api from '../api/axios';
import Results from '../components/student/Results';
import ActivePollView from '../components/student/ActivePollView';

function StudentPage() {

    const [studentName, setStudentName] = useState(null)
    const [hasVoted, setHasVoted] = useState(false)
    const [wasKicked, setWasKicked] = useState(false);
    const dispatch = useDispatch();

    const activePoll = useSelector((state) => state.poll.activePoll)
    const results = useSelector((state) => state.poll.results)

    function handleNameSubmit(name) {
        setStudentName(name)
        socket.connect()
        socket.emit('student_join', { name })
    }

    async function handleAnswerSubmit(option) {
        if (hasVoted) return
        try {
            await api.post(`/polls/${activePoll._id}/answer`, { studentName, option })
            setHasVoted(true)
        } catch (err) {
            console.error("something went wrong: ", err)
            alert(err.response?.data?.error || "could not submit answer")
        }
    }

    useEffect(() => {
        if (studentName && !wasKicked) {
            socket.on("newPoll", (data) => {
                console.log("server sent new poll data: ", data)
                dispatch(setActivePoll(data))
                setHasVoted(false);
            });

            socket.on("updateResults", (data) => {
                console.log("server sent updated results: ", data)
                const voteCounts = data.options.reduce((acc, option) => {
                    acc[option] = 0
                    return acc;
                }, {})
                data.answers.forEach(answer => {
                    if (voteCounts[answer.option] !== undefined) {
                        voteCounts[answer.option]++
                    }
                })
                dispatch(setResults(voteCounts))
            })

            socket.on("pollEnded", (data) => {
                dispatch(setActivePoll({ ...data, isActive: false }))
            })

            socket.on('kicked', () => {
                setWasKicked(true);
                socket.disconnect();
            });

            console.log(activePoll?.question, activePoll?.options)
        }

        return () => {
            socket.off("newPoll")
            socket.off("updateResults")
            socket.off("pollEnded")
            socket.off('kicked');
        }
    }, [dispatch, studentName, wasKicked])

    if (wasKicked) {
        return <KickedOutView />;
    }

    if (!studentName) {
        return <EnterName onSubmit={handleNameSubmit} />
    }

    if (!activePoll) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl">Welcome, {studentName}!</h1>
                <p className="text-gray-500">Waiting for the teacher to start a poll...</p>
            </div>
        );
    }

    if (hasVoted || !activePoll.isActive) {
        return <Results question={activePoll?.question} options={activePoll?.options} results={results} />;
    }

    return <ActivePollView poll={activePoll} onAnswerSubmit={handleAnswerSubmit} />;

}

export default StudentPage