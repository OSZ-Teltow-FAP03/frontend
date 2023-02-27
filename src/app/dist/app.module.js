"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var forms_1 = require("@angular/forms");
var not_found_component_1 = require("./error/not-found/not-found.component");
var generic_error_component_1 = require("./error/generic-error/generic-error.component");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var icon_1 = require("@angular/material/icon");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var video_forms_component_1 = require("./video-forms/video-forms.component");
var select_1 = require("@angular/material/select");
var checkbox_1 = require("@angular/material/checkbox");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                generic_error_component_1.GenericErrorComponent,
                not_found_component_1.NotFoundComponent,
                video_forms_component_1.VideoFormsComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                icon_1.MatIconModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                forms_1.ReactiveFormsModule,
                select_1.MatSelectModule,
                checkbox_1.MatCheckboxModule,
                button_1.MatButtonModule,
                drag_drop_1.DragDropModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
