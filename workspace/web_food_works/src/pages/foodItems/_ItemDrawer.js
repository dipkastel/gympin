import React, {useContext} from 'react';
import {
    Card,
    Drawer,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import __EditFoodItem from "./__EditFoodItem";
import __EditFoodImages from "./__EditFoodImages";
import __DeleteFoodItem from "./__DeleteFoodItem";
import _ItemCategories from "./_ItemCategories";

const _ItemDrawer = ({selectedItem,setSelectedItem,updateList}) => {


    return (
        <>
            <Drawer anchor={"right"} open={!!selectedItem} onClose={(e)=>setSelectedItem(null)} >
                <Grid sx={{pt:10,px:1,maxWidth:480}} textAlign={"center"}>
                    <Card variant={"outlined"} sx={{p:2,m:1}}>
                        <Typography variant={"h4"}>{selectedItem?.Name||"نامشخص"}</Typography>
                    </Card>

                    <__EditFoodImages  selectedItem={selectedItem} setSelectedItem={setSelectedItem}  />
                    <__EditFoodItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} updateList={updateList} />
                    <_ItemCategories selectedItem={selectedItem} setSelectedItem={setSelectedItem} updateList={updateList} />
                    <__DeleteFoodItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} updateList={updateList} />
                </Grid>
            </Drawer>
        </>
    );
};

export default _ItemDrawer;
