import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField, Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {useState, useMemo, useEffect} from "react";
import {useRouter} from "next/router";
import types from "../data/product/types";
import endpoints from "../data/endpoints";
import SubForm from "../components/SubForm";
import {useForm} from 'react-hook-form';
import Link from 'next/link';

export default function AddProduct() {

    const productTypes = types //["Book", "DVD", "Furniture"];
    // const [sku, setSKU] = useState(Date.now().toString(16));
    // const [price, setPrice] = useState(0);
    const [isAddBtnLoading, setIsAddBtnLoading] = useState(false);
    const [productType, setProductType] = useState(productTypes[0].id);
    const [specificData, setSpecificData] = useState({});
    const router = useRouter();
    let [haltingSubmit, setHaltingSubmit] = useState(false);
    const {
        register, handleSubmit, formState: {errors}
    } = useForm({
        defaultValues: {
            "sku": Date.now().toString(16)
        }
    });


    useEffect(() => {
        console.log(specificData)
    }, [specificData])

    async function saveData(url, data) {
        try {
            const jsonData = JSON.stringify(data);
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: jsonData
            })
            if (response.ok) {
                console.log(response.status);
                console.log(data);
                onDataSentSuccessfully();
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAddBtnLoading(false);
        }
    }

    function onDataSentSuccessfully() {
        console.log("Data Saved!");
        router.push("/");
    }


    return (
        <div>
            <Paper sx={{backgroundColor: "paper", borderRadius: "16px"}}>
                <form onSubmit={handleSubmit((data) => {
                    if (Object.keys(specificData).length !== 0) {
                        data.price = parseFloat(data.price);
                        setIsAddBtnLoading(true)
                        saveData(endpoints.saveProductsURL, {...data, ...specificData, "type": productType});
                        setHaltingSubmit(false);
                    } else {
                        setHaltingSubmit(true);
                    }
                })} id={"product_form"} className={"add-product__paper"}>
                    <Typography variant="h5" gutterBottom>Add a Product</Typography>
                    <TextField
                        id={"sku"}
                        label={"SKU"}
                        {...register("sku", {
                            required: "This is required", minLength: {
                                value: 8,
                                message: "minimum length is 8 Characters"
                            }
                        })}
                        helperText={errors.sku?.message}
                        // value={sku}
                        // onChange={(e) => setSKU(e.target.value)}
                        fullWidth

                    />
                    <TextField id={"name"} label={"Name"} {...register("name", {

                        minLength: {value: 4, message: "minimum is 4 Characters"}
                    })} helperText={errors.name?.message} fullWidth required/>
                    <TextField
                        id={"price"}
                        label={"Price"}
                        type={"number"}
                        {...register("price", {
                            required: "This is required",
                            min: {value: 0, message: "Minimum number is 0"}
                        })}
                        helperText={errors.price?.message}
                        // value={price}
                        // onChange={(e) => {
                        //     setPrice(e.target.value)
                        // }}
                        fullWidth
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="product_type_label">Type</InputLabel>
                        <Select
                            id="productType"
                            label="Product"
                            value={productType}
                            onChange={(e) => {
                                setProductType(e.target.value);
                                console.log(e.target.label)
                                setSpecificData({});
                            }}
                            fullWidth
                        >
                            {productTypes.map((pT) => (
                                <MenuItem key={pT.id} value={pT.id} id={pT.name}>
                                    {pT.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <SubForm typeId={productType} setProductData={setSpecificData}/>
                    <LoadingButton loading={isAddBtnLoading} type="submit" variant="contained" id="Add" fullWidth>
                        Save
                    </LoadingButton>
                    <Link href={"/"}>
                        <Button size={"small"}>Cancel</Button>
                    </Link>
                    {haltingSubmit && <p>Please check your inputs</p>}
                </form>
            </Paper>
        </div>
    );
}
