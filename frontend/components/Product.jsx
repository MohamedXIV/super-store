import {Button, Box, Card, CardActions, CardContent, CardMedia, Typography, Checkbox} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "./Layout";


export default function Product({data}) {
    const [isRaised, setIsRaised] = useState(false);
    const [image, setImage] = useState("");
    const [specialElement, setSpecialElement] = useState(<></>);
    const deleteContext = useContext(GlobalContext);

    function handleDifferences() {
        if (data.weight != null) {
            setSpecialElement(<>Weight:&nbsp;
                <Typography variant={"subtitle1"}
                            sx={{display: "inline-block", fontWeight: "bold"}}>{data.weight}</Typography>
            </>);
            setImage("/images/book_light_64.png");
        } else if (data.size != null) {
            setSpecialElement(<>Size:&nbsp;
                <Typography variant={"subtitle1"}
                            sx={{display: "inline-block", fontWeight: "bold"}}>{data.size}</Typography>
                &nbsp;MB</>);
            setImage("/images/dvd_light_64.png");
        } else {
            const dimsObj = JSON.parse(data.dimensions);
            //console.log(dimsObj);
            setSpecialElement(<>Dimensions:&nbsp;
                <strong>{dimsObj.h}</strong>x
                <strong>{dimsObj.w}</strong>x
                <strong>{dimsObj.l}</strong></>)
            setImage("/images/furniture_light_64.png");
        }
    }

    function handleDelete(e) {
        // const tempObj = {[data.id]: }
        deleteContext.setDeleteList(prevState => ({...prevState, [data.id]: e}))
    }

    useEffect(() => {
        handleDifferences();
    }, [])

    return (
        <Box sx={{minWidth: 275}}>
            <CardMedia component="img" image={image} sx={{
                width: "64px",
                margin: "0 auto",
                transform: "translate(0, 32px)"
            }}/>
            <Card sx={{maxWidth: 300, borderRadius: "0.9rem", padding: "5px 5px 0 5px"}} raised={isRaised}
                  onMouseEnter={() => setIsRaised(true)}
                  onMouseLeave={() => setIsRaised(false)}>
                {/*<Box sx={{maxWidth: "5rem", height: "5rem", backgroundColor: "pink", margin: "0 auto", transform: "translate(0, -20px)"}}>Test</Box>*/}
                <CardContent sx={{paddingBottom: "0px", padding: "0px"}}>
                    <Checkbox className={"delete-checkbox"} checked={deleteContext.delteList}
                              onChange={(e) => handleDelete(e.target.checked)}
                    />
                    {/*sx={{visibility: deleteContext.deleteEnabled ? "visible" : "hidden"}}*/}
                    <Typography align="center" sx={{fontSize: 14}}
                                color="text.secondary"
                                gutterBottom>
                        {data.sku}
                    </Typography>
                    <Typography align="center" variant="h5" component="div">
                        ${data.price}
                    </Typography>
                    <Typography align="center" sx={{mb: 1.5}} color="text.secondary">
                        {data.name}
                    </Typography>
                    <Typography align="center" variant="body2">
                        {specialElement}
                        {/*<br/>*/}
                        {/*{data.id}*/}
                    </Typography>
                </CardContent>
                {/*<CardActions>*/}
                {/*    <Button size="small">Learn More</Button>*/}
                {/*</CardActions>*/}
            </Card>
        </Box>
    );
}