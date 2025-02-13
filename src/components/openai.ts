import OpenAI from "openai";

const openai = new OpenAI(
    {
        apiKey: "",
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
        dangerouslyAllowBrowser: true
    }
);

const modelInfo = {
    model: "deepseek-r1-distill-qwen-7b",
}

export { openai, modelInfo };