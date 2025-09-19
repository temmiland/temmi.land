/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Preview } from "@storybook/react";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far);

import './styles.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Welcome', 'Components', 'Widgets', 'Layouts', 'Pages'],
      }
    },
    //actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'page', value: '#141414' },
        { name: 'dark', value: '#060606' },
      ],
    },
  },
};

export default preview;
