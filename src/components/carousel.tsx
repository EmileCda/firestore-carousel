import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { firebaseStorage } from "../lib/Firebase";
import { Button, ButtonGroup, Caption, Slide, SlideContainer } from "../styles/carousel.style";
import jsonData from "./../data/localData.json";
export const localData: any = jsonData;

const urlCarousel = localData.carousel.images;
const timerCount = localData.carousel.timer;

/**
 * This compoment create a carousel
 * picture to display are defined in json file  "./../data/localData.json";
 * first load image from firestore when all image are loaded then run the slider
 * timer value is in json file key = carousel.timer
 */

export default function Carousel() {
  // stat for img loaded from firestore
  const [imgList, setImgList] = useState(urlCarousel);
  // stade for initial loading
  const [loading, setLoading] = useState(true);
  // state for the index of picture to display
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    if (loading === false) {
      return;
    }
    // fetching image from firestore
    function fetchImg() {
      let newPicList = Array(urlCarousel.length);
      urlCarousel.map(async (url: string, index: number) => {
        const newUrl = await getDownloadURL(ref(firebaseStorage, "images/carousel/"+url));
        newPicList[index] = newUrl;

        if (!newPicList.includes(undefined)) {
          // stop loading when every pic have and ulr
          setLoading(false);
          setImgList(newPicList);
        }
      });
    }
    fetchImg();
  }, [loading]);

  /**
   * this function increment displayIndex by 1 and back to 0 when reach length
   */
  function foward() {
    const currentIndex = displayIndex;
    if (currentIndex < imgList.length - 1) {
      setDisplayIndex(currentIndex + 1);
    } else {
      setDisplayIndex(0);
    }
  }

  /**
   * this function decrement displayIndex by 1 and go to length when 0 is reached
   */
  function backward() {
    const currentIndex = displayIndex;
    if (currentIndex > 0) {
      setDisplayIndex(currentIndex - 1);
    } else {
      setDisplayIndex(imgList.length - 1);
    }
  }
  setTimeout(foward, timerCount); // automatic increment displayIndex with number of ms defined in json file

  return (
    <>
      <SlideContainer>
        {imgList.map((url: string, index: number) => (
          <Slide key={index} display={index === displayIndex}>
            <img
              src={url ? url : "Empty seat"}
              alt={`image n° ${index}`}
            />
            <Caption>texte caption</Caption>
          </Slide>
        ))}
        <ButtonGroup>
        <Button onClick={backward}><i className="fa-solid fa-backward-step"></i></Button>
        <Button onClick={foward}><i className="fa-solid fa-forward-step"></i></Button>
        </ButtonGroup>
      </SlideContainer>
    </>
  );
}
