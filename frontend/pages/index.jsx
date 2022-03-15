import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {Box, Container} from '@mui/material';
import Product from '../components/Product';
import endpoints from "../data/endpoints";
import {GlobalContext} from "../components/Layout";
import {useContext, useEffect, useState} from "react";
import axios from "axios";


async function retrieveData(url) {
    try {
        const res = await fetch(url, {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-requested-with": "XMLHttpRequest"
            }});
        return await res.json();
    } catch (err) {
        // console.log(err.toString());
        return ["Error", err.toString()]
    }
}

export async function getStaticProps() {
    const d = await retrieveData(endpoints.getProductsURL);
    console.log(d);

    return {
        props: {data: d}
    }
}


export default function Home({data}) {
    const [packedData, setPackedData] = useState(data);
    const globalContext = useContext(GlobalContext);
    const tempDeleteObj = {};

    useEffect(() => {
        packedData.forEach((p) => tempDeleteObj[p.id] = false);
        globalContext.setDeleteList(tempDeleteObj);
        console.log(globalContext.deleteList);
    }, [packedData]);

    // useEffect(() => {
    //     console.log("deleteList Changed");
    // }, [globalContext.deleteList])

    return (
        <Container maxWidth={"lg"} sx={{padding: "2%"}}>
            {packedData[0] === "Error" ?
                <center><h3>Cannot connect to the server</h3></center> : packedData.hasOwnProperty('message') ?
                    <h2>{packedData.message}</h2> :
                    <Box sx={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                        {packedData.map((product) =>
                            <Product data={product} key={product.id}/>)}
                    </Box>


            }
        </Container>
    );
}
