"use server"

import {auth} from "@clerk/nextjs/server";
import dbClient from "../mongodb";
import GuideData from "../../types/guide_data";
import DatabaseGuideData from "../../types/database_guide_data";
import getGuide from "./get_guide";

export default async function editOwnedGuide(data: GuideData): Promise<void> {
    const { userId } = auth();

    if (!userId) {
        throw "Not authenticated";
    }

    let isSlugTakenAlready = false;
    try {
        const g = await getGuide(data.slug);
        if (g.id !== data.id) {
            isSlugTakenAlready = true;
        }
    } catch {}
    if (isSlugTakenAlready) {
        throw "This slug is already taken";
    }

    let editedData: DatabaseGuideData = {
        authorUserId: userId,
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        steps: data.steps
    };

    await dbClient
        .db("guides-v1")
        .collection("guides")
        .updateOne({
            authorUserId: userId,
            id: data.id
        }, {
            $set: editedData
        });
}