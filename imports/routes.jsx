import React from 'react';
import {FlowRouter} from 'meteor/bensventures:flow-router-ssr';
import {mount} from 'react-mounter';
import AppLayout from './ui/layouts/app_layout';

const exposed = FlowRouter.group({});

exposed.route('/', {
  name: 'index',
  action() {
    import('./ui/page/homepage').then(({default: HomePage}) => {
      mount(AppLayout, {
        content: <HomePage/>
      })
    })
  }
});
