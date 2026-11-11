import { Product } from '../../types/product';

export interface GalleryImage {
  id: string;
  label: string;
  viewType: 'front' | 'model' | 'detail' | 'lifestyle' | 'back';
  url: string;
  alt: string;
}

export interface SizeMeasurementRow {
  size: string;
  chestCm: number;
  chestIn: number;
  shoulderCm: number;
  shoulderIn: number;
  lengthCm: number;
  lengthIn: number;
  sleeveCm: number;
  sleeveIn: number;
}

export interface TrouserMeasurementRow {
  size: string;
  waistCm: number;
  waistIn: number;
  inseamCm: number;
  inseamIn: number;
  riseCm: number;
  riseIn: number;
  thighCm: number;
  thighIn: number;
  openingCm: number;
  openingIn: number;
}
