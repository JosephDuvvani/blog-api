import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usernameExists = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user) return true;
  return false;
};

const emailExists = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) return true;
  return false;
};

const create = async (username, email, password, role = "USER") => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      role,
    },
  });
  return user;
};

const findByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const findByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

export default {
  usernameExists,
  emailExists,
  create,
  findByEmail,
  findByUsername,
};
