import {Box, TextField, InputAdornment, Typography} from "@mui/material";
import types from "../data/product/types";
import React, {useEffect, useState} from "react";

const baseTypesData = [...types]

export default function SubForm({typeId, setProductData}) {
    const [weightValue, setWeightValue] = useState(0);
    const [sizeValue, setSizeValue] = useState(0);
    const [weightValidation, setWeightValidation] = useState({"isValid": false, "Message": ""});
    const [sizeValidation, setSizeValidation] = useState({"isValid": false, "Message": ""});
    const [dimensionsValidation, setDimensionsValidation] = useState({"isValid": false, "Message": ""});
    // const [dimensions, setDimensions] = useState({"h": 1, "w": 1, "l": 1})
    const [h, setH] = useState(0);
    const [w, setW] = useState(0);
    const [l, setL] = useState(0);

    useEffect(() => {
        if (!Number.isNaN(h) && !Number.isNaN(w) && !Number.isNaN(l)) {
            if (h > 0 && w > 0 && l > 0) {
                setProductData({"h": parseFloat(h), "w": parseFloat(w), "l": parseFloat(l)});
                setDimensionsValidation({"isValid": true, "Message": ""});
            } else {
                setProductData({});
                setDimensionsValidation({"isValid": false, "Message": "Cannot be less or equal to zero"})
            }
        }
    }, [h, w, l]);

    function handleEntry(inputValue, obj) {
        if (!Number.isNaN(inputValue)) {
            if (parseFloat(inputValue) > 0) {
                setProductData(obj);
            } else setProductData({});
        }
    }

    function isValidEntry(inputValue, setFunction, Message = "Cannot be less or equal to zero") {
        if (!Number.isNaN(inputValue)) {
            if (parseFloat(inputValue) > 0) {
                setFunction({"isValid": true, "Message": ""})
            } else setFunction({"isValid": false, "Message": Message})
        }
    }

    const typesData = [
        {
            ...baseTypesData[0],
            "description": "Please provide book weight in Kilogram",
            get elements() {
                return (<TextField
                    id="weight"
                    label="Weight"
                    value={weightValue}
                    type="number"
                    onBlur={((e) => {
                        isValidEntry(e.target.value, setWeightValidation)
                    })}
                    error={!weightValidation.isValid}
                    helperText={weightValidation.Message === "" ? this.description : weightValidation.Message}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                    }}
                    onChange={(e) => {
                        setWeightValue(e.target.value);
                        e.target.helperText = "test";
                        handleEntry(e.target.value, {"weight": parseFloat(e.target.value)})
                    }}
                    fullWidth
                    required
                />)
            }
        },
        {
            ...baseTypesData[1],
            "description": "Please provide DVD size in MegaBytes",
            get elements() {
                return (<TextField
                    id="size"
                    label="Size"
                    type="number"
                    onBlur={((e) => {
                        isValidEntry(e.target.value, setSizeValidation)
                    })}
                    error={!sizeValidation.isValid}
                    helperText={sizeValidation.Message === "" ? this.description : sizeValidation.Message}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                    }}
                    value={sizeValue}
                    onChange={(e) => {
                        setSizeValue(e.target.value)
                        if (!Number.isNaN(e.target.value)) {
                            if (parseFloat(e.target.value) > 0) {
                                setProductData({"size": parseFloat(e.target.value)});
                            }
                        } else setProductData({})
                    }
                    }
                    fullWidth
                    required
                />)
            }
        },
        {
            ...baseTypesData[2],
            "description": "Please provide dimensions in HxWxL format",
            get elements() {
                return (<><Box sx={{display: "flex", width: "100%", justifyContent: "center", gap: "6px", flexWrap: "wrap"}}>
                    <TextField sx={{maxWidth: "214px"}}
                        id="height"
                        label="H"
                        type="number"
                        error={!dimensionsValidation.isValid}
                        helperText={dimensionsValidation.Message}
                        InputProps={{
                            inputProps: {min: 0},
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>
                        }}
                        value={h}
                        onChange={(e) => {
                            setH(e.target.value);
                        }
                        }
                        required
                    />
                    <TextField sx={{maxWidth: "214px"}}
                        id="width"
                        label="W"
                        type="number"
                        InputProps={{
                            inputProps: {min: 0},
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>
                        }}
                        error={!dimensionsValidation.isValid}
                        helperText={dimensionsValidation.Message}
                        value={w}
                        onChange={(e) => {
                            setW(e.target.value);
                        }
                        }
                        required
                    />
                    <TextField sx={{maxWidth: "214px"}}
                        id="length"
                        label="L"
                        type="number"
                        InputProps={{
                            inputProps: {min: 0},
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>
                        }}
                        error={!dimensionsValidation.isValid}
                        helperText={dimensionsValidation.Message}
                        value={l}
                        onChange={(e) => {
                            setL(e.target.value);
                        }
                        }
                        required
                    />

                </Box>
                    <Typography variant="caption" display="block" gutterBottom>
                        {this.description}
                    </Typography></>)
            }
        }
    ]

    return (

        <>
            {typesData[typeId].elements}
            {/*{console.log(typesData[typeId].getData)}*/}
        </>
    )
}