import React from 'react';
const useMousePosition = (): {
  x: number | null;
  y: number | null;
  xRatio: number | null;
  yRatio: number | null;
} => {
  const [mousePosition, setMousePosition] = React.useState<{
    x: number | null;
    y: number | null;
    xRatio: number | null;
    yRatio: number | null;
  }>({
    x: null,
    y: null,
    xRatio: null,
    yRatio: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY,
        xRatio: ev.clientX / window.innerWidth,
        yRatio: ev.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
