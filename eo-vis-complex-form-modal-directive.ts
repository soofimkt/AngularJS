import eoVisComplexFormController from './eo-vis-complex-form-controller';
const eoVisComplexFormTemplate = require('./eo-vis-complex-form.tpl.html');

export default function eoVisComplexFormModalDirective () {
    console.log("eoVisComplexFormModalDirective called");
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: eoVisComplexFormTemplate,
        controller: eoVisComplexFormController,
        controllerAs: 'eoVisComplexForm',
        bindToController: true,
        link: function(scope:any, element:any, attrs:any, ctrl:any){
            console.log("Link called");
            let queryResult:any = element[0].querySelector('.complexFormDiv');
            console.log(queryResult);
            let wrappedQueryResult:any = angular.element(queryResult);
            console.log(wrappedQueryResult);
            wrappedQueryResult.append(angular.element('<input type="button" value="Check" />'));

        }
    }
}


