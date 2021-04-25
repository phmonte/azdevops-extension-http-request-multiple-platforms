import tl = require('azure-pipelines-task-lib/task');
var request = require('sync-request');

async function run() {
    try {
        const urlToRequest: string | undefined = tl.getInput('urlToRequest', true);
        const timeOutRequest: string | undefined = tl.getInput('timeOutRequest', true);
        const interval: string | undefined = tl.getInput('interval', true);
        var req : any;
        let timeMax = new Date();
        timeMax.setMinutes(new Date().getMinutes() + parseInt(timeOutRequest!));

        console.log('Start Time: ' + new Date());
        console.log('End Time: ' + timeMax);
        
        var counter = 1;
        while (new Date() <= timeMax) {
            console.log('Attempt number: '+ counter);
            req = request('GET', urlToRequest);
            console.log('Status Code: '+ req.statusCode)
            if(req.statusCode == 200){
                break;
            }
            await delay(parseInt(interval!) * 1000);
            counter++;
            console.log('Date Now: '+ new Date());
        }

        if (parseInt(req.statusCode) != 200) {
            tl.setResult(tl.TaskResult.Failed, 'Http Request error"');
            return;
        }else{
            tl.setResult(tl.TaskResult.Succeeded, 'Request Succeeded"');
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

run();