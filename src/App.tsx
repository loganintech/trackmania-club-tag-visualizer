import React, {useRef, useState} from 'react';
import {Box, Button, Container, Grid, TextField} from "@mui/material";
import {FORMATTING_CODES, PLATFORM_CODES, twoCodeColorToOneCode, UNICODE_ICONS} from "./icons-and-colors";
import {Color, ColorResult, SketchPicker} from "react-color";

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

    return (
        <div className="App">
            <Container>

                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item xs={12} container direction="row" justifyContent="center">
                        <Grid item>
                            Paste in Trackmania: <TextField id="text-1" variant="standard" inputRef={inputVal}/>
                        </Grid>
                    </Grid>

                    <Grid item container justifyContent="center">
                        <SketchPicker color={color} onChange={(newColor: ColorResult) => {
                            if (!newColor) {
                                return
                            }

                            const rawHex = newColor.hex.substring(1)

                            const r = twoCodeColorToOneCode(Number('0x' + rawHex.substring(0, 2))).toString(16).toUpperCase()
                            const g = twoCodeColorToOneCode(Number('0x' + rawHex.substring(2, 4))).toString(16).toUpperCase()
                            const b = twoCodeColorToOneCode(Number('0x' + rawHex.substring(4, 6))).toString(16).toUpperCase()


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
