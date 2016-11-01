import * as angular from 'angular';
import eoVisComplexFormModalDirective from './eo-vis-complex-form-modal-directive';
import eoVisComplexFormDirective from './eo-vis-complex-form-directive';

require('angular-modal-service');

export default angular.module('edoras-vis-components.eo-vis-complex-form',
    [])
    .directive('eoVisComplexFormModal', eoVisComplexFormModalDirective)
    .directive('eoVisComplexForm', eoVisComplexFormDirective);

