import './App.scss';
import React, { useEffect, useRef } from 'react';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import FormatLabel from './Components/CustomLabel';
import { proxyEndpointData } from './Utils';
import { bitpinData } from './Const';
import { NivoChild } from './Interface';
import Tooltip from './Components/Tooltip';
import ZoomPanel from './Components/ZoomPanel';
import { useState } from 'react';
import useMousePosition from './Hooks/useMouse';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { xRatio, yRatio } = useMousePosition();
  const [zoomValue, setZoomValue] = useState<number>(1);
  const [wheelPosition, setWheelPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const delta = Math.sign(event.deltaY);
      if (delta > 0) {
        setZoomValue((prevState) =>
          prevState > 1 ? prevState / 1.25 : prevState
        );
        setWheelPosition({ x: event.x, y: event.y });
      } else {
        setZoomValue((prevState) => prevState * 1.25);
        setWheelPosition({ x: event.x, y: event.y });
      }
    };

    window.addEventListener('wheel', onWheel);

    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    containerRef?.current?.scrollTo({
      top: window.innerHeight * zoomValue * (yRatio || 1),
      left: window.innerWidth * zoomValue * (xRatio || 1),
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wheelPosition, zoomValue]);

  return (
    <div
      className='App'
      ref={containerRef}
      style={{ height: window.innerHeight }}
    >
      <div ref={wrapperRef} className='heatmap__wrapper'>
        <ResponsiveTreeMapHtml
          data={proxyEndpointData(bitpinData)}
          identity='name'
          value='loc'
          //
          width={window.innerWidth * zoomValue}
          height={window.innerHeight * zoomValue}
          colors={(params) => {
            return params.data.color;
          }}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          innerPadding={4}
          leavesOnly={true}
          nodeOpacity={1}
          valueFormat='.02s'
          //@ts-ignore
          label={(e) => {
            return <FormatLabel value={e} />;
          }}
          onClick={(node) => {
            window.location.href = `https://bitpin.ir/coin/${node?.data?.name}`;
          }}
          labelSkipSize={40}
          tile='binary'
          orientLabel={false}
          borderWidth={1}
          tooltip={({ node }) => {
            const tileData: NivoChild = node?.data as NivoChild;

            if (tileData) {
              return <Tooltip {...tileData} />;
            } else {
              return (
                <strong style={{ color: node.color }}>
                  {node.formattedValue}
                </strong>
              );
            }
          }}
        />
      </div>
      <ZoomPanel zoomValue={zoomValue} setZoomValue={setZoomValue} />
    </div>
  );
}

export default App;
