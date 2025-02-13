import * as GC from "@grapecity/spread-sheets";

import "@grapecity/spread-sheets-designer-resources-cn"
import "@grapecity/spread-sheets-designer"
import {openai, modelInfo} from './openai'

import {showFormulaGenerateDialog, showDataAnalyzeDialog, showPivotTableCreateDialog} from './GPT_Templates'

import { ElLoading } from "element-plus";

let config = JSON.parse(JSON.stringify(GC.Spread.Sheets.Designer.DefaultConfig));

let formulaAnalyze = {
    "title":"智能公式分析",
    "text":"公式分析",
    "iconClass":"ribbon-button-formulaAnalyze",
    "bigButton":"=ribbonHeight>toolbarHeight",
    "commandName":"formulaAnalyze",
    execute: function(designer){
        let spread = designer.getWorkbook(),sheet = spread.getActiveSheet();
        let formula = sheet.getFormula(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex());
        if(formula){           
            let loading = ElLoading.service({ lock: true, text: "Loading", background: "rgba(0, 0, 0, 0.7)"});
            const response = openai.chat.completions.create({
                // model: "deepseek-r1-distill-qwen-7b",
                model: modelInfo.model,
                messages: [
                    { role: "system", content: "You are a helpful assistant. 直接告诉我公式的意义，不要有废话，不用计算结果，答复里不能重复问题。" },
                    { role: "user", content: formula + "，这个公式有什么意义？" }
                ],
            });
            response.then(function(completion){
                loading.close();
                let desc = completion.choices[0].message.content;
                GC.Spread.Sheets.Designer.showMessageBox(desc, "", GC.Spread.Sheets.Designer.MessageBoxIcon.info)
            }).catch(function(){loading.close()});
        }
        else{
            GC.Spread.Sheets.Designer.showMessageBox("单元格没有公式", "提醒", GC.Spread.Sheets.Designer.MessageBoxIcon.warning)
        }
    }
}
let formulaOptimize = {
    "title":"智能公式优化建议",
    "text":"优化建议",
    "iconClass":"ribbon-button-formulaOptimize",
    "bigButton":"=ribbonHeight>toolbarHeight",
    "commandName":"formulaOptimize",
    execute: function(designer){
        let spread = designer.getWorkbook(),sheet = spread.getActiveSheet();
        let formula = sheet.getFormula(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex());
        if(formula){
            let loading = ElLoading.service({ lock: true, text: "Loading", background: "rgba(0, 0, 0, 0.7)"});
            const response = openai.chat.completions.create({
                // model: "deepseek-r1-distill-qwen-7b",
                model: modelInfo.model,
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: formula + "，优化这个Excel公式，给出建议" }
                ],
            });
            response.then(function(completion){
                loading.close();
                let desc = completion.choices[0].message.content;
                GC.Spread.Sheets.Designer.showMessageBox(desc, "", GC.Spread.Sheets.Designer.MessageBoxIcon.info)
            }).error(function(){loading.close()});
        }
        else{
            GC.Spread.Sheets.Designer.showMessageBox("单元格没有公式", "提醒", GC.Spread.Sheets.Designer.MessageBoxIcon.warning)
        }
    }
}

let formulaGenerate = {
    "title":"智能公式生成",
    "text":"公式生成",
    "iconClass":"ribbon-button-formulaGenerate",
    "bigButton":"=ribbonHeight>toolbarHeight",
    "commandName":"formulaGenerate",
    execute: function(designer){
        showFormulaGenerateDialog({}, designer)
    }
}
let pivotTableSuggest = {
    "title":"建议的数据透视表",
    "text":"透视表建议",
    "iconClass":"ribbon-button-pivotTableSuggest",
    "bigButton":"=ribbonHeight>toolbarHeight",
    "commandName":"pivotTableSuggest",
    execute: function(designer){
        showPivotTableCreateDialog({}, designer)
    }
}
let dataAnalyze = {
    "title":"根据描述分析选择数据",
    "text":"智能分析",
    "iconClass":"ribbon-button-dataAnalyze",
    "bigButton":"=ribbonHeight>toolbarHeight",
    "commandName":"dataAnalyze",
    execute: function(designer){
        showDataAnalyzeDialog({}, designer)
    }
}

config.commandMap = {
    formulaAnalyze,
    formulaGenerate,
    formulaOptimize,
    pivotTableSuggest,
    dataAnalyze
}

let AI_Ribbon = {
    id: "ai_ribbon",
    text: "智能AI助手",
    buttonGroups:[
        {
            commandGroup: {children: [{commands: ['formulaAnalyze', 'formulaGenerate', 'formulaOptimize']}]},
            label:"公式助手",
        },
        {
            commandGroup: {children: [{commands: ['pivotTableSuggest', 'dataAnalyze']}]},
            label:"数据分析助手",
        }
    ]
}
config.ribbon.push(AI_Ribbon)

export {config}