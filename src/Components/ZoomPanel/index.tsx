import './Style.scss';
import { BiFullscreen } from 'react-icons/bi';

interface Props {
  zoomValue: number;
  setZoomValue: React.Dispatch<React.SetStateAction<number>>;
}
const ZoomPanel: React.FC<Props> = ({ setZoomValue }) => {
  return (
    <div className={'heatmap__zoomPanel'}>
      <button
        onClick={() => {
          setZoomValue(1);
        }}
      >
        <BiFullscreen />
      </button>
      <button
        onClick={() => {
          setZoomValue((prevState) => prevState * 1.25);
        }}
      >
        +
      </button>
      <button
        onClick={() =>
          setZoomValue((prevState) =>
            prevState > 1 ? prevState / 1.25 : prevState
          )
        }
      >
        -
      </button>
    </div>
  );
};
export default ZoomPanel;
