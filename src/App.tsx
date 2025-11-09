import { useState, useEffect } from 'react';

function App() {
    const [time, setTime] = useState('');

    useEffect(() => {
        // 判断是否为生产环境（Vite 使用 import.meta.env）
        const isProd = import.meta.env.PROD;
        const apiBaseUrl = import.meta.env.VITE_API_URL || 
          (isProd ? 'https://your-app.fly.dev' : 'http://localhost:3001');
        
        const timeUrl = `${apiBaseUrl}/api/time`;
        const visitUrl = `${apiBaseUrl}/api/visit`;
        
        // 获取时间
        fetch(timeUrl)
          .then(res => {
            if (!res.ok) {
              throw new Error('获取时间失败');
            }
            return res.json();
          })
          .then(data => setTime(data.time))
          .catch(error => {
            console.error('获取时间错误:', error);
            setTime('获取失败');
          });
        
        // 记录访问（不阻塞主流程）
        fetch(visitUrl, { method: 'POST' })
          .catch(error => {
            console.error('记录访问失败:', error);
          });
    }, []);

    return (
        <div>
            <h1>我的接单演示站</h1>
            <p>API时间：{time}</p>
        </div>
    );
}

export default App;

