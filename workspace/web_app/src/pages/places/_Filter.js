import React from 'react';
import {IconButton} from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const _Filter = () => {
    return (
        <>
            <div>
                <IconButton sx={{color:"#000000"}} aria-label="" name="filter">
                    <FilterAltOutlinedIcon />
                </IconButton>
            </div>

        </>
    );
};

export default _Filter;
