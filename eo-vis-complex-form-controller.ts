import {IScope} from 'angular';
import {ComplexPropertyItem} from "../../../../core/stencilset/eo-complex-property-item";
import {PropertyItem} from "../../../../core/stencilset/eo-property-item";
const eoVisComplexFormTemplate = require('./eo-vis-complex-form.tpl.html');

export default class VisComplexFormController {
    public title:string;
    public $q:any;
    public eoVisGridService:any;
    public selectedRowIndex:number;
    public complexProperties:any[];

    constructor(eoVisGridService:any, $q:any) {
        console.log("VisComplexFormController --- constructor");
        this.title = 'Custom Form';
        this.eoVisGridService = eoVisGridService;
        this.$q = $q;
        this.selectedRowIndex = 0;
        this.complexProperties = [];
    }

    cellEdit = (gridScope:any) => {
        if (gridScope && gridScope.row && gridScope.col) {
            if (gridScope.col.colDef.readonly == true) {
                return false;
            } else {
               // gridScope.col.editableCellTemplate = this.getCellEditorTemplate(gridScope.row, gridScope.col);
                return true;
            }
        }
        return false
    };

    getTemplate(type:string) {
        console.log("getTemplate");
        if(type && type === 'choice') {
          //  this.configureDropdownDetails(gridCol.colDef, gridRow.entity);
        }
        return this.eoVisGridService.getCellEditorTemplate(type, 'vis-grid-complex/popupHelper');
    }

    /*getLabel(complexPropertyItem:ComplexPropertyItem) {
        console.log("getLabel");
        if(complexPropertyItem) {
            return complexPropertyItem.name();
        }
        return "";
    }*/

    isRichTextEditor(type:string) {
        console.log("isRichTextEditor");
        if(type && type === 'richtext') {
            return true;
        }
        return false;
    }

    /*getCellEditorTemplate(gridRow:any, gridCol:any) {
        if(gridCol && gridCol.colDef.type === 'choice') {
            this.configureDropdownDetails(gridCol.colDef, gridRow.entity);
        }
        return this.eoVisGridService.getCellEditorTemplate(gridCol.colDef.type, 'vis-grid-complex/popupHelper');
    }*/

    configureDropdownDetails(colDef:any, data:any) {
        let options:any[] = [];
        _.forEach(data.items, function(item:PropertyItem) {
            let itemDisplayValue:string = _.escape(item.title());
            options.push({
                icon: item.icon(),
                title: itemDisplayValue,
                value: item.value()
            });
        });

        colDef.editDropdownOptionsArray = options;
        colDef.editDropdownIdLabel = 'value';
        colDef.editDropdownValueLabel = 'title';

        return colDef;
    }

    prepareData(complexPropertyItems:any){
        console.log(complexPropertyItems);
        let complexItems:any[] = [];

        if (complexPropertyItems) {
            let gridWidth:any = 598;
            let offsetWidth = 50;
            let availableColumnWidth = gridWidth - offsetWidth;
            let defaultColumnWidth:any = availableColumnWidth/ _.size(complexPropertyItems);

            _.forEach(complexPropertyItems, (complexPropertyItem:ComplexPropertyItem) => {
                let width = complexPropertyItem.width();
                if(!width || width < defaultColumnWidth) {
                    width = defaultColumnWidth;
                }

                complexItems.push({
                    id: complexPropertyItem.id(),
                    name: complexPropertyItem.id(),
                    field: complexPropertyItem.id(),
                    displayName: complexPropertyItem.name(),
                    width: width,
                    type: complexPropertyItem.type(),
                    enableColumnMenu: false,
                    readonly: complexPropertyItem.readonly(),
                    property: complexPropertyItem
                });
            });
        }
        this.complexProperties = complexItems;
        console.log(this.complexProperties);
        console.log("end prepare data");
    }

    show(data:any) {
        let deferred:any = this.$q.defer();
        console.log(data);
       /* if(data.complexItems)
        {
            this.complexProperties = this.prepareData(data.complexItems);
        }
        console.log(this.complexProperties);*/

        this.eoVisGridService.showModal({
            template: eoVisComplexFormTemplate,
            controller: this.dialogController
        }).then(function (modal:any) {

            modal.element // wait for modal to slide in
                .one('shown.bs.modal', function () {
                    modal.element.find('.eo-vis-grid-complex-editor-dialog').trigger('focus');
                });

            modal.element.modal();

            modal.close.then((result:any) => {
                deferred.resolve(result);
            });
        });

        return deferred.promise;
    }

    dialogController = ($scope:any, $compile:any, $element:any, close:any) => {
        $scope.eoVisComplexEditor = this;
        $scope.complexPropertiesData = $scope.eoVisComplexEditor.complexProperties;
        console.log("complexPropertiesData");
        console.log($scope.complexPropertiesData);

        $scope.save = () => {
            close({
                value: ""//this.getGridData()
            }, 500);
        };

        $scope.isRichTextEditor = (type:string) => {
            console.log("isRichTextEditor");
            if(type && type === 'richtext') {
                return true;
            }
            return false;
        }

        $scope.getTemplate = (type:string) => {
            console.log("getTemplate");
            if(type)
            {
                let html:any = "<div><form name=\"inputForm\"><input type=\"INPUT_TYPE\"></form></div>"
                let inputType:string = 'text';
                if(type === 'boolean')
                {
                    inputType = 'boolean';
                }
                else if(type === 'date')
                {
                    inputType = 'date';
                }
                else if(type === 'number')
                {
                    inputType = 'number';
                }

                html = html.replace('INPUT_TYPE', inputType);

                return $compile(html)($scope);
            }
            /*if(type && type === 'choice') {
                //  this.configureDropdownDetails(gridCol.colDef, gridRow.entity);
            }*/
            //return this.eoVisGridService.getCellEditorTemplate(type, 'vis-grid-complex/popupHelper');
        }

        $scope.showWindow = (grid:any, rowEntity:any, col:any) => {
            let colDef:any = col.colDef;
            let content:any = {
                type: colDef.type,
                id: colDef.id,
                value: rowEntity[colDef.id] || ""
            };

            if (content.type == "color") {
                let gridEditor:any = angular.element("input[ng-class='eo-vis-complex-popup-helper']");
                gridEditor.colorpicker({color: content.value, format: "hex"});
                gridEditor.colorpicker('show');
                gridEditor.on('hidePicker', (e:any)=> {
                    rowEntity[colDef.id] = e.color.toHex();
                });
            } else {
                let modalController = this.eoVisGridService.getModalController(content.type);
                if (content.type == "complex") {
                    let complexPropertyItems:any = colDef.property.complexItems();
                    if (complexPropertyItems.length > 0) {
                        content.complexItems = complexPropertyItems;
                    }
                } else if (content.type == "treeview") {
                    content.filter = ['dir'].concat(colDef.property.filter() || []);
                }

                modalController.show(content)
                    .then((result:any) => {
                        rowEntity[colDef.id] = result.value;
                    });
            }
        };

        $scope.closeComplexFormDialog = (result:any) =>{
            console.log("closeComplexFormDialog");
            close({cancel:true}, 500);
        }
    }
}