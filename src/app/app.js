"use strict";

import '../scss/core.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import modules from '../modules/modules';
import router from './router';

angular.module('app', [
        ...modules,
        uirouter
    ])
    .config(router);