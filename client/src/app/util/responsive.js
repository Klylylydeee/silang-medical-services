import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

// import { changeDimension } from "src/app/store/webApplicationConfiguration/webApplicationConfiguration";

const AppDimension = () => {
    const dispatch = useDispatch();
    const XXL = useMediaQuery({query: "(min-width: 1600px)"});
    const XL = useMediaQuery({query: "(min-width: 1200px)"});
    const LG = useMediaQuery({query: "(min-width: 992px)"});
    const MD = useMediaQuery({query: "(min-width: 768px)"});
    const SM = useMediaQuery({query: "(min-width: 576px)"});
    const XS = useMediaQuery({query: "(min-width: 344px)"});

    // useEffect(() => {
    //     dispatch(changeDimension({
    //         dimension: 
    //             XXL ?
    //                 6
    //             : 
    //             XL ? 
    //                 5
    //             :
    //             LG ?
    //                 4
    //             :
    //             MD ?
    //                 3
    //             :
    //             SM ?
    //                 2
    //             :
    //             XS ?
    //                 1
    //             :
    //                 0
    //     }))
    // // eslint-disable-next-line
    // }, [])

    // useEffect(() => {
    //     dispatch(changeDimension({
    //         dimension: 
    //             XXL ?
    //                 6
    //             : 
    //             XL ? 
    //                 5
    //             :
    //             LG ?
    //                 4
    //             :
    //             MD ?
    //                 3
    //             :
    //             SM ?
    //                 2
    //             :
    //             XS ?
    //                 1
    //             :
    //                 0
    //     }))
    // // eslint-disable-next-line
    // }, [window.innerWidth, window.innerHeight]);

};

export default AppDimension;