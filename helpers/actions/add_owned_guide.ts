"use server"

import {auth} from "@clerk/nextjs/server";
import dbClient from "../mongodb";
import GuideData from "../../types/guide_data";
import DatabaseGuideData from "../../types/database_guide_data";
import {generate} from "randomstring";
import getGuide from "./get_guide";

export default async function addOwnedGuide(data: GuideData): Promise<void> {
    const { userId } = auth();

    if (!userId) {
        throw "Not authenticated";
    }

    let isSlugTakenAlready = false;
    try {
        await getGuide(data.slug);
        isSlugTakenAlready = true;
    } catch {}
    if (isSlugTakenAlready) {
        throw "This slug is already taken";
    }

    let insertedData: DatabaseGuideData = {
        authorUserId: userId,
        id: generate({
            length: 16
        }).toLowerCase(),
        slug: data.slug,
        title: data.title,
        description: data.description,
        steps: data.steps
    };

    await dbClient
        .db("guides-v1")
        .collection("guides")
        .insertOne(insertedData);
}