import { atom } from "recoil";

export interface SaerokFormState {
  birdName: string | null;
  birdId: number | null;
  address: string;
  locationAlias: string;
  latitude: number | null;
  longitude: number | null;
  date: string;
  memo: string;
  imageFile: File | null;
  imagePreviewUrl: string | null;
  imageId: number | null;
  accessLevel: "PUBLIC" | "PRIVATE";
}

export const saerokFormState = atom<SaerokFormState>({
  key: "saerokFormState",
  default: {
    birdName: "",
    birdId: null,
    address: "",
    locationAlias: "",
    latitude: null,
    longitude: null,
    date: "",
    memo: "",
    imageFile: null,
    imagePreviewUrl: null,
    imageId: null,
    accessLevel: "PUBLIC",
  },
});
