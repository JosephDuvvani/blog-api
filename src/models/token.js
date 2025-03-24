import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exists = async (token) => {
  const refreshToken = await prisma.token.findUnique({
    where: {
      token,
    },
  });

  if (!refreshToken) return false;
  return true;
};

const create = async (token) => {
  await prisma.token.create({
    data: {
      token,
    },
  });
};

const destroy = async (token) => {
  await prisma.token.delete({
    where: {
      token,
    },
  });
};

export default { exists, create, destroy };
