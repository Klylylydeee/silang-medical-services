import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

import { changeDimension } from "src/app/store/web/webInformation";

const UseWindowSize = () => {
    const dispatch = useDispatch();
    const XXL = useMediaQuery({query: "(min-width: 1600px)"});
    const XL = useMediaQuery({query: "(min-width: 1200px)"});
    const LG = useMediaQuery({query: "(min-width: 992px)"});
    const MD = useMediaQuery({query: "(min-width: 768px)"});
    const SM = useMediaQuery({query: "(min-width: 576px)"});
    const XS = useMediaQuery({query: "(min-width: 344px)"});
    useEffect(() => {
      // Handler to call on window resize
        const handleResize = () => {
            // Set window width/height to state
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    
    dispatch(changeDimension({
        dimension: 
            XXL ?
                6
            : 
            XL ? 
                5
            :
            LG ?
                4
            :
            MD ?
                3
            :
            SM ?
                2
            :
            XS ?
                1
            :
                0
    }))

}

const AppDimension = () => {
    const dispatch = useDispatch();
    const XXL = useMediaQuery({query: "(min-width: 1600px)"});
    const XL = useMediaQuery({query: "(min-width: 1200px)"});
    const LG = useMediaQuery({query: "(min-width: 992px)"});
    const MD = useMediaQuery({query: "(min-width: 768px)"});
    const SM = useMediaQuery({query: "(min-width: 576px)"});
    const XS = useMediaQuery({query: "(min-width: 344px)"});

    useEffect(() => {
        dispatch(changeDimension({
            dimension: 
                XXL ?
                    6
                : 
                XL ? 
                    5
                :
                LG ?
                    4
                :
                MD ?
                    3
                :
                SM ?
                    2
                :
                XS ?
                    1
                :
                    0
        }))
    // eslint-disable-next-line
    }, [])

    UseWindowSize();

};

export default AppDimension;