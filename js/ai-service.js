// AI服务类
class AIService {
    constructor(config, apiKey) {
        this.config = config;
        this.apiKey = apiKey;
    }

    // 通义千问请求
    async qwenRequest(message, systemPrompt) {
        try {
            const response = await fetch(this.config.qwen.baseURL + "/chat/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.qwen.model,
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: this.config.qwen.temperature,
                    top_p: this.config.qwen.top_p,
                    max_tokens: this.config.qwen.max_tokens
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API请求失败: ${errorData.error?.message || '未知错误'}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('通义千问请求错误:', error);
            throw error;
        }
    }
} 