import { useEffect, useRef } from 'react';
import './App.scss';

const unsplashUrls = [
  'https://images.unsplash.com/photo-1529971071135-c1982792bb96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80',
  'https://images.unsplash.com/photo-1594780841377-e05e12d0d1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80',
  'https://images.unsplash.com/photo-1591251436930-a1e858c633a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80',
  'https://images.unsplash.com/photo-1564109799258-6b7c25cd1c92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80',

  'https://images.unsplash.com/photo-1552793084-49132af00ff1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80',
  'https://images.unsplash.com/photo-1548918901-9b31223c5c3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80',
];

function clamp(value, lover, upper) {
  if (value > upper) return upper;
  if (value < lover) return lover;
  return value;
}

function App() {
  const slider = useRef();
  const stateRef = useRef({
    hasMousePress: false,
    startXPosition: 0,
    transformAmount: 0,
    velocity: 0,
    requestAnimationId: 0,
  });

  const mouseDown = (event) => {
    stateRef.current.hasMousePress = true;
    stateRef.current.startXPosition =
      event.pageX - stateRef.current.transformAmount;
  };
  const mouseLeave = () => {
    stateRef.current.hasMousePress = false;
  };
  const mouseUp = () => {
    stateRef.current.hasMousePress = false;
  };
  const mouseMove = (event) => {
    if (!stateRef.current.hasMousePress) return;

    const { pageX } = event;
    const distance = pageX - stateRef.current.startXPosition;
    const clampedDistance = clamp(
      distance,
      -slider.current.scrollWidth + slider.current.clientWidth,
      0
    );
    stateRef.current.velocity =
      stateRef.current.transformAmount - clampedDistance;
    stateRef.current.transformAmount = clampedDistance;
    slider.current.style.transform = `translate3d(${clampedDistance}px, 0px, 0px)`;
  };

  useEffect(() => {
    const sliderCopy = slider.current;
    sliderCopy.addEventListener('mousedown', mouseDown);
    sliderCopy.addEventListener('mouseleave', mouseLeave);
    sliderCopy.addEventListener('mouseup', mouseUp);
    sliderCopy.addEventListener('mousemove', mouseMove);

    return () => {
      sliderCopy.removeEventListener('mousedown', mouseDown);
      sliderCopy.removeEventListener('mouseleave', mouseLeave);
      sliderCopy.removeEventListener('mouseup', mouseUp);
      sliderCopy.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return (
    <div className="family" ref={slider}>
      {unsplashUrls.map((url) => (
        <div className="family-item">
          <div
            className="family-item-image"
            style={{ backgroundImage: `url(${url})` }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default App;
