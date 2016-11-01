import eoVisComplexFormController from './eo-vis-complex-form-controller';
import {ComplexPropertyItem} from "../../../../core/stencilset/eo-complex-property-item";

export default function eoVisComplexFormDirective ($timeout:any) {
    console.log("eoVisComplexFormDirective called");
    return {
        restrict: 'E',
        //require: '^eoVisComplexFormModal',
         controller: eoVisComplexFormController,
        /*compile: function compile(tElement:any, tAttribute:any) {
            return {
                pre: function preLink(scope:any, iElement:any, iAttrs:any, controller:any) {
                    console.log("preLink");
                    console.log(scope);
                    console.log(iElement);
                    console.log(iAttrs);
                    console.log(controller);
                    let complexProperties:any[] = scope.complexPropertiesData;
                    if(complexProperties) {
                        _.forEach(complexProperties, (complexPropertyItem:ComplexPropertyItem) => {
                            {
                                let type = complexPropertyItem.type();
                                console.log(type);
                            }
                        });
                    }
                },
                post: function postLink(scope:any, iElement:any, iAttrs:any, controller:any) {
                    console.log("postLink");
                }
            }
        }*/
        link: function(scope:any, element:any, attrs:any, ctrl:any){
            console.log("Link called");
            console.log(scope);
            console.log(attrs);
            console.log(ctrl);
            let complexPropertyFunction:any = function() {
                console.log("Inside complexPropertyFunction");
                let complexProperties:any[] = scope.complexPropertiesData;
                console.log(complexProperties);
                if(complexProperties) {
                    let html:any = "";
                    _.forEach(complexProperties, (complexPropertyItem:ComplexPropertyItem) => {
                        {
                            let type = complexPropertyItem.type;
                            html += ctrl.getTemplate(type);
                            console.log(type);
                            console.log(html);
                        }

                        element.append(angular.element(html));
                    });
                }
            };

            $timeout(complexPropertyFunction,0);

            /*scope.$watch('scope.complexPropertiesData', function(newVal:any) {
                if(newVal) {
                    _.forEach(newVal, (complexPropertyItem:ComplexPropertyItem) => {
                        {
                            let type = complexPropertyItem.type();
                            console.log(type);
                        }
                    });
                }
            });*/
            /*let queryResult:any = element[0].querySelector('.complexFormDiv');
            console.log(queryResult);
            let wrappedQueryResult:any = angular.element(queryResult);
            console.log(wrappedQueryResult);*/
            //element.append(angular.element('<input type="button" value="Check" />'));

        }
    }
}


