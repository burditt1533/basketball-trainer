import { courtZones } from '../utils/courtZones.js';
import { dribbling } from './dribbling.js';
import { combos } from './combos.js';
import { conditioning } from './conditioning.js';
import { defense } from './defense.js';
import { freethrows } from './freethrows.js';
import { layups } from './layups.js';
import { post } from './post.js';
import { shooting } from './shooting.js';
import { warmups } from './warmups.js';

const allWorkouts = {
  warmups,
  shooting,
  freethrows,
  layups,
  // dribbling,
  conditioning,
  defense,
  combos,
  post,
};

export { allWorkouts };
