"use client"

import InputField from "./InputField";
import GuideStepEditor from "./GuideStepEditor";
import GuideEditorStepSelection from "./GuideEditorStepSelection";
import {useState} from "react";
import GuideStepData from "../types/guide_step_data";
import MiscButton from "./MiscButton";
import addOwnedGuide from "../helpers/actions/add_owned_guide";
import {useRouter} from "next/navigation";
import GuideData from "../types/guide_data";
import editOwnedGuide from "../helpers/actions/edit_owned_guide";
import deleteOwnedGuide from "../helpers/actions/delete_owned_guide";

const createEmptyStep: () => GuideStepData = () => {
    return {
        title: "",
        description: "",
        coverImageUrl: null,
        coverVideoUrl: null,
        buttons: [],
        troubleshootingSections: []
    }
}

const allowedSlugCharacters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"
]

export default function GuideEditor({
    editedGuideData
}: {
    editedGuideData?: GuideData
}) {
    const [title, setTitle] = useState(editedGuideData ? editedGuideData.title : "");
    const [description, setDescription] = useState(editedGuideData ? editedGuideData.description : "");
    const [slug, setSlug] = useState(editedGuideData ? editedGuideData.slug : "");
    const [hasChangedSlugManually, setChangedSlugManually] = useState(!!editedGuideData);
    const [steps, setSteps] = useState(editedGuideData ? editedGuideData.steps : [createEmptyStep()]);
    const [selectedStepIndex, setSelectedStepIndex] = useState(0);
    const [isAddingOrEditingGuide, setAddingOrEditingGuide] = useState(false);
    const [isDeletingGuide, setDeletingGuide] = useState(false);

    const router = useRouter();

    const addOrEditGuide = async () => {
        setAddingOrEditingGuide(true);

        try {
            const mappedSteps = steps.map(s => {
                s.buttons = s.buttons.filter(b => (
                    b.title.trim() !== "" &&
                    b.href.trim() !== ""
                ));

                return s;
            });

            if (editedGuideData) {
                await editOwnedGuide({
                    id: editedGuideData.id,
                    title: title.trim(),
                    description: description.trim(),
                    slug: slug.replace(/^-|-$/g, ""),
                    steps: mappedSteps
                });
            } else {
                await addOwnedGuide({
                    title: title.trim(),
                    description: description.trim(),
                    slug: slug.replace(/^-|-$/g, ""),
                    steps: mappedSteps
                });
            }

            router.push("/dash");
        } catch {}

        setAddingOrEditingGuide(false);
    };

    const deleteGuide = async () => {
        setDeletingGuide(true);

        try {
            await deleteOwnedGuide(editedGuideData.id);

            router.push("/dash");
        } catch {}

        setDeletingGuide(false);
    };

    return (
        <div className="w-full">
            <InputField
                title="Title"
                placeholder="How to rule the world"
                type="text"
                value={title}
                onTextChange={newValue => {
                    setTitle(newValue);

                    if (!hasChangedSlugManually) {
                        let newSlug = "";
                        let previousCharacter = "";
                        for (const character of newValue.toLowerCase().split("")) {
                            if (allowedSlugCharacters.includes(character)) {
                                newSlug += character;
                                previousCharacter = character;
                            } else {
                                if (previousCharacter !== "-") {
                                    newSlug += "-";
                                    previousCharacter = "-";
                                }
                            }
                        }
                        setSlug(newSlug);
                    }
                }}
            />

            <InputField
                title="Description"
                placeholder="Learn how to build an amazing empire all by yourself"
                type="text"
                className="mt-4"
                value={description}
                onTextChange={newValue => { setDescription(newValue) }}
            />

            <InputField
                title="Slug (Link)"
                placeholder="how-to-rule-the-world"
                type="text"
                className="mt-4"
                value={slug}
                onTextChange={newValue => {
                    let newSlug = "";
                    let previousCharacter = "";
                    for (const character of newValue.toLowerCase().split("")) {
                        if (allowedSlugCharacters.includes(character)) {
                            newSlug += character;
                            previousCharacter = character;
                        } else {
                            if (previousCharacter !== "-") {
                                newSlug += "-";
                                previousCharacter = "-";
                            }
                        }
                    }
                    setSlug(newSlug);
                    setChangedSlugManually(true);
                }}
            />

            {slug.split(" ").join("") !== ""
                ? <p className="mt-3">
                    The guide will be hosted at <span className="font-medium">
                        https://guides.cx/g/{slug.replace(/^-|-$/g, "")}
                    </span>
                </p>
                : null
            }

            <GuideEditorStepSelection
                className="mt-12 pb-2"
                steps={steps}
                selectedStepIndex={selectedStepIndex}
                setSelectedStepIndex={setSelectedStepIndex}
                onAddStepButtonClick={() => {
                    setSteps([...steps, createEmptyStep()]);
                    setSelectedStepIndex(steps.length);
                }}
            />

            <GuideStepEditor
                isEditingGuide={!!editedGuideData}
                stepData={steps[selectedStepIndex]}
                stepIndex={selectedStepIndex}
                onStepDataChange={newStepData => {
                    steps[selectedStepIndex] = newStepData;
                    setSteps([...steps]);
                }}
                onStepDeletion={() => {
                    setSelectedStepIndex(steps.length - 2);
                    setSteps([...steps]
                        .filter((_, index) => index !== selectedStepIndex));
                }}
            />

            <MiscButton
                isDisabled={isAddingOrEditingGuide || isDeletingGuide || (
                    title.split(" ").join("") === "" ||
                    description.split(" ").join("") === "" ||
                    slug.split(" ").join("") === "" ||
                    steps.filter(s => (
                        s.title.split(" ").join("") === "" ||
                        s.description.split(" ").join("") === ""
                    )).length > 0
                )}
                className="mt-8 w-full md:w-auto"
                onClick={addOrEditGuide}
            >
                {editedGuideData
                    ? "Save changes"
                    : "Add guide now"
                }
            </MiscButton>

            {editedGuideData
                ? <MiscButton
                    isDisabled={isAddingOrEditingGuide || isDeletingGuide}
                    isGhost={true}
                    className="text-red-500 ml-0 mt:ml-2 w-full md:w-auto mt-2 md:mt-0"
                    onClick={deleteGuide}
                >
                    Delete guide now
                </MiscButton>
                : null
            }
        </div>
    )
}