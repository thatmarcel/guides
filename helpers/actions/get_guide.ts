"use server"

import dbClient from "../mongodb";
import GuideData from "../../types/guide_data";

export default async function getGuide(slug: string): Promise<GuideData> {
    const results = await dbClient
        .db("guides-v1")
        .collection("guides")
        .find({
            slug
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