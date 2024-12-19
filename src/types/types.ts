export interface ISearch {
  q: string;
  v: number;
  d: Array<{
    s: string;
    rank: number;
    l: string;
    id: string;
    i: { height: number; imageUrl: string; width: number };
  }>;
}
