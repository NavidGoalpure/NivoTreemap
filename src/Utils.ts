import { EndpointResult, NivoChild, NivoInput } from './Interface';

export const calculateFontSize = (width: number) => {
  const baseSize = 13;
  let textLength = (width * 12) / 100;
  let fontSize;
  if (textLength >= baseSize) {
    fontSize = 2 * textLength - baseSize;
    return fontSize;
  } else {
    fontSize = textLength + baseSize;
    return fontSize;
  }
};

//
export const proxyEndpointData = (endpointData: EndpointResult): NivoInput => {
  const result = {} as NivoInput;
  const children: NivoChild[] = endpointData.market_cap.map((child) => {
    return {
      name: child.code,
      color: child.color,
      loc: child.market_cap,
      price: child.price,
      change_24h: child.change_24h,
    };
  });

  // const sortedChildren = sortNestedArray('children.loc', children);
  const sortedChildren = children.sort((a, b) => b.loc - a.loc);
  result.name = 'همه ارزها';
  result.color = '#ffffff';
  result.children = sortedChildren;

  return result;
};

/////////
export var priceFormatter = (price: number) => {
  const result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: price > 1 ? 2 : 6, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(price);
  return result;
};
