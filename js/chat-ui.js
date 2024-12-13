// 聊天界面通用功能
class ChatUI {
    constructor(messagesContainer, messageInput, sendButton) {
        this.messagesContainer = messagesContainer;
        this.messageInput = messageInput;
        this.sendButton = sendButton;
    }

    // 格式化时间
    formatTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // 设置加载状态
    setLoading(isLoading) {
        this.sendButton.disabled = isLoading;
        this.messageInput.disabled = isLoading;
        
        if (isLoading) {
            this.addMessage('正在思考中<span class="loading-dots"></span>', 'ai', true);
        }
    }

    // 添加消息
    addMessage(text, type, isLoading = false, useTypeWriter = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (isLoading) {
            contentDiv.innerHTML = text;
        } else {
            contentDiv.textContent = text;
        }
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.formatTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        // 滚动到底部
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // 如果需要打字机效果
        if (useTypeWriter && !isLoading) {
            this.typeWriter(contentDiv, text);
        }

        return messageDiv;
    }

    // 打字机效果
    async typeWriter(element, text) {
        const delay = 30;
        element.textContent = '';
        element.classList.add('typing');
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        element.classList.remove('typing');
    }

    // 移除消息
    removeMessage(messageElement) {
        if (messageElement && messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }
} 