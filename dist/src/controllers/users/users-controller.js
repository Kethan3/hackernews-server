import { prismaClient } from "../../extras/prisma";
import { GetMeError, } from "./users-types";
export const getMe = async (parameters) => {
    const user = await prismaClient.user.findUnique({
        where: {
            id: parameters.userId,
        },
    });
    if (!user) {
        throw GetMeError.BAD_REQUEST;
    }
    return {
        user,
    };
};
export const getAllUsers = async () => {
    const users = await prismaClient.user.findMany();
    return {
        users,
    };
};
