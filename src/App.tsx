import React, {useState} from 'react';
import {Button, Container, Grid, Paper, TextField} from "@mui/material";
import ColorPicker from "material-ui-color-picker";
import {twoCodeColorToOneCode} from "./icons-and-colors";

function App() {
    const [color, setColor] = useState<string>("")
    const [name, setName] = useState<string>("")

    return (
        <div className="App">
            <Container>
                <Paper>
                    {/*<Grid></Grid>*/}
                    <TextField id="text-1" value={name}/>
                    <ColorPicker onChange={(newColor) => {
                        if (!newColor) {
                            return
                        }

                        const rawHex = newColor.substring(1)
                        const r = twoCodeColorToOneCode(Number('0x' + rawHex.substring(0, 2))).toString(16).toUpperCase()
                        const g = twoCodeColorToOneCode(Number('0x' + rawHex.substring(2, 4))).toString(16).toUpperCase()
                        const b = twoCodeColorToOneCode(Number('0x' + rawHex.substring(4, 6))).toString(16).toUpperCase()

                        setColor(`$${r}${g}${b}`)
                    }}/>
                    <Button onClick={
                        () => {
                            console.log("name", name)
                            console.log("color", color)
                            if (!color) {
                                return
                            }
                            setName(name + color)
                        }
                    }>Add Color Format</Button>
                </Paper>
            </Container>
        </div>
    );
}

export default App;
