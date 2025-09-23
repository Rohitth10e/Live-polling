import Poll from './../models/poll.model.js';
import io from '../app.js';

// Teacher creates a new poll

export const createPoll = async (req, res) => {
    try {
        const activePoll = await Poll.findOne({ isActive: true });
        if (activePoll) return res.status(400).json({ error: "A poll is still active" });
        
        const { question, options, createdBy, correctOption } = req.body;

        if (!question || !options || options.length < 2 || !createdBy || !correctOption) {
            return res.status(400).json({ error: "Invalid poll data" });
        }

        const poll = new Poll({
            question,
            options,
            correctOption,
            createdBy,
            expiresAt: new Date(Date.now() + 60000)
        });

        await poll.save();

        // notify students about the new poll
        io.emit("newPoll", poll);

        res.status(201).json(poll);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getActivePolls = async (req, res) => {
    try {
        const poll = await Poll.find({ isActive: true }).sort({ createdAt: -1 });
        if (!poll.length) {
            return res.status(404).json({ error: "No active polls found" });
        }
        res.status(200).json(poll);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const submitAnswer = async (req, res) => {
    try {
        const { studentName, option } = req.body;
        const poll = await Poll.findById(req.params.id);

        if (!poll || !poll.isActive) {
            return res.status(404).json({ error: "Poll not found or inactive" });
        }

        // Prevent duplicate submissions

        if (poll.answers.find(answer => answer.studentName === studentName)) {
            return res.status(400).json({ error: "You have already submitted an answer" });
        }

        poll.answers.push({ studentName, option });
        await poll.save();

        // Emit updated results to all connected clients
        io.emit("updateResults", poll);

        res.status(200).json({ message: "Answer submitted successfully", poll });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getPollResults = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) {
            return res.status(404).json({ error: "Poll not found" });
        }
        res.status(200).json(poll.answers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}