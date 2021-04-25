"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
var request = require('sync-request');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const urlToRequest = tl.getInput('urlToRequest', true);
            const timeOutRequest = tl.getInput('timeOutRequest', true);
            const interval = tl.getInput('interval', true);
            var req;
            let timeMax = new Date();
            timeMax.setMinutes(new Date().getMinutes() + parseInt(timeOutRequest));
            console.log('Start Time: ' + new Date());
            console.log('End Time: ' + timeMax);
            var counter = 1;
            while (new Date() <= timeMax) {
                console.log('Attempt number: ' + counter);
                req = request('GET', urlToRequest);
                console.log('Status Code: ' + req.statusCode);
                if (req.statusCode == 200) {
                    break;
                }
                yield delay(parseInt(interval) * 1000);
                counter++;
                console.log('Date Now: ' + new Date());
            }
            if (parseInt(req.statusCode) != 200) {
                tl.setResult(tl.TaskResult.Failed, 'Http Request error"');
                return;
            }
            else {
                tl.setResult(tl.TaskResult.Succeeded, 'Request Succeeded"');
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
run();
