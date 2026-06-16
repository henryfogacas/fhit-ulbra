import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/db";
import { hashPassword } from "@/shared/utils/auth";

export const userRepository = {
  async create(userData: { email: string; password: string; name: string }) {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        termAccepted: true,
        termAcceptedAt: new Date(),
        password: await hashPassword(userData.password),
      },
      select: {
        publicId: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return { user };
  },

  /** Checagem leve de existência por e-mail (apenas o id). */
  async existsByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },

  async getProfileByPublicId(publicId: string) {
    return prisma.user.findUnique({
      where: { publicId },
      select: {
        publicId: true,
        name: true,
        email: true,
        heightCm: true,
        createdAt: true,
      },
    });
  },

  async getHeightById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { heightCm: true },
    });
  },

  async updateHeight(userId: number, heightCm: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { heightCm },
      select: { heightCm: true },
    });
  },

  async getByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        publicId: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        termAccepted: true,
        termAcceptedAt: true,
      },
    });
  },

  async getByPublicId(publicId: string) {
    return prisma.user.findUnique({
      where: { publicId: publicId },
      select: {
        publicId: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        termAccepted: true,
        termAcceptedAt: true,
      },
    });
  },

  async getIdByPublicId(publicId: string) {
    const user = await prisma.user.findUnique({
      where: { publicId: publicId },
      select: {
        id: true,
      },
    });

    return user;
  },

  async updatePassword(userId: number, password: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await hashPassword(password),
      },
    });
  },

  async getAllWithFilterAndPagination(
    filter: Prisma.UserWhereInput,
    skip: number,
    take: number,
    search: string,
  ) {
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          ...filter,
          deletedAt: null,
          ...(search && {
            OR: [
              { email: { contains: search, mode: "insensitive" } },
              { name: { contains: search, mode: "insensitive" } },
            ],
          }),
        },
        select: {
          publicId: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          termAccepted: true,
          termAcceptedAt: true,
        },
        skip: skip,
        take: take || 12,
      }),
      prisma.user.count({
        where: {
          ...filter,
          deletedAt: null,
          ...(search && {
            OR: [
              { email: { contains: search, mode: "insensitive" } },
              { name: { contains: search, mode: "insensitive" } },
            ],
          }),
        },
      }),
    ]);

    return { data, total };
  },

  async delete(id: number): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  async update(userId: number, name: string, email: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
        email: email,
      },
    });
  },
};
