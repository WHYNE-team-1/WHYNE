import redWineIcon from '@/assets/icons/ic-wine-red.svg';
import whiteWineIcon from '@/assets/icons/ic-wine-white.svg';
import sparklingWineIcon from '@/assets/icons/ic-wine-sparkling.svg';

export type WineTypeKind = 'RED' | 'WHITE' | 'SPARKLING';

export const WINE_TYPES = {
  RED: { 
    label: 'Red', 
    image: redWineIcon,
  },
  WHITE: { 
    label: 'White', 
    image: whiteWineIcon,
  },
  SPARKLING: { 
    label: 'Sparkling', 
    image: sparklingWineIcon,
  },
};