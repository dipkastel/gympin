import React from 'react';
import {Box, IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const itemData = [
    {
        img: 'https://www.allaboutlean.com/wp-content/uploads/2018/09/Sample-Image-Gym.jpg',
        title: 'سیم کش',
        rows: 2,
        cols: 4,
    },
    {
        img: 'https://www.ogscapital.com/wp-content/uploads/2016/05/fitnesscenter-e1532598903516.jpg',
        title: 'هوازی',

        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.sampletemplates.com/wp-content/uploads/2019/06/9-Gym-Membership-Contract-Samples-PDF-Word.jpeg',
        title: 'دمبل ها',
        rows: 1,
        cols: 2,
    },
    {
        img: 'https://storage.mobilebuilder.net/users/images/7bac5c2b-cd8f-44f1-8a9b-868ba3935fec.jpg',
        title: 'دمبل ها',
        cols: 2,
    },
    {
        img: 'https://www.fitnessworld.ca/wp-content/uploads/2022/01/fw_website_club_images_kingsway-04.jpg',
        title: 'میز 1',
        cols: 2,
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhA7Pna9ydyFcYVd3Q0huHNKwmp9LD3mRb3-1_dJn7aIimmcq5WHZTB2HOILPAUZoe2UY&usqp=CAU',
        title: 'بوکس',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://assignmentpoint.com/wp-content/uploads/2019/04/Cancel-Gym-Membership.jpg',
        title: 'سالن',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHAxgUrD7vysI7key8aIlyJ9lG8ekbPYNaQ&usqp=CAU',
        title: 'استخر1',
        cols: 2,
    },
    {
        img: 'https://www.em-sa.co.uk/wp-content/uploads/2020/09/Allestree-woodlands.jpg',
        title: 'استخر 2',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://sunrisepoolsnola.com/wp-content/uploads/sites/31/2018/01/P2-Feature-Image.jpg',
        title: 'جکوزی',
    },
    {
        img: 'https://www.maderamasters.com/wp-content/uploads/2021/07/Cube-Premium-termokoka-pirts-5.webp',
        title: 'سونا خشک',
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn08R4o7UIkgmQAAqsLTmqnINGKiqlEnnWntGTfeDkcJ3yyRjfb5PL7bIL6sC3QqDkLtA&usqp=CAU',
        title: 'x body',
        cols: 2,
    },
];

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const _ImageList = () => {
    return (
        <>
            <Box sx={{margin: 1}}>
                <ImageList
                    variant="quilted"
                    cols={4}
                    rowHeight={121}>
                    {itemData.map((item, numb) => (
                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{paddingRight: 1}}
                                title={item.title}
                                subtitle={item.author}
                                actionIcon={
                                    <IconButton
                                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                        aria-label={`info about ${item.title}`}
                                    >

                                        <DeleteIcon color={"primary"}/>
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>
    );
};

export default _ImageList;
