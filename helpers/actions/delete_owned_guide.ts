"use server"

import {auth} from "@clerk/nextjs/server";
import dbClient from "../mongodb";

export default async function deleteOwnedGuide(id: string): Promise<void> {
    const { userId } = auth();

    if (!userId) {
        throw "Not authenticated";
    }

    await dbClient
        .db("guides-v1")
        .collection("guides")
        .deleteOne({
            authorUserId: userId,
            id: id
        });
}