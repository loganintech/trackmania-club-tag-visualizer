import React from "react";
import {Box} from "@mui/material";

// https://regex101.com/r/MhkSqp/3
export const RenderedText: React.FC<{ input: string }> = ({input}) => {
    const FORMAT_REGEX = /\$([a-zA-Z0-9]{3}|[$oiwntsgz]|(L\[.*]))|([a-zA-Z0-9])/g

    const matches = input.match(FORMAT_REGEX)
    // console.log(matches)

    const transformations = [[]]
    const colors = [[]]
    const renderItems = []
    if (matches) {
        for (const match of matches) {
            let latestTransform = transformations[transformations.length - 1]
            let latestColor = colors[colors.length - 1]

            if (match.startsWith("$")) {

                // if (FORMATTING_CODE_TRANSFORMATION[match as string] as any !== undefined) {
                //
                // }

            }


            console.log(match)
        }
    }

    return <>{input}</>
}

export const RenderTextItem: React.FC<{ input: string, transformations: textTransformation[] }> = ({input}) => {


    return <>{input}</>
}

type textTransformation = React.FC<{ hexColor: string, }>

type textTransformationKeys = "$o" | "$i" | "$w" | "$n" | "$t" | "$s" | "$L"


type formatTransformation = (textTransformationKeys | React.Component) => React.Component

type test = (JSX.Element) => void

export const FORMATTING_CODE_TRANSFORMATION: {textTransformationKeys: formatTransformation} = {
    // BOLD
    "$o": (input: string | JSX.Element) => <b>{input}</b>,

    // ITALIC
    "$i": (input: string | JSX.Element) => <i>{input}</i>,

    // WIDE
    "$w": (input: string | JSX.Element) => <Box sx={{fontStretch: "expanded"}}>{input}</Box>,

    // NARROW
    "$n": (input: string | JSX.Element) => <Box sx={{fontStretch: "condensed"}}>{input}</Box>,

    // FORCE_UPPERCASE
    "$t": (input: string | JSX.Element) => <Box sx={{textTransform: "capitalize"}}>{input}</Box>,

    // DROP_SHADOW
    "$s": (input: string | JSX.Element) => <Box sx={{textShadow: "2px 2px #FF0000"}}>{input}</Box>,

    // FORMATTING_CODE_LINK
    "$L": (input: string | JSX.Element) => <u>{input}</u>

    // BOLD: "$o",
    // ITALIC: "$i",
    // WIDE: "$w",
    // NARROW: "$n",
    // FORCE_UPPERCASE: "$t",
    // DROP_SHADOW: "$s",
    // RESET_COLOR: "$g",
    // RESET_ALL: "$z",
    // ESCAPE_DOLLARSIGN: "$$",
}