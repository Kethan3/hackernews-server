import { createHash } from "crypto";
import { LogInWithUsernameAndPasswordError, SignUpWithUsernameAndPasswordError, } from "./authentication-types";
import jwt from "jsonwebtoken";
import { jwtsecretKey } from "../../../environment";
import { prismaClient } from "../../extras/prisma";
const createJWToken = (parameters) => {
    // Generate token
    const jwtPayload = {
        iss: "https://purpleshorts.co.in",
        sub: parameters.id,
        username: parameters.username,
    };
    const token = jwt.sign(jwtPayload, jwtsecretKey, {
        expiresIn: "30d",
    });
    return token;
};
export const checkIfUserExistsAlready = async (parameters) => {
    const existingUser = await prismaClient.user.findUnique({
        where: {
            username: parameters.username,
        },
    });
    if (existingUser) {
        return true;
    }
    return false;
};
export const createPasswordHash = (parameters) => {
    return createHash("sha256").update(parameters.password).digest("hex");
};
export const signUpWithUsernameAndpassword = async (parameters) => {
    try {
        const isUserExistingAlready = await checkIfUserExistsAlready({
            username: parameters.username,
        });
        if (isUserExistingAlready) {
            throw SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
        }
        const passwordHash = createPasswordHash({
            password: parameters.password,
        });
        const user = await prismaClient.user.create({
            data: {
                username: parameters.username,
                password: passwordHash,
            },
        });
        const token = createJWToken({
            id: user.id,
            username: user.username,
        });
        const result = {
            token,
            user,
        };
        return result;
    }
    catch (e) {
        console.log("Error", e);
        throw SignUpWithUsernameAndPasswordError.UNKNOWN;
    }
};
export const logInWithUsernameAndPassword = async (parameters) => {
    const passwordHash = createPasswordHash({
        password: parameters.password,
    });
    const user = await prismaClient.user.findUnique({
        where: {
            username: parameters.username,
            password: passwordHash,
        },
    });
    if (!user) {
        throw LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD;
    }
    const token = createJWToken({
        id: user.id,
        username: user.username,
    });
    return {
        token,
        user,
    };
};
