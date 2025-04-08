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
    orderBy: {
      createdAt: 'desc'
    }
  });
  return posts;
};

const findManyPublished = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      authorId: false,
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
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

const findPublished = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
      published: true,
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

const create = async ({title, caption, body, author}) => {
  const post = await prisma.post.create({
    data: {
      title,
      caption,
      body,
      authorId: author,
    },
  });
  return post;
};

const publish = async (id) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      published: true,
    },
  });
  return post;
};

const unpublish = async (id) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      published: false,
    },
  });
  return post;
};

const updateContent = async (id, {title, caption, body}) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      caption,
      body,
    },
  });
  return post;
};

const destroy = async (id) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};

export default {
  findMany,
  findManyPublished,
  find,
  findPublished,
  create,
  publish,
  unpublish,
  updateContent,
  destroy,
};
