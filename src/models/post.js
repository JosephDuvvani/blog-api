import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findMany = async () => {
  const posts = await prisma.post.findMany({
    include: {
      authorId: false,
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return posts;
};

const find = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      authorId: false,
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return post;
};

const create = async (title, content, authorId) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
  return post;
};

export default { findMany, find, create };
