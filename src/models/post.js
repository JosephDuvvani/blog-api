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

const updateTitle = async (id, title) => {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
};

const updateContent = async (id, content) => {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
};

const destroy = async (id) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};

export default { findMany, find, create, updateTitle, updateContent, destroy };
