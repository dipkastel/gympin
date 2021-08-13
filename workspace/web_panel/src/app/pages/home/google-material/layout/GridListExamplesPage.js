/* eslint-disable no-unused-vars */
import React from "react";
import Notice from "../../../../partials/content/Notice";
import CodeExample from "../../../../partials/content/CodeExample";
import { makeStyles } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {
  ImageList,
  ImageListItem,
  ListSubheader,
  ImageListItemBar,
  IconButton
} from "@material-ui/core";

const tileData = [
  {
    img: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
    title: "Breakfast",
    author: "jill111",
    cols: 2,
    featured: true
  },
  {
    img: "https://material-ui.com/static/images/grid-list/burgers.jpg",
    title: "Tasty burger",
    author: "director90"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/camera.jpg",
    title: "Camera",
    author: "Danson67"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/morning.jpg",
    title: "Morning",
    author: "fancycrave1",
    featured: true
  },
  {
    img: "https://material-ui.com/static/images/grid-list/hats.jpg",
    title: "Hats",
    author: "Hans"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/honey.jpg",
    title: "Honey",
    author: "fancycravel"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/vegetables.jpg",
    title: "Vegetables",
    author: "jill111",
    cols: 2
  },
  {
    img: "https://material-ui.com/static/images/grid-list/plant.jpg",
    title: "Water plant",
    author: "BkrmadtyaKarki"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/mushroom.jpg",
    title: "Mushrooms",
    author: "PublicDomainPictures"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/olive.jpg",
    title: "Olive oil",
    author: "congerdesign"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/star.jpg",
    title: "Sea star",
    cols: 2,
    author: "821292"
  },
  {
    img: "https://material-ui.com/static/images/grid-list/bike.jpg",
    title: "Bike",
    author: "danfador"
  }
];
const jsCode1 = `
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import tileData from './tileData';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  ImageList: {
    width: 500,
    height: 450,
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList cellHeight={160} className={classes.ImageList} cols={3}>
        {tileData.map(tile => (
          <ImageListItem key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
`;
const jsCode2 = `
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  ImageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList cellHeight={180} className={classes.ImageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {tileData.map(tile => (
          <ImageListItem key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <ImageListItemBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={\`info about \${tile.title}\`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
`;
const jsCode3 = `
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './tileData';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  ImageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList className={classes.ImageList} cols={2.5}>
        {tileData.map(tile => (
          <ImageListItem key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <ImageListItemBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={\`star \${tile.title}\`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
`;
const jsCode4 = `
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './tileData';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  ImageList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function AdvancedImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList cellHeight={200} spacing={1} className={classes.ImageList}>
        {tileData.map(tile => (
          <ImageListItem key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.img} alt={tile.title} />
            <ImageListItemBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={\`star \${tile.title}\`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  ImageList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

const useStyles3 = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  ImageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

const useStyles4 = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  ImageList: {
    width: 1200,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
}));

export default function ImageListExamplesPage() {
  const classes = useStyles();
  const classes3 = useStyles3();
  const classes4 = useStyles4();

  return (
    <>
      <Notice icon="flaticon-warning kt-font-primary">
        <p>Grid lists display a collection of images in an organized grid.</p>
        <p>
          For more info please check the components's official{" "}
          <a
            target="_blank"
            className="kt-link"
            rel="noopener noreferrer"
            href="https://material-ui.com/components/grid-list/"
          >
            demos & documentation
          </a>
        </p>
      </Notice>

      <Notice>
        <code>Grid lists</code> represent a collection of items in a repeated
        pattern. They help improve the visual comprehension of the content they
        hold.
      </Notice>

      <div className="row">
        <div className="col-md-6">
          <CodeExample jsCode={jsCode1} beforeCodeTitle="Image-only grid list">
            <div className="kt-section">
              <span className="kt-section__sub">
                A simple example of a scrollable image <code>ImageList</code> .
              </span>
              <div className="kt-separator kt-separator--dashed"></div>
              <div className="kt-section__content">
                <div className={classes.root}>
                  <ImageList
                    cellHeight={160}
                    className={classes.ImageList}
                    cols={3}
                  >
                    {tileData.map(tile => (
                      <ImageListItem key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </div>
            </div>
          </CodeExample>
        </div>
        <div className="col-md-6">
          <CodeExample
            jsCode={jsCode2}
            beforeCodeTitle="Grid list with titlebars"
          >
            <div className="kt-section">
              <span className="kt-section__sub">
                This example demonstrates the use of the{" "}
                <code>ImageListItemBar</code> to add an overlay to each{" "}
                <code>ImageListItem</code>. The overlay can accommodate a{" "}
                <code>title</code>, <code>subtitle</code> and secondary action -
                in this example an <code>IconButton</code>.
              </span>
              <div className="kt-separator kt-separator--dashed"></div>
              <div className="kt-section__content">
                <div className={classes.root}>
                  <ImageList cellHeight={180} className={classes.ImageList}>
                    <ImageListItem
                      key="Subheader"
                      cols={2}
                      style={{ height: "auto" }}
                    >
                      <ListSubheader component="div">December</ListSubheader>
                    </ImageListItem>
                    {tileData.map(tile => (
                      <ImageListItem key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <ImageListItemBar
                          title={tile.title}
                          subtitle={<span>by: {tile.author}</span>}
                          actionIcon={
                            <IconButton
                              aria-label={`info about ${tile.title}`}
                              className={classes.icon}
                            >
                              <i className="flaticon-information"></i>
                            </IconButton>
                          }
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </div>
            </div>
          </CodeExample>
        </div>
      </div>

      <CodeExample jsCode={jsCode3} beforeCodeTitle="Single line Grid list">
        <div className="kt-section">
          <span className="kt-section__sub">
            This example demonstrates a horizontal scrollable single-line grid
            list of images. Horizontally scrolling grid lists are discouraged
            because the scrolling interferes with typical reading patterns,
            affecting comprehension. One notable exception is a
            horizontally-scrolling, single-line grid list of images, such as a
            gallery.
          </span>
          <div className="kt-separator kt-separator--dashed"></div>
          <div className="kt-section__content">
            <div className={classes3.root}>
              <ImageList className={classes3.ImageList} cols={2.5}>
                {tileData.map(tile => (
                  <ImageListItem key={tile.img}>
                    <img src={tile.img} alt={tile.title} />
                    <ImageListItemBar
                      title={tile.title}
                      classes={{
                        root: classes3.titleBar,
                        title: classes3.title
                      }}
                      actionIcon={
                        <IconButton aria-label={`star ${tile.title}`}>
                          <i className="flaticon-star"></i>
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        </div>
      </CodeExample>
      <CodeExample jsCode={jsCode4} beforeCodeTitle="Advanced Grid list">
        <div className="kt-section">
          <span className="kt-section__sub">
            This example demonstrates "featured" tiles, using the{" "}
            <code>rows</code> and <code>cols</code> props to adjust the size of
            the tile, and the <code>padding</code> prop to adjust the spacing.
            The tiles have a customized titlebar, positioned at the top and with
            a custom gradient <code>titleBackground</code>. The secondary action{" "}
            <code>IconButton</code> is positioned on the left.
          </span>
          <div className="kt-separator kt-separator--dashed"></div>
          <div className="kt-section__content">
            <div className={classes4.root}>
              <ImageList
                cellHeight={200}
                spacing={1}
                className={classes4.ImageList}
              >
                {tileData.map(tile => (
                  <ImageListItem
                    key={tile.img}
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.img} alt={tile.title} />
                    <ImageListItemBar
                      title={tile.title}
                      titlePosition="top"
                      actionIcon={
                        <IconButton
                          aria-label={`star ${tile.title}`}
                          className={classes4.icon}
                        >
                          <StarBorderIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={classes4.titleBar}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        </div>
      </CodeExample>
    </>
  );
}
