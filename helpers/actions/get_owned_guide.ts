"use server"

import dbClient from "../mongodb";
import GuideData from "../../types/guide_data";
import {auth} from "@clerk/nextjs/server";

export default async function getOwnedGuide(id: string): Promise<GuideData> {
    const { userId } = auth();

    if (!userId) {
        throw "Not authenticated";
    }

    const results = await dbClient
        .db("guides-v1")
        .collection("guides")
        .find({
            authorUserId: userId,
            id
        })
        .toArray();

    if (results.length === 0) {
        throw "Not found";
    }

    const result = results[0];

    return {
        id: result.id,
        slug: result.slug,
        title: result.title,
        description: result.description,
        steps: result.steps
    };
}