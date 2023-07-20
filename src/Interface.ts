export interface MarketCap {
  code: string;
  color: string;
  change_24h: number;
  price: number;
  volume: number;
  market_cap: number;
}

export interface Volume {
  code: string;
  color: string;
  change_24h: number;
  price: number;
  volume: number;
  market_cap: number;
}

export interface EndpointResult {
  market_cap: MarketCap[];
  volume: Volume[];
}
//////////
export interface NivoChild {
  name: string;
  color: string;
  loc: number;
  price: number;
  change_24h: number;
}
export interface NivoInput {
  name: string;
  color: string;
  children: NivoChild[] | undefined;
}
