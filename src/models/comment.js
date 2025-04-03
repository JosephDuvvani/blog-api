import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findMany = async (postId) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return comments;
};

const create = async (content, postId, authorId) => {
  await prisma.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
  });
};

const update = async (id, content) => {
  await prisma.comment.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
};

const destroy = async (id) => {
  await prisma.comment.delete({
    where: {
      id,
    },
  });
};

export default { findMany, create, update, destroy };
