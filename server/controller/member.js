// import { getSocketIO } from "../connection/socket.js";
import * as memberRepository from "../data/member.js";

export async function getMembers(req, res) {
  const username = req.query.username;
  const data = await (username
    ? memberRepository.getAllByUsername(username)
    : memberRepository.getAll());
  res.status(200).json(data);
}

export async function getMember(req, res, next) {
  const id = req.params.id;
  const member = await memberRepository.getById(id);
  if (member) {
    res.status(200).json(member);
  } else {
    res.status(404).json({ message: `Member id(${id}) not found` });
  }
}

export async function createMember(req, res, next) {
  const { paymentTerm, extendedPeriod, totalPeriod, locker, desc } = req.body;
  const member = await memberRepository.create(
    paymentTerm,
    extendedPeriod,
    totalPeriod,
    locker,
    desc,
    req.userId
  );
  res.status(201).json(member);
}

export async function updateMember(req, res, next) {
  const id = req.params.id;
  const rezDate = req.body.rezDate;
  const rezTime = req.body.rezTime;
  const week = req.body.week;
  const desc = req.body.desc;
  const member = await memberRepository.getById(id);
  if (!member) {
    return res.status(404).json({ message: `Member not found: ${id}` });
  }
  if (member.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await memberRepository.update(
    id,
    rezDate,
    rezTime,
    week,
    desc
  );
  res.status(200).json(updated);
}

export async function deleteMember(req, res, next) {
  const id = req.params.id;
  const member = await memberRepository.getById(id);
  if (!member) {
    return res.status(404).json({ message: `Member not found: ${id}` });
  }
  if (member.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await memberRepository.remove(id);
  res.sendStatus(204);
}
