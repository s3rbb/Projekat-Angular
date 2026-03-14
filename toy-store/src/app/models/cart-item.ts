import { Toy } from './toy';

export interface CartItem extends Toy {
  status: 'rezervisano' | 'pristiglo' | 'otkazano';
  rating?: number;
}
