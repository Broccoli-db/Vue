// WebSocket 服务器地址
const socketUrl = 'ws://localhost:8080'; // 替换为你的 WebSocket 服务器地址
let socket; // 用于存储 WebSocket 实例

// 重连和心跳的配置
let reconnectInterval = 5000; // 5秒后重试连接
let pingInterval = 30000; // 每30秒发送一次ping
let pingTimeout = 10000; // 如果10秒内没有响应，则认为连接断开
let reconnectAttempts = 0; // 当前重连尝试次数
const maxReconnectAttempts = 10; // 最大重连次数，防止无限重连
let lastPingTime = Date.now(); // 用来记录上次发送ping消息的时间

// 连接到 WebSocket 服务器
function connect() {
    // 创建 WebSocket 实例
    socket = new WebSocket(socketUrl);
    // WebSocket 连接成功时的处理逻辑
    socket.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttempts = 0; // 重连次数归零
        // 设置定时器，定期发送 ping 消息
        setInterval(() => {
            if (Date.now() - lastPingTime > pingTimeout) {
                console.log('Connection lost, attempting to reconnect...');
                reconnect(); // 如果超时未收到响应，则尝试重连
            } else {
                // 发送 ping 消息到服务器，保持连接活跃
                socket.send(JSON.stringify({ type: 'ping' }));
                console.log('Ping sent');
            }
        }, pingInterval); // 每30秒发送一次 ping
    };

    // WebSocket 收到消息时的处理逻辑
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data); // 解析收到的消息

        // 如果收到的消息是 pong，则更新最后 ping 的时间
        if (message.type === 'pong') {
            console.log('Pong received');
            lastPingTime = Date.now(); // 收到 pong 时更新时间
        }
    };

    // WebSocket 出现错误时的处理逻辑
    socket.onerror = (error) => {
        console.error('WebSocket Error: ', error);
    };

    // WebSocket 关闭时的处理逻辑
    socket.onclose = () => {
        console.log('WebSocket closed');
    };
}

// 重连逻辑
function reconnect() {
    // 如果达到最大重连次数，则不再重试
    if (reconnectAttempts >= maxReconnectAttempts) {
        console.log('Max reconnect attempts reached');
        return;
    }

    reconnectAttempts++; // 增加重连尝试次数
    console.log(`Reconnecting... Attempt ${reconnectAttempts}`);

    // 如果当前 WebSocket 连接还在，先关闭它
    if (socket && socket.readyState !== WebSocket.CLOSED) {
        console.log('Closing the previous WebSocket connection');
        socket.close(); // 关闭现有连接
    }

    // 设置延迟，避免过于频繁的重连
    setTimeout(() => {
        connect(); // 重新建立连接
    }, reconnectInterval); // 每次重连间隔为 5 秒
}

// 启动连接
connect();
