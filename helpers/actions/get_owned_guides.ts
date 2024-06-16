"use server"

import {auth} from "@clerk/nextjs/server";
import dbClient from "../mongodb";
import GuideData from "../../types/guide_data";

export default async function getOwnedGuides(): Promise<GuideData[]> {
    const { userId } = auth();

    if (!userId) {
        throw "Not authenticated";
    }

    const results = await dbClient
        .db("guides-v1")
        .collection("guides")
        .find({
            authorUserId: userId
        })
        .toArray();

    return results.map(r => {
        const data: GuideData = {
            id: r.id,
            slug: r.slug,
            title: r.title,
            description: r.description,
            steps: r.steps
        };

        return data;
    });
}