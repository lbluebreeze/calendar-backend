const { response } = require('express');

const Event = require('../models/Event');

const getEvents = async(req, res = response) => {
    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events,
    });
};

const createEvent = async(req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;

        const result = await event.save();

        return res.status(201).json({
            ok: true,
            event: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Event creation error. Please contact the administrator'
        });
    }
};

const updateEvent = async(req, res = response) => {
    const { id } = req.params;
    const { uid } = req;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized'
            });
        }

        const updateEvent = {
            ...req.body,
            user: uid
        };

        const result = await Event.findByIdAndUpdate(id, updateEvent, { new: true });

        res.json({
            ok: true,
            event: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Event update error. Please contact the administrator'
        });
    }
};

const deleteEvent = async(req, res = response) => {
    const { id } = req.params;
    const { uid } = req;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized'
            });
        }

        await Event.findByIdAndDelete(id);

        res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Event delete error. Please contact the administrator'
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};