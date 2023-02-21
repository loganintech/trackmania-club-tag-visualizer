import React, {useRef, useState} from 'react';
import {Box, Button, Container, Grid, TextField} from "@mui/material";
import {FORMATTING_CODES, PLATFORM_CODES, twoCodeColorToOneCode, UNICODE_ICONS} from "./icons-and-colors";
import {Color, ColorResult, SketchPicker} from "react-color";
import {RenderedText} from "./rendered";

function App() {
    const [color, setColor] = useState<Color>()
    const [colorHex, setColorHex] = useState<string>("")
    const inputVal = useRef<HTMLInputElement>()

    const addToText = (val: string) => {
        if (!inputVal?.current) {
            return
        }
        inputVal.current.value += val
    }

    const twoHexValToOneHex = (hex: string): string => twoCodeColorToOneCode(Number('0x' + hex)).toString(16).toUpperCase()

    return (
        <div className="App">
            <Container>

                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item xs={12} container direction="row" justifyContent="center">
                        <Grid item>
                            Paste in Trackmania: <TextField id="text-1" variant="standard" inputRef={inputVal}/>
                        </Grid>
                        <Grid item>
                            Rendered: { !!inputVal?.current?.value  ? <RenderedText input={inputVal.current.value}/> : null }
                        </Grid>
                    </Grid>

                    <Grid item>
                        Rendered 2: <RenderedText input={"aw$$$dawd$218zx$L[abcd]c$81Fz"}/>
                    </Grid>

                    <Grid item container justifyContent="center">
                        <SketchPicker color={color} onChange={(newColor: ColorResult) => {
                            if (!newColor) {
                                return
                            }

                            const rawHex = newColor.hex.substring(1)

                            const r = twoHexValToOneHex(rawHex.substring(0, 2))
                            const g = twoHexValToOneHex(rawHex.substring(2, 4))
                            const b = twoHexValToOneHex(rawHex.substring(4, 6))

                            setColorHex(`$${r}${g}${b}`)
                            setColor(newColor.rgb)
                        }}/>
                            <Button variant="contained" onClick={
                                () => {
                                    if (!colorHex || !inputVal?.current) {
                                        return
                                    }
                                    addToText(colorHex)
                                }
                            }>
                                Add Color Code
                            </Button>

                    </Grid>

                    <Grid item>
                        {Object.entries(FORMATTING_CODES).map(([key, value]) => {
                            return <Button variant="contained" onClick={() => {
                                addToText(value)
                            }}>
                                {key}
                            </Button>
                        })}
                    </Grid>
                    <Grid item>
                        {Object.entries(PLATFORM_CODES).map(([key, value]) => {
                            return <Button variant="contained" onClick={() => {
                                addToText(value)
                            }}>
                                {key}
                            </Button>
                        })}
                    </Grid>
                    <Grid item>
                        {(UNICODE_ICONS).map(icon => {
                            return <Button variant="contained" onClick={() => {
                                addToText(icon)
                            }}>{icon}
                            </Button>
                        })}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
