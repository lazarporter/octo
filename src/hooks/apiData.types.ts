interface Enriched {
  isCrownJewel: boolean;
}

type Owner =
  | {
      name: string | null;
    }
  | {
      owner: Owner;
    };

export type APIData = {
  _id: string;
  enriched: Enriched;
  assetName: string;
  owner: Owner;
};
