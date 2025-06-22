import { useRecoilState } from "recoil";
import { saerokFormState, SaerokFormState } from "./saerokFormAtom.js";
import { set } from "date-fns";

export const useSaerokForm = () => {
  const [form, setForm] = useRecoilState(saerokFormState);

  const setBirdName = (name: string | null) => setForm((prev: SaerokFormState) => ({ ...prev, birdName: name }));
  const setBirdId = (id: number | null) => setForm((prev: SaerokFormState) => ({ ...prev, birdId: id }));
  const setAddress = (addr: string) => setForm((prev: SaerokFormState) => ({ ...prev, address: addr }));
  const setLocationAlias = (alias: string) => setForm((prev: SaerokFormState) => ({ ...prev, locationAlias: alias }));
  const setLatitude = (lat: number | null) => setForm((prev: SaerokFormState) => ({ ...prev, latitude: lat }));
  const setLongitude = (lng: number | null) => setForm((prev: SaerokFormState) => ({ ...prev, longitude: lng }));
  const setDate = (date: string) => setForm((prev: SaerokFormState) => ({ ...prev, date }));
  const setMemo = (memo: string) => setForm((prev: SaerokFormState) => ({ ...prev, memo }));
  const setImageFile = (file: File | null) => setForm((prev: SaerokFormState) => ({ ...prev, imageFile: file }));
  const setImagePreviewUrl = (url: string | null) =>
    setForm((prev: SaerokFormState) => ({ ...prev, imagePreviewUrl: url }));
  const setImageId = (id: number | null) => setForm((prev: SaerokFormState) => ({ ...prev, imageId: id }));
  const setAccessLevel = (access: "PUBLIC" | "PRIVATE") =>
    setForm((prev: SaerokFormState) => ({ ...prev, accessLevel: access }));

  const setAddressDetails = ({
    address,
    locationAlias,
    latitude,
    longitude,
  }: {
    address: string;
    locationAlias: string;
    latitude: number;
    longitude: number;
  }) =>
    setForm((prev) => ({
      ...prev,
      address,
      locationAlias,
      latitude,
      longitude,
    }));

  const resetForm = () =>
    setForm({
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
    });

  return {
    form,
    setForm,
    setBirdName,
    setBirdId,
    setAddress,
    setLocationAlias,
    setLatitude,
    setLongitude,
    setDate,
    setMemo,
    setImageFile,
    setImagePreviewUrl,
    setImageId,
    setAddressDetails,
    setAccessLevel,
    resetForm,
  };
};
