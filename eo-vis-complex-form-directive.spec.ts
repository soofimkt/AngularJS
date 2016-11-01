import * as angular from 'angular';
import {IAugmentedJQuery, IAugmentedJQueryStatic} from 'angular';
import eoVisComplexFormModule from './eo-vis-complex-form-module';

describe('eo-vis-complex-form-directive', () => {
    const element:IAugmentedJQueryStatic = angular.element;
    let compiledElement:IAugmentedJQuery, controller:any, eoVisGridService:any;

    beforeEach(angular.mock.module(eoVisComplexFormModule.name, ($provide:any) => {
        eoVisGridService = jasmine.createSpyObj('eoVisGridService', ['showModal', 'getModalController', 'getCellEditorTemplate', 'getComponent']);
        $provide.value('eoVisGridService', eoVisGridService);
    }));

    beforeEach(angular.mock.inject(() => {
        compiledElement = compileTemplate('<eo-vis-complex-form></eo-vis-complex-form>');
        controller = compiledElement.controller('eoVisComplexForm');
    }));

    describe('compiled directive', () => {
        it('should contain element with respective class', () => {
            expect(compiledElement.find('.eo-vis-complex-form-dialog').length).toBe(1);
        });
    });
});