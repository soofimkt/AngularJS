import * as angular from 'angular';
import eoVisComplexFormModule from './eo-vis-complex-form-module';
import EoVisComplexFormController from './eo-vis-complex-form-controller';

describe('eo-vis-complex-form-controller', () => {
    let controller:any, eoVisGridService:any;

    beforeEach(angular.mock.module(eoVisComplexFormModule.name, ($provide:any) => {
        eoVisGridService = jasmine.createSpyObj('eoVisGridService', ['showModal', 'getModalController', 'getCellEditorTemplate', 'getComponent']);
        $provide.value('eoVisGridService', eoVisGridService);
    }));

    beforeEach(angular.mock.inject((eoVisGridService:any, $q:any) => {
        eoVisGridService.showModal.and.returnValue($q.when({
            element: {
                modal: function () {
                }
            }
        }));
        controller = new EoVisComplexFormController(eoVisGridService, $q);
    }));

    describe('show dialog', () => {
        it('should in turn call eoVisGridService.showModal when invoked', () => {
            controller.show({});

            expect(eoVisGridService.showModal).toHaveBeenCalled();
        });
    });

});



