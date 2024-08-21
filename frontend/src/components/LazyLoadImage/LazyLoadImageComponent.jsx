import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLoadImageComponent = (prop) => {
  return (
    <LazyLoadImage
        src={prop.src}
        className={prop.className || ""}
        effect="blur"
        wrapperProps={{
            // If you need to, you can tweak the effect transition using the wrapper style.
            style: {transitionDelay: "1s"},
        }}
    />
  )
}

export default LazyLoadImageComponent