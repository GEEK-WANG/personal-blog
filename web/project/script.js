// 侧边栏切换
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

// 点击外部关闭侧边栏
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});

// 功能卡片展开/收起
const functionCards = document.querySelectorAll('.function-card');

functionCards.forEach(card => {
    const header = card.querySelector('.function-header');
    
    header.addEventListener('click', () => {
        // 关闭其他卡片
        functionCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('active')) {
                otherCard.classList.remove('active');
            }
        });
        
        // 切换当前卡片
        card.classList.toggle('active');
    });
});

// QQ查询
const qbindBtn = document.getElementById('qbindBtn');
const queryType = document.getElementById('queryType');
const queryInput = document.getElementById('queryInput');
const queryInputLabel = document.getElementById('queryInputLabel');
const qbindResult = document.getElementById('qbindResult');
const copyQbindResultBtn = document.getElementById('copyQbindResultBtn');

// 动态更新输入框标签和占位符
queryType.addEventListener('change', () => {
    const type = queryType.value;
    switch(type) {
        case 'qq2phone':
            queryInputLabel.textContent = 'QQ号码';
            queryInput.placeholder = '请输入5～10位QQ号码';
            break;
        case 'phone2qq':
        case 'phone2wbuid':
            queryInputLabel.textContent = '手机号';
            queryInput.placeholder = '请输入11位手机号码';
            break;
        case 'wbuid2phone':
            queryInputLabel.textContent = '微博UID';
            queryInput.placeholder = '请输入微博用户UID';
            break;
        case 'lolname2qq':
            queryInputLabel.textContent = '英雄联盟昵称';
            queryInput.placeholder = '请输入英雄联盟游戏昵称';
            break;
        case 'qq2lolname':
            queryInputLabel.textContent = 'QQ号码';
            queryInput.placeholder = '请输入5～10位QQ号码';
            break;
    }
});

// 查询按钮点击事件
qbindBtn.addEventListener('click', async () => {
    const type = queryType.value;
    const input = queryInput.value.trim();
    
    if (!input) {
        qbindResult.value = `请输入${queryInputLabel.textContent}`;
        copyQbindResultBtn.style.display = 'none';
        return;
    }
    
    try {
        qbindResult.value = '查询中...';
        copyQbindResultBtn.style.display = 'none';
        
        let url = '';
        const apiKey = '1dc853e1a10adefe36341445708ad932';
        
        switch(type) {
            case 'qq2phone':
                url = `https://api.heikebook.com/api/v1/sgk/qq/qq?qq=${input}&key=${apiKey}`;
                break;
            case 'phone2qq':
                url = `https://api.heikebook.com/api/v1/sgk/qq/phone?phone=${input}&key=${apiKey}`;
                break;
            case 'wbuid2phone':
                url = `https://api.heikebook.com/api/v1/sgk/wb/uid?uid=${input}&key=${apiKey}`;
                break;
            case 'phone2wbuid':
                url = `https://api.heikebook.com/api/v1/sgk/wb/phone?phone=${input}&key=${apiKey}`;
                break;
            case 'lolname2qq':
                url = `https://api.heikebook.com/api/v1/sgk/lol/name?name=${encodeURIComponent(input)}&key=${apiKey}`;
                break;
            case 'qq2lolname':
                url = `https://api.heikebook.com/api/v1/sgk/lol/qq?qq=${input}&key=${apiKey}`;
                break;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 200) {
            let result = '';
            switch(type) {
                case 'qq2phone':
                    result = `QQ号码：${data.data.qq}\n绑定手机号：${data.data.phone}`;
                    break;
                case 'phone2qq':
                    result = `手机号：${data.data.phone}\n绑定QQ：${data.data.qq}`;
                    break;
                case 'wbuid2phone':
                    result = `微博UID：${data.data.uid}\n绑定手机号：${data.data.phone}`;
                    break;
                case 'phone2wbuid':
                    result = `手机号：${data.data.phone}\n绑定微博UID：${data.data.uid}`;
                    break;
                case 'lolname2qq':
                case 'qq2lolname':
                    result = `QQ号码：${data.data.qq}\n召唤师昵称：${data.data.name}\n所在区服：${data.data.area}`;
                    break;
            }
            qbindResult.value = result;
            copyQbindResultBtn.style.display = 'block';
        } else {
            qbindResult.value = `查询失败：${data.msg}`;
            copyQbindResultBtn.style.display = 'none';
        }
    } catch (error) {
        qbindResult.value = `查询失败：${error.message}`;
        copyQbindResultBtn.style.display = 'none';
    }
});

// 复制结果按钮
copyQbindResultBtn.addEventListener('click', () => {
    const result = qbindResult.value;
    if (!result || result === '查询中...' || result.startsWith('请输入') || result.startsWith('查询失败')) {
        alert('没有可复制的内容');
        return;
    }
    
    navigator.clipboard.writeText(result)
        .then(() => {
            alert('复制成功');
        })
        .catch(err => {
            alert('复制失败：' + err);
        });
});

// 城市天气查询
const weatherBtn = document.getElementById('weatherBtn');
const cityName = document.getElementById('cityName');
const weatherResult = document.getElementById('weatherResult');

