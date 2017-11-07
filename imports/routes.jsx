import {FlowRouter} from 'meteor/bensventures:flow-router-ssr';
import React from 'react';
import {mount} from 'react-mounter';
import AppLayout from './ui/layouts/app_layout';

const exposed = FlowRouter.group({});

exposed.route('/', {
    name: 'index',
    action() {
        import('./ui/components/webstat').then(({default: WebStat}) => {
            mount(AppLayout, {
                content: <WebStat />
            })
        })
    }
});

exposed.route('/ticket', {
    name: 'ticket',
    action() {
        import('./ui/components/webstat').then(({default: WebStat}) => {
            mount(AppLayout, {
                content: <WebStat id='67774jtYxTLwAQ2bj'/>
            })
        })
    }
});