import { getDefaultPath } from '../../helpers/urlSync';
import getDevSidebar from '../../customApp/sidebar';

const options = [
  {
    label: 'Enquiry',
    leftIcon: 'all_inclusive',
    key: 'enquiry',
  },
  ...getDevSidebar,
];
const getBreadcrumbOption = () => {
  const preKeys = getDefaultPath();
  let parent, activeChildren;
  options.forEach(option => {
    if (preKeys[option.key]) {
      parent = option;
      (option.children || []).forEach(child => {
        if (preKeys[child.key]) {
          activeChildren = child;
        }
      });
    }
  });
  return { parent, activeChildren };
};
export default options;
export { getBreadcrumbOption };
