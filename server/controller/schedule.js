// import { getSocketIO } from "../connection/socket.js";
import * as scheduleRepository from "../data/schedule.js";

export async function getSchedules(req, res) {
  const username = req.query.username;
  const data = await (username
    ? scheduleRepository.getAllByUsername(username)
    : scheduleRepository.getAll());
  res.status(200).json(data);
}

export async function getSchedule(req, res, next) {
  const id = req.params.id;
  const schedule = await scheduleRepository.getById(id);
  if (schedule) {
    res.status(200).json(schedule);
  } else {
    res.status(404).json({ message: `Schedule id(${id}) not found` });
  }
}

export async function createSchedule(req, res, next) {
  const { rezDate, rezTime, week, desc } = req.body;
  const schedule = await scheduleRepository.create(
    rezDate,
    rezTime,
    week,
    desc,
    req.userId
  );
  res.status(201).json(schedule);
}

export async function updateSchedule(req, res, next) {
  const id = req.params.id;
  const rezDate = req.body.rezDate;
  const rezTime = req.body.rezTime;
  const week = req.body.week;
  const desc = req.body.desc;
  const schedule = await scheduleRepository.getById(id);
  if (!schedule) {
    return res.status(404).json({ message: `Schedule not found: ${id}` });
  }
  if (schedule.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await scheduleRepository.update(
    id,
    rezDate,
    rezTime,
    week,
    desc
  );
  res.status(200).json(updated);
}

export async function deleteSchedule(req, res, next) {
  const id = req.params.id;
  const schedule = await scheduleRepository.getById(id);
  if (!schedule) {
    return res.status(404).json({ message: `Schedule not found: ${id}` });
  }
  if (schedule.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await scheduleRepository.remove(id);
  res.sendStatus(204);
}
