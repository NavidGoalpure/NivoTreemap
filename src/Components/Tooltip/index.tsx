import { useLayoutEffect, useState } from 'react';
import { useRef } from 'react';
import { NivoChild } from '../../Interface';
import { priceFormatter } from '../../Utils';
import './Style.scss';

const Tooltip: React.FC<NivoChild> = (tileData) => {
  const ref = useRef<HTMLDivElement>(null);
  const [marginBottom, setMarginBottom] = useState<number>(0);
  const [marginRight, setMarginRight] = useState<number>(0);
  useLayoutEffect(() => {
    if (ref.current && window) {
      const { width, x, height, y }: DOMRect =
        ref?.current?.getBoundingClientRect();

      if ((height + y) / 2 > window.innerHeight / 2) {
        setMarginBottom(height + 10);
      }
      if (width + x > window.innerWidth) setMarginRight(width);
    }
  }, [ref]);
  return (
    <div
      className={'heatmap__tooltip'}
      ref={ref}
      style={{
        transform: `translateY(-${marginBottom}px)`,
        marginLeft: `-${marginRight}px`,
      }}
    >
      <h4>{tileData?.name}</h4>
      <hr />
      <p>
        <span>Current Price: </span>
        {priceFormatter(tileData?.price)}
      </p>
      <p>
        <span>Market Cap: </span>
        {priceFormatter(tileData?.loc)}{' '}
      </p>
      <p>
        {/* @ts-ignore */}
        <span>Price Change:</span>
        {tileData?.change_24h.toFixed(3) + '%'}
      </p>
    </div>
  );
};
export default Tooltip;
