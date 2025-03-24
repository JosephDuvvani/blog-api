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

const create = async (username, email, password) => {
  await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
};

const findByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export default { usernameExists, emailExists, create, findByEmail };
