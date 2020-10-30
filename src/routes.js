import Gems from '@/pages/Gems.vue';
import PathAlgs from '@/pages/PathAlgs.vue';
import Life from '@/pages/Life.vue';

const routes = [
  {
    path: '/gems',
    name: 'Gems',
    component: Gems,
  },
  {
    path: '/path',
    name: 'PathAlgs',
    component: PathAlgs,
  },
  {
    path: '/life',
    name: 'Life',
    component: Life,  
  }
];

export default routes;