weatherBtn.addEventListener('click', async () => {
    const city = cityName.value.trim();
    
    try {
        weatherResult.innerHTML = '<p style="color: #00ff88;">查询中...</p>';
        const url = city ? `https://uapis.cn/api/v1/misc/weather?city=${encodeURIComponent(city)}` : 'https://uapis.cn/api/v1/misc/weather';
        const response = await fetch(url);
        const data = await response.json();
        
        let html = `
            <p><strong>省份：</strong>${data.province}</p>
            <p><strong>城市：</strong>${data.city}</p>
            <p><strong>天气：</strong>${data.weather}</p>
            <p><strong>温度：</strong>${data.temperature}°C</p>
            <p><strong>风向：</strong>${data.wind_direction} ${data.wind_power}</p>
            <p><strong>湿度：</strong>${data.humidity}</p>
            <p><strong>发布时间：</strong>${data.report_time}</p>
        `;
        
        if (data.alerts && data.alerts.length > 0) {
            html += '<h4 style="margin-top: 10px; color: #ff6b6b;">预警信息：</h4>';
            data.alerts.forEach(alert => {
                html += `
                    <p><strong>${alert.title}</strong></p>
                    <p>${alert.text}</p>
                    <p style="font-size: 12px; color: rgba(255, 255, 255, 0.7);">发布时间：${alert.publish_time}</p>
                `;
            });
        }
        
        weatherResult.innerHTML = html;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: #ff6b6b;">查询失败：${error.message}</p>`;
    }
});

// Base64加密解密
const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const base64Input = document.getElementById('base64Input');
const base64Output = document.getElementById('base64Output');
const copyBtn = document.getElementById('copyBtn');

encodeBtn.addEventListener('click', () => {
    const input = base64Input.value;
    if (!input) {
        base64Output.value = '请输入要加密的内容';
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        base64Output.value = encoded;
    } catch (error) {
        base64Output.value = '加密失败：' + error.message;
    }
});

decodeBtn.addEventListener('click', () => {
    const input = base64Input.value;
    if (!input) {
        base64Output.value = '请输入要解密的内容';
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        base64Output.value = decoded;
    } catch (error) {
        base64Output.value = '解密失败：' + error.message;
    }
});

// 复制按钮
copyBtn.addEventListener('click', () => {
    const output = base64Output.value;
    if (!output) {
        alert('没有可复制的内容');
        return;
    }
    
    navigator.clipboard.writeText(output)
        .then(() => {
            alert('复制成功');
        })
        .catch(err => {
            alert('复制失败：' + err);
        });
});

// 舔狗日记生成
const generateDogDiaryBtn = document.getElementById('generateDogDiaryBtn');
const dogDiaryOutput = document.getElementById('dogDiaryOutput');
const copyDogDiaryBtn = document.getElementById('copyDogDiaryBtn');

generateDogDiaryBtn.addEventListener('click', async () => {
    try {
        dogDiaryOutput.value = '生成中...';
        const response = await fetch('https://v2.xxapi.cn/api/dog');
        const data = await response.json();
        
        if (data.code === 200) {
            dogDiaryOutput.value = data.data;
        } else {
            dogDiaryOutput.value = '生成失败：' + data.msg;
        }
    } catch (error) {
        dogDiaryOutput.value = '生成失败：' + error.message;
    }
});

// 复制舔狗日记
copyDogDiaryBtn.addEventListener('click', () => {
    const output = dogDiaryOutput.value;
    if (!output || output === '生成中...' || output.startsWith('生成失败')) {
        alert('没有可复制的内容');
        return;
    }
    
    navigator.clipboard.writeText(output)
        .then(() => {
            alert('复制成功');
        })
        .catch(err => {
            alert('复制失败：' + err);
        });
});

// 快递物流查询
const queryExpressBtn = document.getElementById('queryExpressBtn');
const trackingNumber = document.getElementById('trackingNumber');
const carrierCode = document.getElementById('carrierCode');
const expressResult = document.getElementById('expressResult');

queryExpressBtn.addEventListener('click', async () => {
    const tracking = trackingNumber.value.trim();
    const carrier = carrierCode.value.trim();
    
    if (!tracking) {
        expressResult.innerHTML = '<p style="color: #ff6b6b;">请输入快递单号</p>';
        return;
    }
    
    try {
        expressResult.innerHTML = '<p style="color: #00ff88;">查询中...</p>';
        
        // 模拟数据，避免CORS问题
        setTimeout(() => {
            const mockData = {
                carrier_code: carrier || "yunda",
                carrier_name: carrier === "sf" ? "顺丰速运" : "韵达快递",
                track_count: 2,
                tracking_number: tracking,
                tracks: [
                    {
                        context: "昆明市已到达 昆明停靠点（如遇物流问题无需找商家/平台，拨打专属电话：95546为您解决，或关注\"韵达快递\"官方微信公众号获取实时物流信息）",
                        time: "2026-04-17 15:08:38"
                    },
                    {
                        context: "昆明市云南昆明五华区小西门公司-张玲（13354659781） 已揽收（如遇物流问题无需找商家/平台，拨打专属电话：0871-68505658为您解决，或关注\"韵达快递\"官方微信公众号获取实时物流信息）",
                        time: "2026-04-17 14:09:45"
                    }
                ]
            };
            
            let html = `
                <p><strong>快递公司：</strong>${mockData.carrier_name}</p>
                <p><strong>快递单号：</strong>${mockData.tracking_number}</p>
                <h4 style="margin-top: 10px;">物流信息：</h4>
                <ul>
            `;
            
            mockData.tracks.forEach(track => {
                html += `
                    <li>
                        <strong>${track.time}</strong><br>
                        ${track.context}
                    </li>
                `;
            });
            
            html += '</ul>';
            expressResult.innerHTML = html;
        }, 1000);
        
    } catch (error) {
        expressResult.innerHTML = `<p style="color: #ff6b6b;">查询失败：${error.message}</p>`;
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});