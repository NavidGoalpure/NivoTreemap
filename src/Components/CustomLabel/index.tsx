import { calculateFontSize, priceFormatter } from '../../Utils';
import './Style.scss';
interface Props {
  value: any;
}
const FormatLabel: React.FC<Props> = ({ value }) => {
  const fontSize = calculateFontSize(value.width);
  const priceFontSize = fontSize / 3;
  const changeFontSize = priceFontSize / 2;
  //
  const price_change = value?.data?.change_24h;
  const price = priceFormatter(value?.data?.price);
  return (
    <div className='heatmap__CustomLabel'>
      <h2
        style={{
          fontSize,
        }}
      >
        {value.data.name.toUpperCase()}
      </h2>
      <h3
        style={{
          fontSize: priceFontSize,
        }}
      >
        {price}
      </h3>

      {price_change ? (
        <h3
          style={{
            fontSize: changeFontSize,
          }}
        >
          {price_change > 0 ? '+' : null}
          {Math.round(price_change * 100) / 100}%
        </h3>
      ) : null}
    </div>
  );
};
export default FormatLabel;
